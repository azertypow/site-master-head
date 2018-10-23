import Vue from 'vue';
import App from "./App.vue"
import {IAppData} from "./IAppData"

export function createVueApplication(defaultAppData: IAppData) {
    return new Vue({
        el: '#app',
        template: '<app :data="data"></app>',
        components: {
            App
        },
        props: {
            data: {
                default: () => { return defaultAppData},
                type: Object,
            },
        },

    }) as IMainVue;
}

export interface IMainVue extends Vue {
    data: IAppData,
    $setBottomIsOpen: boolean
}
