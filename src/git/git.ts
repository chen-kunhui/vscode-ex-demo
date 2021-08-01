// 引用： https://github.com/microsoft/vscode/blob/main/extensions/git/src/git.ts

import { assign, exec, getGitErrorCode, GitError, IExecutionResult, SpawnOptions } from "./helper";
import iconv = require('iconv-lite');
import { EventEmitter } from "events";
import * as cp from 'child_process';
import * as path from 'path';
import { normalize } from "path";
import { Repository } from "./repository";
import { BaseRepository } from "./baseRepository";

export interface IGitOptions {
	gitPath: string;
	version: string;
	env?: any;
}

export class Git {
    readonly path: string;
    private env: any;
    private _onOutput = new EventEmitter();
	get onOutput(): EventEmitter { return this._onOutput; }

	// const gitExt = extensions.getExtension<any>('vscode.git')!.exports;
    // onst gitApi = gitExt.getAPI(1);
    // options.gitPath = gitApi.git.path;
	constructor(options: IGitOptions) {
		this.path = options.gitPath;
		this.env = options.env || {};
	}

	/**
	 * @param repoPath 仓库的目录，可以是根目录，也可以是子目录，但不能是一个文件路径
	 * @return Promise<Repository>
	 */
	async getRepository(repoPath: string): Promise<Repository> {
		const result = await this.exec(repoPath, ['rev-parse', '--show-toplevel']);
		const repoRoot = normalize(result.stdout.trimLeft().replace(/(\r\n|\r|\n)+$/, ''));
		const dotGit = await this.getRepositoryDotGit(repoRoot);
		return new BaseRepository(repoRoot, dotGit, this);
	}

    async exec(cwd: string, args: string[], options: SpawnOptions = {}): Promise<IExecutionResult<string>> {
		options = assign({ cwd }, options || {});
		return await this._exec(args, options);
	}

	private async getRepositoryDotGit(repositoryPath: string): Promise<string> {
		const result = await this.exec(repositoryPath, ['rev-parse', '--git-dir']);
		let dotGitPath = result.stdout.trim();

		if (!path.isAbsolute(dotGitPath)) {
			dotGitPath = path.join(repositoryPath, dotGitPath);
		}

		return path.normalize(dotGitPath);
	}

    private log(output: string): void {
		this._onOutput.emit('log', output);
	}

    private async _exec(args: string[], options: SpawnOptions = {}): Promise<IExecutionResult<string>> {
		const child = this.spawn(args, options);

		if (options.onSpawn) {
			options.onSpawn(child);
		}

		if (options.input) {
			child.stdin!.end(options.input, 'utf8');
		}

		const bufferResult = await exec(child, options.cancellationToken);

		if (options.log !== false && bufferResult.stderr.length > 0) {
			this.log(`${bufferResult.stderr}\n`);
		}

		let encoding = options.encoding || 'utf8';
		encoding = iconv.encodingExists(encoding) ? encoding : 'utf8';

		const result: IExecutionResult<string> = {
			exitCode: bufferResult.exitCode,
			stdout: iconv.decode(bufferResult.stdout, encoding),
			stderr: bufferResult.stderr
		};

		if (bufferResult.exitCode) {
			return Promise.reject<IExecutionResult<string>>(new GitError({
				message: 'Failed to execute git',
				stdout: result.stdout,
				stderr: result.stderr,
				exitCode: result.exitCode,
				gitErrorCode: getGitErrorCode(result.stderr),
				gitCommand: args[0]
			}));
		}

		return result;
	}

    private spawn(args: string[], options: SpawnOptions = {}): cp.ChildProcess {
		if (!this.path) {
			throw new Error('git could not be found in the system.');
		}

		if (!options) {
			options = {};
		}

		if (!options.stdio && !options.input) {
			options.stdio = ['ignore', null, null]; // Unless provided, ignore stdin and leave default streams for stdout and stderr
		}

		options.env = assign({}, process.env, this.env, options.env || {}, {
			VSCODE_GIT_COMMAND: args[0],
			LC_ALL: 'en_US.UTF-8',
			LANG: 'en_US.UTF-8'
		});

		if (options.log !== false) {
			this.log(`> git ${args.join(' ')}\n`);
		}

		return cp.spawn(this.path, args, options);
	}
}

