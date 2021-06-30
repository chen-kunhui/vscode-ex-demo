import { commands, ExtensionContext } from "vscode";
import { VueDemo } from "../webviewControllers/vueDemo";

export default function vueSample(context: ExtensionContext){
    let disposable = commands.registerCommand('vs-extension-demo.vue-demo', () => {
		new VueDemo(context.extensionUri);
	});
    context.subscriptions.push(disposable);
}