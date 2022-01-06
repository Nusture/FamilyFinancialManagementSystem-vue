import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import print from 'vue3-print-nb'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';


const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(print)
    .mount('#app')