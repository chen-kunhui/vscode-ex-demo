import * as vscode from 'vscode';

export class VueDemo {
    constructor(extensionUri: vscode.Uri){
        const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
        const panel = vscode.window.createWebviewPanel(
			'vue-demo',
			"Cat Codicons",
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'dist')]
            }
            
		);

        const commonjs = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'common.js'));
        const commoncss = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'common.css'));
        const pagejs = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'vueDemo.js'));
        const pagecss = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'vueDemo.css'));
		// const codiconsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'node_modules', 'vscode-codicons', 'dist', 'codicon.css'));
		// const codiconsFontUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'node_modules', 'vscode-codicons', 'dist', 'codicon.ttf'));
        vscode.window.showInformationMessage(panel.webview.cspSource);
		panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="${commoncss}">
            <link rel="stylesheet" href="${pagecss}">
            <title>Cat Coding</title>
        </head>
        <body>
            <div id="vue-app"></div>
            <script src="${commonjs}"></script>
            <script src="${pagejs}"></script>
        </body>
        </html>
        `;
    }
}