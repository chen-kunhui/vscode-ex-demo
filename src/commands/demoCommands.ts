import { CancellationToken, CancellationTokenSource, commands, Event, ExtensionContext, extensions, StatusBarAlignment, window } from "vscode";
// import { Git } from "../git/git";

let statusBar = window.createStatusBarItem(StatusBarAlignment.Right);
let timer: any;
export default  function demoCommand(context: ExtensionContext){
    let disposable = commands.registerCommand('vs-extension-demo.demo', async () => {
        if (  timer) {
            clearInterval(timer);
        }
        let start = 0;
        let num = 3;
        let str = '笑中有泪 - 杨千嬅     '
        let display: any = [];
        let hide: any = [];
        let min: any = 10;
        if (str.length > 10) {
            min = str.length;
        }
        for(let i = 0; i < min; i++ ) {
            if (i < 5) {
                display.push(str.charAt(i))
            } else {
                let s = str.charAt(i) === '' ? ' ' : str.charAt(i);
                hide.push(s)
            }
        }
        statusBar.text=`$(sync~spin) ${display.join('')}`
        statusBar.command = "vs-extension-demo.progress-sample"
        statusBar.show();
        timer = setInterval(()=>{
            let s1 = hide.shift()
            let s2 = display.shift()
            hide.push(s2);
            display.push(s1);
            statusBar.text=`$(sync~spin) ${display.join('')}`
            start++
            

        }, 1000)
    })

    context.subscriptions.push(disposable);
}
