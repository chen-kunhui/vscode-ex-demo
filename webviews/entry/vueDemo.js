import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import app from '../vue/vueDemo.vue'


(()=>{
    createApp(app).use(ElementPlus).mount('#vue-app');
})()