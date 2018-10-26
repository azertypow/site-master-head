<template>
    <section id="app">
        <app-menu
                :$bottomIsOpen="$BottomIsOpen"></app-menu>
        <page-home
                :data="appData.home"
                :$siteLang="$siteLang"></page-home>
        <page-projects
                :data="appData.projects"></page-projects>
        <page-alumni
                :data="appData.alumni"></page-alumni>
        <page-contact
                :data="appData.contact"></page-contact>
        <page-thesis
                :data="appData.thesis"></page-thesis>
        <bottom-bar
                :$siteLang="$siteLang"
                :$bottomIsOpen="$BottomIsOpen"></bottom-bar>
        <app-footer></app-footer>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import AppMenu from "./components/appMenu/AppMenu"
    import PageHome from './pages/home/PageHome'
    import PageProjects from './pages/projects/PageProjects'
    import {EventBus} from "../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG} from "../../SETTINGS"
    import {IAppData} from "./IAppData"
    import BottomBar from "./components/bottomBar/BottomBar"
    import AppFooter from "./components/appFooter/AppFooter"
    import PageAlumni from "./pages/alumni/PageAlumni"
    import PageThesis from "./pages/thesis/PageThesis"
    import PageContact from "./pages/contact/PageContact"

    @Component ({
        components: {
            PageContact,
            PageThesis,
            PageAlumni,
            AppMenu,
            PageHome,
            PageProjects,
            BottomBar,
            AppFooter,
        },
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                (this as App).$siteLang = event
            })

            EventBus.$on(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR, () => {
                (this as App).$BottomIsOpen = false
                console.log("close clicked")
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
        }
    })
    export default class App extends Vue {
        constructor() {
            super()
            this.$siteLang = DEFAULT_SITE_LANG
        }

        private siteLang = DEFAULT_SITE_LANG

        @Prop({required: true}) data!: IAppData
        get appData() {return this.data}

        @Prop({default: true})  $setBottomIsOpen!: boolean

        private BottomIsOpen = this.$setBottomIsOpen

        get $BottomIsOpen() {
            return this.BottomIsOpen
        }
        set $BottomIsOpen(value: boolean) {
            this.BottomIsOpen = value
        }

        get $siteLang(): LANG_LIST {
            return this.siteLang
        }
        set $siteLang(lang: LANG_LIST) {
            App.setHTMLLangAttribute(lang)
            this.siteLang = lang
        }

        private static setHTMLLangAttribute(lang: LANG_LIST) {
            try {
                (document.querySelector('html') as HTMLElement).setAttribute('lang', lang)
            } catch (e) {
                console.error("can't set html lang attribute: ", e)
            }
        }
    }
</script>

<style lang="scss">
    #app {

    }
</style>