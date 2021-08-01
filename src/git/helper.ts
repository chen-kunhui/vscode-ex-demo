// 引用：https://github.com/microsoft/vscode/blob/main/extensions/git/src/util.ts
// 引用：https://github.com/microsoft/vscode/blob/main/extensions/git/src/git.ts

import * as cp from 'child_process';
import { CancellationToken, Event } from 'vscode';

export function assign<T>(destination: T, ...sources: any[]): T {
	for (const source of sources) {
		Object.keys(source).forEach(key => (destination as any)[key] = source[key]);
	}

	return destination;
}

export interface SpawnOptions extends cp.SpawnOptions {
	input?: string;
	encoding?: string;
	log?: boolean;
	cancellationToken?: CancellationToken;
	onSpawn?: (childProcess: cp.ChildProcess) => void;
}

export interface IExecutionResult<T extends string | Buffer> {
	exitCode: number;
	stdout: T;
	stderr: string;
}

export interface IGitErrorData {
	error?: Error;
	message?: string;
	stdout?: string;
	stderr?: string;
	exitCode?: number;
	gitErrorCode?: string;
	gitCommand?: string;
}

export class GitError {

	error?: Error;
	message: string;
	stdout?: string;
	stderr?: string;
	exitCode?: number;
	gitErrorCode?: string;
	gitCommand?: string;

	constructor(data: IGitErrorData) {
		if (data.error) {
			this.error = data.error;
			this.message = data.error.message;
		} else {
			this.error = undefined;
			this.message = '';
		}

		this.message = this.message || data.message || 'Git error';
		this.stdout = data.stdout;
		this.stderr = data.stderr;
		this.exitCode = data.exitCode;
		this.gitErrorCode = data.gitErrorCode;
		this.gitCommand = data.gitCommand;
	}

	toString(): string {
		let result = this.message + ' ' + JSON.stringify({
			exitCode: this.exitCode,
			gitErrorCode: this.gitErrorCode,
			gitCommand: this.gitCommand,
			stdout: this.stdout,
			stderr: this.stderr
		}, null, 2);

		if (this.error) {
			result += (<any>this.error).stack;
		}

		return result;
	}
}

export const enum GitErrorCodes {
	BadConfigFile = 'BadConfigFile',
	AuthenticationFailed = 'AuthenticationFailed',
	NoUserNameConfigured = 'NoUserNameConfigured',
	NoUserEmailConfigured = 'NoUserEmailConfigured',
	NoRemoteRepositorySpecified = 'NoRemoteRepositorySpecified',
	NotAGitRepository = 'NotAGitRepository',
	NotAtRepositoryRoot = 'NotAtRepositoryRoot',
	Conflict = 'Conflict',
	StashConflict = 'StashConflict',
	UnmergedChanges = 'UnmergedChanges',
	PushRejected = 'PushRejected',
	RemoteConnectionError = 'RemoteConnectionError',
	DirtyWorkTree = 'DirtyWorkTree',
	CantOpenResource = 'CantOpenResource',
	GitNotFound = 'GitNotFound',
	CantCreatePipe = 'CantCreatePipe',
	CantAccessRemote = 'CantAccessRemote',
	RepositoryNotFound = 'RepositoryNotFound',
	RepositoryIsLocked = 'RepositoryIsLocked',
	BranchNotFullyMerged = 'BranchNotFullyMerged',
	NoRemoteReference = 'NoRemoteReference',
	InvalidBranchName = 'InvalidBranchName',
	BranchAlreadyExists = 'BranchAlreadyExists',
	NoLocalChanges = 'NoLocalChanges',
	NoStashFound = 'NoStashFound',
	LocalChangesOverwritten = 'LocalChangesOverwritten',
	NoUpstreamBranch = 'NoUpstreamBranch',
	IsInSubmodule = 'IsInSubmodule',
	WrongCase = 'WrongCase',
	CantLockRef = 'CantLockRef',
	CantRebaseMultipleBranches = 'CantRebaseMultipleBranches',
	PatchDoesNotApply = 'PatchDoesNotApply',
	NoPathFound = 'NoPathFound',
	UnknownPath = 'UnknownPath',
}

export function getGitErrorCode(stderr: string): string | undefined {
	if (/Another git process seems to be running in this repository|If no other git process is currently running/.test(stderr)) {
		return GitErrorCodes.RepositoryIsLocked;
	} else if (/Authentication failed/.test(stderr)) {
		return GitErrorCodes.AuthenticationFailed;
	} else if (/Not a git repository/i.test(stderr)) {
		return GitErrorCodes.NotAGitRepository;
	} else if (/bad config file/.test(stderr)) {
		return GitErrorCodes.BadConfigFile;
	} else if (/cannot make pipe for command substitution|cannot create standard input pipe/.test(stderr)) {
		return GitErrorCodes.CantCreatePipe;
	} else if (/Repository not found/.test(stderr)) {
		return GitErrorCodes.RepositoryNotFound;
	} else if (/unable to access/.test(stderr)) {
		return GitErrorCodes.CantAccessRemote;
	} else if (/branch '.+' is not fully merged/.test(stderr)) {
		return GitErrorCodes.BranchNotFullyMerged;
	} else if (/Couldn\'t find remote ref/.test(stderr)) {
		return GitErrorCodes.NoRemoteReference;
	} else if (/A branch named '.+' already exists/.test(stderr)) {
		return GitErrorCodes.BranchAlreadyExists;
	} else if (/'.+' is not a valid branch name/.test(stderr)) {
		return GitErrorCodes.InvalidBranchName;
	} else if (/Please,? commit your changes or stash them/.test(stderr)) {
		return GitErrorCodes.DirtyWorkTree;
	}

	return undefined;
}

function cpErrorHandler(cb: (reason?: any) => void): (reason?: any) => void {
	return err => {
		if (/ENOENT/.test(err.message)) {
			err = new GitError({
				error: err,
				message: 'Failed to execute git (ENOENT)',
				gitErrorCode: GitErrorCodes.NotAGitRepository
			});
		}

		cb(err);
	};
}

export function onceEvent<T>(event: Event<T>): Event<T> {
	return (listener, thisArgs = null, disposables?) => {
		const result = event(e => {
			result.dispose();
			return listener.call(thisArgs, e);
		}, null, disposables);

		return result;
	};
}

export interface IDisposable {
	dispose(): void;
}

export function toDisposable(dispose: () => void): IDisposable {
	return { dispose };
}

export function dispose<T extends IDisposable>(disposables: T[]): T[] {
	disposables.forEach(d => d.dispose());
	return [];
}

export async function exec(child: cp.ChildProcess, cancellationToken?: CancellationToken): Promise<IExecutionResult<Buffer>> {
	if (!child.stdout || !child.stderr) {
		throw new GitError({ message: 'Failed to get stdout or stderr from git process.' });
	}

	if (cancellationToken && cancellationToken.isCancellationRequested) {
		throw new GitError({ message: 'Cancelled' });
	}

	const disposables: IDisposable[] = [];

	const once = (ee: NodeJS.EventEmitter, name: string, fn: (...args: any[]) => void) => {
		ee.once(name, fn);
		disposables.push(toDisposable(() => ee.removeListener(name, fn)));
	};

	const on = (ee: NodeJS.EventEmitter, name: string, fn: (...args: any[]) => void) => {
		ee.on(name, fn);
		disposables.push(toDisposable(() => ee.removeListener(name, fn)));
	};

	let result = Promise.all<any>([
		new Promise<number>((c, e) => {
			once(child, 'error', cpErrorHandler(e));
			once(child, 'exit', c);
		}),
		new Promise<Buffer>(c => {
			const buffers: Buffer[] = [];
			on(child.stdout!, 'data', (b: Buffer) => buffers.push(b));
			once(child.stdout!, 'close', () => c(Buffer.concat(buffers)));
		}),
		new Promise<string>(c => {
			const buffers: Buffer[] = [];
			on(child.stderr!, 'data', (b: Buffer) => buffers.push(b));
			once(child.stderr!, 'close', () => c(Buffer.concat(buffers).toString('utf8')));
		})
	]) as Promise<[number, Buffer, string]>;

	if (cancellationToken) {
		const cancellationPromise = new Promise<[number, Buffer, string]>((_, e) => {
			onceEvent(cancellationToken.onCancellationRequested)(() => {
				try {
					child.kill();
				} catch (err) {
					// noop
				}

				e(new GitError({ message: 'Cancelled' }));
			});
		});

		result = Promise.race([result, cancellationPromise]);
	}

	try {
		const [exitCode, stdout, stderr] = await result;
		return { exitCode, stdout, stderr };
	} finally {
		dispose(disposables);
	}
}