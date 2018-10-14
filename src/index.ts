import Vue from 'vue';
import {ClassNames} from './ClassNames'
import MDApp from "./vueApp/MDApp.vue"
import {MDAppPropsInterface} from "./vueApp/MDAppPropsInterface"

console.log("%c=== head media design <3 ===", "color: hotpink")

let mainVue = new Vue({
    el: '#app',
    render: (h) => h(MDApp),
}) as MDAppPropsInterface;

mainVue.currentPageName = ClassNames.HOME
