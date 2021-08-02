
<template>
    <div class="file-diffs">
	    <div class="line new-line">
            <span class="line-num">
                <span></span>
                <span>1</span>
            </span>
            <span class="code hljs">+function (s: string)</span>
        </div>
        <div class="line old-line"><span class="line-num"><span>2</span><span></span></span><span class="code hljs" v-html="highlight('-import { commands, ExtensionContext, ProgressLocation, window } from \'vscode\'')"></span></div>
        <div class="line"><span class="line-num"><span>99999</span><span>99999</span></span><span class="code hljs" v-html="highlight('-import { commands, ExtensionContext, ProgressLocation, window } from \'vscode\'')"></span></div>
    </div>
</template>
<script>
import highlightJs from 'highlight.js';
export default {
    methods: {
        highlight(code) {
            return highlightJs.highlight('ts', code, true).value;
        }
    },
    data() {
        return {
            diff: `@@ -1,8 +1,18 @@

-import { commands, ExtensionContext, ProgressLocation, window } from "vscode";
+import { commands, ExtensionContext, ProgressLocation, Uri, window } from "vscode";
+import * as crypto from 'crypto';

 export default  function progressSample(context: ExtensionContext){
     let disposable = commands.registerCommand('vs-extension-demo.progress-sample', async () => {
+               let s  = crypto.createHash('sha1').update("dddddddddddddddddddd").digest('hex')
commands\\progressSample.ts");
+               let url2 = Uri.file("D:\\ckh\\develop\\vs-extention\\vs-extension-demo\\webvcommands\\progressSampl+               let url2 = Uri.file("D:\\ckh\\develop\\vs-extention\\vs-extension-demo\\webviews\\scss\\element-ui\
+               url = url.with({query: "sdadsdas==================>"});
+               console.log("==================================>", url);
+               commands.executeCommand("vscode.diff", url, url2).then(() => {
+                       console.log(window.visibleTextEditors);
+               });
                await window.withProgress({
                        title: "I am long running!",`
        }
    }
}
</script>

<style scoped src="../../scss/git-diff.scss"></style>