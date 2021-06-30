import { OutputChannel, Webview } from "vscode";

interface webviewRespondHandler {
    /**
     * 接受到 webview 请求后，将请求结果发送给 webview
     *
     * @param data 返回的值
     * @return 没有返回值
     */
    (data: any): void;
}

interface webviewRequestHandler {
    /**
     * 处理 webview 的请求
     *
     * @param params 请求的参数
     * @param respond 将请求结果返回给 webview
     * @return 没有返回值
     */
    (params: any, respond: webviewRespondHandler): void;
}

interface Routers {
    [propName: string]: webviewRequestHandler;
}

interface Request {
    uuid: string
    url: string
    params: any
}

class Controller {
    private readonly view: Webview;
    private log: OutputChannel;
    private readonly urls: Routers = {
        '/aaa/bbb': this.openMr
    }

    constructor(view: Webview, log: OutputChannel) {
        this.view = view;
        this.log = log;
    }

    onReauest() {
        this.view.onDidReceiveMessage((message: Request) => {
            let startTime = new Date().getTime();

            let respond = (data: any) => {
                this.log.appendLine(`cost: ${new Date().getTime() - startTime}ms`);
                this.view.postMessage({
                    uuid: message.uuid,
                    url: message.url,
                    data: data
                })
            }
            this.urls[message.url] && this.urls[message.url](message, respond);
        })
    }

    openMr(params: any, respond: webviewRespondHandler) {
        respond('ok');
    }
}