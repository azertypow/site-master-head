import {PAGES_PATHNAME} from "../../SETTINGS"
import {APP_PAGE_HISTORIC_STATE} from "../GLOBAL_ENUMS"
import {APP_PAGE_HISTORIC_STATE} from "../GLOBAL_ENUMS"
import {APP_PAGE_HISTORIC_STATE} from "../GLOBAL_ENUMS"
import {PAGES_PATHNAME} from "../../SETTINGS"
import {PAGES_PATHNAME} from "../../SETTINGS"
<template>
    <section id="app">
        <app-menu
                :$bottomIsOpen="$BottomIsOpen"></app-menu>
        <div class="app-cube-container" :class="$appPageActiveClassName">


            <div class="app-cube-flip-home"     :class="[this.getClassNamePageHistoryState('/home')]">
                <page-home
                        :data="appData.allPagesData.home"
                        :$siteLang="$siteLang"></page-home>
            </div>


            <div class="app-cube-flip-projects" :class="[this.getClassNamePageHistoryState('/project')]">
                <page-projects
                        :data="appData.allPagesData.projects"
                        :allProjects="appData.allProjects"  ></page-projects>
            </div>


            <div class="app-cube-flip-alumni"   :class="[this.getClassNamePageHistoryState('/alumni')]">
                <page-alumni
                        :data="appData.allPagesData.alumni"
                        :allAlumni="appData.allAlumni"  ></page-alumni>
            </div>


            <div class="app-cube-flip-contact"  :class="[this.getClassNamePageHistoryState('/contact')]">
                <page-contact
                        :data="appData.allPagesData.contact"></page-contact>
            </div>


            <div class="app-cube-flip-thesis"   :class="[this.getClassNamePageHistoryState('/thesis')]">
                <page-thesis
                        :data="appData.allPagesData.thesis"
                        :allThesis="appData.allThesis"></page-thesis>
            </div>


        </div>
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
    import {APP_PAGE_ACTIVE_CLASS, APP_PAGE_HISTORIC_STATE, EVENT_BUS_LIST, LANG_LIST} from "../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG, PAGES_PATHNAME} from "../../SETTINGS"
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

            EventBus.$on(EVENT_BUS_LIST.PAGE_CHANGED, (pageName: string[]) => {
                (this as App).$currentPageActive = pageName[0] as PAGES_PATHNAME
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
            EventBus.$off(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR)
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

        beforePage: PAGES_PATHNAME = PAGES_PATHNAME.OTHER
        set $beforePage(value) { this.beforePage = value}
        get $beforePage() { return this.beforePage}

        currentPageActive: PAGES_PATHNAME = PAGES_PATHNAME.OTHER
        set $currentPageActive(value: PAGES_PATHNAME) {
            this.$beforePage = this.$currentPageActive
            this.currentPageActive = value
        }
        get $currentPageActive(): PAGES_PATHNAME {return this.currentPageActive}

        get $appPageActiveClassName(): APP_PAGE_ACTIVE_CLASS | undefined {
            switch (this.currentPageActive) {
                case PAGES_PATHNAME.HOME: return APP_PAGE_ACTIVE_CLASS.HOME
                case PAGES_PATHNAME.PROJECT: return APP_PAGE_ACTIVE_CLASS.PROJECT
                case PAGES_PATHNAME.THESIS: return APP_PAGE_ACTIVE_CLASS.THESIS
                case PAGES_PATHNAME.ALUMNI: return APP_PAGE_ACTIVE_CLASS.ALUMNI
                case PAGES_PATHNAME.CONTACT: return APP_PAGE_ACTIVE_CLASS.CONTACT
            }
        }

        getClassNamePageHistoryState(pageName: PAGES_PATHNAME): APP_PAGE_HISTORIC_STATE {

            switch (pageName) {
                case this.$currentPageActive: return APP_PAGE_HISTORIC_STATE.CURRENT
                case this.$beforePage:        return APP_PAGE_HISTORIC_STATE.BEFORE
                default:                      return APP_PAGE_HISTORIC_STATE.OTHER
            }
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
        .app-cube-container {
            position: absolute;
            width: 0;
            height: 0;
            top: 50vh;
            left: 50vw;
            transform-style: preserve-3d;
            transform: rotateX(0deg) rotateY(0deg);
            transition: transform 1000ms ease-in-out;

            &.app-current-home {
                transform: rotateY(0deg);
            }
            &.app-current-project {
                transform: rotateY(-90deg);
            }
            &.app-current-thesis {
                transform: rotateY(90deg);
            }
            &.app-current-alumni {
                transform: rotateX(-90deg);
            }
            &.app-current-contact {
                transform: rotateX(90deg);
            }
        }

        [class*=app-cube-flip] {
            position: absolute;
            top: -50vh;
            left: -50vw;
            width: 100vw;
            height: 100vh;
            display: none;
            transform-style: preserve-3d;
            /*backface-visibility: hidden;*/
            /*overflow: hidden;*/
            overflow: scroll;
            &.app-page-current,
            &.app-page-before {
                display: block;
            }

            padding: 0 50px;

            >* {

            }
        }

        .app-cube-flip-home {
            /*transform: rotateY(0deg);*/
            /*will-change: transform;*/
        }
        .app-cube-flip-projects {
            transform: rotateY(90deg);
        }
        .app-cube-flip-thesis {
            transform: rotateY(-90deg);
        }
        .app-cube-flip-alumni {
            transform: rotateX(90deg);
        }
        .app-cube-flip-contact {
            transform: rotateX(-90deg);
        }
    }
</style>