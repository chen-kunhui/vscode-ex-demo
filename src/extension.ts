import * as vscode from 'vscode';
import { VueDemo } from './webviewControllers/vueDemo';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "ckh" is now active!');
	let output = vscode.window.createOutputChannel("ckh");
	try {
		throw {s: 44, message: "xxx"};
	} catch (error) {
		output.append(`=> ${error}\n`);
	}
	output.appendLine("=====================test");
	output.appendLine(context.asAbsolutePath("aa/bb"));
	let disposable = vscode.commands.registerCommand('ckh.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from demo!');
		new VueDemo(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
