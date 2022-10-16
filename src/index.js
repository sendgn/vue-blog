import './js/main';
import './css/main.css';
import './scss/main.scss';
import App from './App.vue';
import { createApp } from 'vue';
import components from './components/UI';

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.mount('#app');
