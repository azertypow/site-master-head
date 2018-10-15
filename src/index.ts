import Vue from 'vue';
import {ClassNames} from './ClassNames'
import MDApp from './vueApp/MDApp.vue'
import {MDAppPropsInterface} from './vueApp/MDAppPropsInterface'
import './main.scss'

console.log("%c=== head media design <3 ===", "color: hotpink")

let mainVue = new Vue({
    el: '#app',
    render: (h) => h(MDApp),
}) as MDAppPropsInterface;


document.addEventListener("click", () => {
    console.log(MDApp)

    // mainVue.homeTitle = "titre de la home"
})

Vue.set(MDApp, "homeTitle", "coucou")
mainVue.homeTitle = "raaa"