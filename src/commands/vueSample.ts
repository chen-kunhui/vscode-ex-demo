import { commands, ExtensionContext } from "vscode";
import { ElementUiDemo } from "../webviewControllers/ElementUiDemo";

export default function vueSample(context: ExtensionContext){
    let disposable = commands.registerCommand('vs-extension-demo.webview-demo', (js: string) => {
		new ElementUiDemo(context.extensionUri, js);
	});
    context.subscriptions.push(disposable);
}