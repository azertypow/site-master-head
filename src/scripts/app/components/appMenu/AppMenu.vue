import {PAGES_PATHNAME} from "../../../../SETTINGS"
import {PAGES_PATHNAME} from "../../../../SETTINGS"
<template>
    <section id="app-menu" :class="{'bg-dark': backgroundIsDark, 'bottom-is-open': $bottomIsOpen}">
        <div id="app-menu-lang" class="top-right">
            <button @click="setSiteToFr" :class="{ 'lang-active': siteIsFr}">fr</button>
            <button @click="setSiteToEn" :class="{ 'lang-active': siteIsEn}">en</button>
        </div>
        <button id="app-menu-contact"  @click="goToPageContact" :class="$contactBtnClassPosition" >contact / about</button>
        <button id="app-menu-thesis"   @click="goToPageThesis"  :class="$thesisBtnClassPosition"  >thesis</button>
        <button id="app-menu-home"     @click="goToPageHome"    :class="$homeBtnClassPosition"    >home</button>
        <button id="app-menu-projects" @click="goToPageProject" :class="$projectBtnClassPosition" >projects</button>
        <button id="app-menu-alumni"   @click="goToPageAlumni"  :class="$alumniBtnClassPosition"  >alumni</button>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {EventBus} from "../../../event-bus"
    import {DEFAULT_SITE_LANG, PAGES_PATHNAME} from "../../../../SETTINGS"
    import {getWindowPageInfo} from "../../../currentPageInfo"

    @Component
    export default class AppMenu extends Vue {
        constructor() {
            super();

            this.$currentPage = getWindowPageInfo(window).pathname
        }

        @Prop({required: true}) $bottomIsOpen!: boolean

        setSiteToFr() { this.$siteLang = LANG_LIST.FR }
        setSiteToEn() { this.$siteLang = LANG_LIST.EN }

        private siteLang = DEFAULT_SITE_LANG

        set $siteLang(lang: LANG_LIST) {
            EventBus.$emit(EVENT_BUS_LIST.LANG, lang)
            this.siteLang = lang
        }
        get $siteLang() { return this.siteLang }

        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
        get siteIsEn() { return this.$siteLang === LANG_LIST.EN }


        goToPageAlumni()    {this.$currentPage = PAGES_PATHNAME.ALUMNI}
        goToPageContact()   {this.$currentPage = PAGES_PATHNAME.CONTACT}
        goToPageHome()      {this.$currentPage = PAGES_PATHNAME.HOME}
        goToPageProject()   {this.$currentPage = PAGES_PATHNAME.PROJECT}
        goToPageThesis()    {this.$currentPage = PAGES_PATHNAME.THESIS}

        /*
        * button class position
        * */
        private currentPage!: PAGES_PATHNAME
        set $currentPage(pageName: PAGES_PATHNAME) {
            EventBus.$emit(EVENT_BUS_LIST.PAGE_CHANGED, [pageName])
            console.log("seeeeeet")
            this.currentPage = pageName
            window.history.pushState(pageName, pageName, pageName)
        }
        get $currentPage(): PAGES_PATHNAME {return this.currentPage}

        private get $contactBtnClassPosition() {
            switch (this.currentPage) {
                case PAGES_PATHNAME.CONTACT :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.TOP_MIDDLE
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.TOP_MIDDLE
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.TOP_MIDDLE
                case PAGES_PATHNAME.ALUMNI :
                    return BTN_POSITION.BOTTOM_MIDDLE
            }
        }
        private get $thesisBtnClassPosition() {
            switch (this.currentPage) {
                case PAGES_PATHNAME.CONTACT :
                    return BTN_POSITION.HIDDEN
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.ALUMNI :
                    return BTN_POSITION.HIDDEN
            }
        }
        private get $homeBtnClassPosition() {
            switch (this.currentPage) {
                case PAGES_PATHNAME.CONTACT :
                    return BTN_POSITION.BOTTOM_MIDDLE
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.ALUMNI :
                    return BTN_POSITION.TOP_MIDDLE
            }
        }
        private get $projectBtnClassPosition() {
            switch (this.currentPage) {
                case PAGES_PATHNAME.CONTACT :
                    return BTN_POSITION.HIDDEN
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.ALUMNI :
                    return BTN_POSITION.HIDDEN
            }
        }
        private get $alumniBtnClassPosition() {
            switch (this.currentPage) {
                case PAGES_PATHNAME.CONTACT :
                    return BTN_POSITION.TOP_MIDDLE
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.BOTTOM_MIDDLE
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.BOTTOM_MIDDLE
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.BOTTOM_MIDDLE
                case PAGES_PATHNAME.ALUMNI :
                    return BTN_POSITION.ACTIVE
            }
        }

        // noinspection JSMethodCanBeStatic
        get backgroundIsDark() {
            return getWindowPageInfo(window).backgroundIsDark
        }
    }

    enum BTN_POSITION {
        TOP_MIDDLE      = "top-middle",
        TOP_RIGHT       = "top-right",
        MIDDLE_LEFT     = "middle-left",
        MIDDLE_RIGHT    = "middle-right",
        BOTTOM_MIDDLE   = "bottom-middle",
        ACTIVE          = "active",
        HIDDEN          = "hidden"
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";

    #app-menu {
        &.bg-dark {
            color: $color-main-light;
        }

        @mixin menuElements {
            z-index: 1000;
            position: fixed;
        }

        #app-menu-contact,
        #app-menu-alumni,
        #app-menu-projects,
        #app-menu-thesis,
        #app-menu-home {
            @include menuElements;
        }

        #app-menu-lang {
            @include menuElements;
            > *.lang-active {
                color: red;
            }
        }

        .top-middle {
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .top-right {
            top: 0;
            right: 0;
        }
        .middle-left {
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
        }
        .middle-right {
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
        }
        .bottom-middle {
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .active {
            display: none;
        }
        .hidden {
            display: none;
        }
    }

    #app-menu.bottom-is-open {
        .bottom-middle {
            bottom: 6em;
        }
    }
</style>