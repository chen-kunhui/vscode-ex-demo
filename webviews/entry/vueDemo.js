import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import app from '../vue/vueDemo'

// markdown-it 插件 https://www.npmjs.com/search?q=keywords:markdown-it-plugin
// markdown 渲染器 https://github.com/markdown-it/markdown-it
import MarkdownIt from 'markdown-it';
// [ ], - [ ], * [ ]
import markdownCheckbox from 'markdown-it-checkbox';
// 代码高亮
import highlightJs from 'highlight.js'
import '../scss/highlight.js/vscode.scss'


(()=>{
    // https://markdown-it.github.io/markdown-it/#Core.new
    let markdownRender = new MarkdownIt({
        // html: true, // 允许渲染 html 标签
        // breaks: false, // 将行内的换行转为 <br>
        linkify: true, // 将类似URL的文本自动转换为链接
        typographer: true, // 可以将 (c) (C) (r) (R) (tm) (TM) (p) (P) +- 转划为 © © ® ® ™ ™ § § ±
        highlight: function (str, lang) {
            if (lang && highlightJs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                        highlightJs.highlight(lang, str, true).value +
                        '</code></pre>'
            } catch (__) {
                // continue regardless of error
            }
            }

            return '<pre class="hljs"><code>' + markdownRender.utils.escapeHtml(str) + '</code></pre>'
        }
    })
    
    markdownRender.use(markdownCheckbox)

    const vscode = acquireVsCodeApi();
    let evets = {}

    let sendRequest = function(uri, params, callback) {
        let uuid = '';
        vscode.postMessage({
            uuid: uuid,
            uri: uri,
            params: params
        });
        evets[token] = { respondHandler: callback };
    }
    window.addEventListener('message', event => {
        let token = event.data.token;
        evets[token] && evets[token].respondHandler(event);
    });

    let vueApp = createApp(app);

    vueApp.config.globalProperties.$vscode = vscode;
    vueApp.config.globalProperties.$sendRequest = sendRequest;
    vueApp.config.globalProperties.$markdownRender = markdownRender;

    vueApp.use(ElementPlus).mount('#vue-app');
})()