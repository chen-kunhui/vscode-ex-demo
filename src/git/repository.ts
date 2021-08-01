export interface Repository {
    rootPath(): string;
    dotGitPath(): string;
    getMergeBase(ref1: string, ref2: string): Promise<string>;
};