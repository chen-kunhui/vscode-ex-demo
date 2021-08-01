import { CancellationToken, Uri, WebviewView, WebviewViewProvider, WebviewViewResolveContext } from "vscode";
import {renderHtml} from '../../webviewHelper';
export class SidebarView implements WebviewViewProvider {
    constructor(
		private readonly _extensionUri: Uri,
	) { }

    public resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext,
		_token: CancellationToken,
	) {
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [Uri.joinPath(this._extensionUri, 'dist')]
		};

		webviewView.webview.html = renderHtml(webviewView.webview, this._extensionUri, 'sidebar', true);
	}
}