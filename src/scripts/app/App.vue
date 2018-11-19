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
        <div class="app-cube-container" :class="[$appPageActiveClassName, {'page-transition-playing': pageTransitionRun}]">


            <div class="app-cube-flip-home"     :class="[this.getClassNamePageHistoryState('/home')]">
                <h1>HOME</h1>
                <page-home
                        :data="appData.allPagesData.home"
                        :$siteLang="$siteLang"></page-home>
            </div>


            <div class="app-cube-flip-projects" :class="[this.getClassNamePageHistoryState('/project')]">
                <h1>PROJECT</h1>
                <page-projects
                        :data="appData.allPagesData.projects"
                        :allProjects="appData.allProjects"
                        :$siteLang="$siteLang" ></page-projects>
            </div>


            <div class="app-cube-flip-alumni"   :class="[this.getClassNamePageHistoryState('/alumni')]">
                <h1>ALUMNI</h1>
                <page-alumni
                        :data="appData.allPagesData.alumni"
                        :allAlumni="appData.allAlumni"  ></page-alumni>
            </div>


            <div class="app-cube-flip-contact"  :class="[this.getClassNamePageHistoryState('/contact')]">
                <h1>CONTACT</h1>
                <page-contact
                        :data="appData.allPagesData.contact"></page-contact>
            </div>


            <div class="app-cube-flip-thesis"   :class="[this.getClassNamePageHistoryState('/thesis')]">
                <h1>THESIS</h1>
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

                (this as App).pageTransitionRun = true;

                (this as App).$currentPageActive = pageName[0] as PAGES_PATHNAME
            })
        },
        mounted: function () {

            (this as App).$appHtmlElement = (this as App).$el as HTMLDivElement

            // todo event compatibility: https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
            ((this as App).$appHtmlElement as HTMLElement).addEventListener("transitionend", () => {
                ((this as App).$el.querySelector(".app-cube-container") as HTMLElement).style.transition = "none";
                ((this as App).$el.querySelector(".app-cube-container") as HTMLElement).style.transform = "none";

                (this as App).pageTransitionRun = false;
            });

            (this as App).pageTransitionRun = false;
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
            EventBus.$off(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR)

            //todo remove transition eventLister
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

        pageTransitionRun = false

        beforePage: PAGES_PATHNAME = PAGES_PATHNAME.OTHER
        set $beforePage(value) { this.beforePage = value}
        get $beforePage() { return this.beforePage}

        $appHtmlElement: HTMLElement | null = null

        currentPageActive: PAGES_PATHNAME = PAGES_PATHNAME.OTHER
        set $currentPageActive(value: PAGES_PATHNAME) {
            if(this.$appHtmlElement) {
                const cubeContainer = (this.$appHtmlElement.querySelector(".app-cube-container") as HTMLElement);

                cubeContainer.style.transform = "";
                cubeContainer.style.transform = getComputedStyle(cubeContainer).transform;
                (this.$appHtmlElement.querySelector(".app-cube-container") as HTMLElement).style.transition = "";
                cubeContainer.style.transform = "";

                console.log("transition");
            }

            this.$beforePage = this.$currentPageActive;
            this.currentPageActive = value;
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

        h1 {
            color: white;
            position: relative;
            top: 25vh;
            left: 25vw;
            z-index: 1000000;
        }

        .app-cube-container {
            position: relative;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
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
            display: none;
            box-sizing: border-box;
            padding: 0 50px;
            width: 100vw;
            height: 100vh;
            overflow: scroll;
            border: solid 2px white;
            background-color: black;

            &.app-page-current {
                display: block;
            }
        }

        .page-transition-playing {
            &.app-cube-container {
                overflow: visible;
                position: absolute;
                width: 0;
                height: 0;
                top: 50vh;
                left: 50vw;
            }

            [class*=app-cube-flip] {
                display: block;
                position: absolute;
                top: -50vh;
                left: -50vw;
                transform-style: preserve-3d;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                -moz-backface-visibility: hidden;
                overflow: hidden;
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
    }
</style>