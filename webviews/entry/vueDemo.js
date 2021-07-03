import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import app from '../vue/vueDemo'


(()=>{
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

    vueApp.use(ElementPlus).mount('#vue-app');
})()