import { IExecutionResult, SpawnOptions } from "./helper";
import { Repository } from "./repository";

export class BaseRepository implements Repository {

    constructor(
        private repoRoot: string,
        private dotGit: string,
        private git: {exec: (cwd: string, args: string[], options: SpawnOptions) => Promise<IExecutionResult<string>>}
    ) {}

    private async run(args: string[], options: SpawnOptions = {}): Promise<IExecutionResult<string>> {
        return this.git.exec(this.repoRoot, args, options);
    }

    rootPath(): string {
        return this.repoRoot;
    }

    dotGitPath(): string {
        return this.dotGit;
    }

    async getMergeBase(ref1: string, ref2: string): Promise<string> {
		const args = ['merge-base', ref1, ref2];
		const result = await this.run(args);

		return result.stdout.trim();
	}
}