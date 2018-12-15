import Vue from "vue";
import App from './components/App.vue';
import { Testes,TestState } from './models';


new Vue({
    el: '#app',
    render: h => h(App),
    provide(){  return {  testes: new Testes(), teststate:new TestState() }}
});
