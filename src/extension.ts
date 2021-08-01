import { ExtensionContext, window } from 'vscode';
import registerCommands from './commands/registerCommands';
import { MyTreeDataProvider } from './providers/MyTreeDataProvider';
import { SidebarView } from './webviewControllers/sidebar/sidebarView';

export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "ckh" is now active!');
	registerCommands(context);
	window.registerTreeDataProvider('vs-extension-demo.menu', new MyTreeDataProvider());
	const provider = new SidebarView(context.extensionUri);
	context.subscriptions.push(
		window.registerWebviewViewProvider('vs-extension-demo.sidebar', provider)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
