import * as vscode from 'vscode';
import {renderHtml} from '../webviewHelper';
export class ElementUiDemo {
    constructor(extensionUri: vscode.Uri, name: string){
        const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
        const panel = vscode.window.createWebviewPanel(
			name,
			name,
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'dist')]
            }
            
		);

		panel.webview.html = renderHtml(panel.webview, extensionUri, name)
    }
}