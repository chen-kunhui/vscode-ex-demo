import { commands, ExtensionContext, extensions, window } from "vscode";
import { Git } from "../git/git";

export default  function demoCommand(context: ExtensionContext){
    // const gitExt = extensions.getExtension<any>('vscode.git')!.exports;
    // const gitApi = gitExt.getAPI(1);
    // const gitPath = gitApi.git.path;
    const gitPath = 'git';
    const git = new Git({gitPath: gitPath, version: ''});
    let disposable = commands.registerCommand('vs-extension-demo.demo', async () => {
        try {
            let repo = await git.getRepository('')
            console.log("------------------------->", rs);
            window.showInformationMessage(`====================> ${rs.stdout}`)
            
        } catch (error) {
            console.log("--------------error----------->", error);
            window.showInformationMessage(`====================> ${error.message}`);
        }
    })

    context.subscriptions.push(disposable);
}