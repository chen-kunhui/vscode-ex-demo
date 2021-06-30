import { ExtensionContext, window } from 'vscode';
import registerCommands from './commands/registerCommands';
import { MyTreeDataProvider } from './providers/MyTreeDataProvider';

export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "ckh" is now active!');
	registerCommands(context);
	window.registerTreeDataProvider('vs-extension-demo.menu', new MyTreeDataProvider());
}

// this method is called when your extension is deactivated
export function deactivate() {}
