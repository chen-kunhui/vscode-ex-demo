
import { commands, ExtensionContext, ProgressLocation, Uri, window } from "vscode";
import * as crypto from 'crypto';

export default  function progressSample(context: ExtensionContext){
    let disposable = commands.registerCommand('vs-extension-demo.progress-sample', async () => {
		await window.withProgress({
			location: ProgressLocation.Notification,
			title: "I am long running!",
			cancellable: true
		}, (progress, token) => {
			return new Promise<void>(async (resolve) => {
				let isCancell = false;
				token.onCancellationRequested(() => {
					window.showInformationMessage("User canceled the long running operation");
					isCancell = true;
				});

				if (isCancell) {
					resolve();
					return;
				}
				let i = 0;
				let ti = setInterval(() => {
					progress.report({message: `================> ${i}`})
					i += 1;
					if (i === 5) {
						resolve();
						clearInterval(ti);
					}
				}, 1000)
			});
		});

		window.showInformationMessage("=========== withProgress done ==========");
	});
    context.subscriptions.push(disposable);
}