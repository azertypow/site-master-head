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
                <page-home
                        :data="appData.allPagesData.home"
                        :$siteLang="$siteLang"></page-home>
            </div>


            <div class="app-cube-flip-projects" :class="[this.getClassNamePageHistoryState('/project')]">
                <page-projects
                        ref="projectPage"
                        :data="appData.allPagesData.projects"
                        :allProjects="appData.allProjects"
                        :$siteLang="$siteLang" ></page-projects>
            </div>


            <div class="app-cube-flip-alumni"   :class="[this.getClassNamePageHistoryState('/alumni')]">
                <page-alumni
                        :data="appData.allPagesData.alumni"
                        :allAlumni="appData.allAlumni"
                        :$siteLang="$siteLang" ></page-alumni>
            </div>


            <div class="app-cube-flip-contact"  :class="[this.getClassNamePageHistoryState('/contact')]">
                <page-contact
                        :data="appData.allPagesData.contact"
                        :allContacts="appData.allContacts"
                        :$siteLang="$siteLang" ></page-contact>
            </div>


            <div class="app-cube-flip-thesis"   :class="[this.getClassNamePageHistoryState('/thesis')]">
                <page-thesis
                        :data="appData.allPagesData.thesis"
                        :allThesis="appData.allThesis"
                        :$siteLang="$siteLang" ></page-thesis>
            </div>


        </div>
        <bottom-bar
                :$siteLang="$siteLang"
                :$bottomIsOpen="$BottomIsOpen"></bottom-bar>

        <ImageViewer @imageViewerClosed="closeImageViewer()"
                     :imageOpenData="imageOpenData"></ImageViewer>
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
    import PageAlumni from "./pages/alumni/PageAlumni"
    import PageThesis from "./pages/thesis/PageThesis"
    import PageContact from "./pages/contact/PageContact"
    import {IMedia_generatedItem} from "../api/genericsApiTypesIntefaces"
    import ImageViewer from "./components/image/ImageViewer.vue"

    @Component ({
        components: {
            PageContact,
            PageThesis,
            PageAlumni,
            AppMenu,
            PageHome,
            PageProjects,
            BottomBar,
            ImageViewer,
        },
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.OPEN_IMAGE_DETAILS, (event: IMedia_generatedItem) => {
                (this as App).imageOpenData = event
            })

            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                (this as App).$siteLang = event
            })

            EventBus.$on(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR, () => {
                (this as App).$BottomIsOpen = false
            })

            EventBus.$on(EVENT_BUS_LIST.PAGE_CHANGED, (pageName: string[]) => {
                (this as App).pageTransitionRun = true;

                (this as App).$currentPageActive = pageName[0] as PAGES_PATHNAME


                const projectPage = ((this as App).$refs.projectPage as PageProjects)

                if(projectPage) {
                    if(projectPage.projectOpen) {
                        projectPage.projectOpen = null
                    }
                }
            })
        },
        mounted: function () {

            const appHTMLElement = (this as App).$el as HTMLDivElement

            (this as App).$appHTMLElement = appHTMLElement;

            (this as App).initAppCubePosition();

            // todo event compatibility: https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
            appHTMLElement.addEventListener("transitionend", (e) => {

                const targetElement = e.target
                if(targetElement instanceof HTMLElement) {
                    if(targetElement.classList.contains("app-cube-container")) {
                        (this as App).initAppCubePosition();
                        (this as App).pageTransitionRun = false;
                    }
                }
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

        $appHTMLElement: HTMLElement | null = null

        currentPageActive: PAGES_PATHNAME = PAGES_PATHNAME.OTHER
        set $currentPageActive(value: PAGES_PATHNAME) {
            if(this.$appHTMLElement) {
                const cubeContainer = (this.$appHTMLElement.querySelector(".app-cube-container") as HTMLElement);

                cubeContainer.style.transform = "";
                cubeContainer.style.transform = getComputedStyle(cubeContainer).transform;
                cubeContainer.style.transition = "";
                cubeContainer.style.transform = "";
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

        initAppCubePosition() {
            if(this.$appHTMLElement) {
                (this.$appHTMLElement.querySelector(".app-cube-container") as HTMLElement).style.transition = "none";
                (this.$appHTMLElement.querySelector(".app-cube-container") as HTMLElement).style.transform = "none";
            }
        }

        private static setHTMLLangAttribute(lang: LANG_LIST) {
            try {
                (document.querySelector('html') as HTMLElement).setAttribute('lang', lang)
            } catch (e) {
                console.error("can't set html lang attribute: ", e)
            }
        }

        imageOpenData: IMedia_generatedItem | null = null

        closeImageViewer() {
            this.imageOpenData = null
        }
    }
</script>

<style lang="scss">
    @import "../../styles/_params";

    #image-viewer {
        position: fixed;
        background: black;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1000000;
        transform: translate3d(0px, 0px, 20000px);
    }

    #app {

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
            width: 100vw;
            height: 100vh;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            //border: solid 2px $color-main-light;

            &.app-page-current {
                display: block;
            }

            &.app-cube-flip-home {
                background-color: $color-main-dark;
            }
            &.app-cube-flip-project {
                background-color: $color-main-dark;
            }
            &.app-cube-flip-thesis {
                background-color: $color-main-dark;
            }
            &.app-cube-flip-alumni {
                background-color: $color-main-light;
            }
            &.app-cube-flip-contact {
                background-color: $color-main-light;
                scroll-behavior: smooth;
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