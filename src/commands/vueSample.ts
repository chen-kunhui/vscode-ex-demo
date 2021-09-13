import { commands, ExtensionContext } from "vscode";
import { ElementUiDemo } from "../webviewControllers/ElementUiDemo";
import { TwoWayTree } from "../webviewControllers/twoWayTree";

export default function vueSample(context: ExtensionContext){
    let disposable = commands.registerCommand('vs-extension-demo.webview-demo', (js: string) => {
		new ElementUiDemo(context.extensionUri, js);
	});
    context.subscriptions.push(disposable);

    let disposable2 = commands.registerCommand('vs-extension-demo.twoWayTree', () => {
		new TwoWayTree(context.extensionUri, 'twoWayTree');
	});
    context.subscriptions.push(disposable2);
}