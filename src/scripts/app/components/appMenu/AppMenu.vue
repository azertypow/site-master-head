import {PAGES_PATHNAME} from "../../../../SETTINGS"
import {PAGES_PATHNAME} from "../../../../SETTINGS"
<template>
    <section id="app-menu" :class="{'bg-dark': $backgroundIsDark, 'bottom-is-open': $bottomIsOpen}">

        <div class="app-menu__top">
            <div id="app-menu-lang" class="top-right">
                <button @click="setSiteToFr" :class="{ 'lang-active': siteIsFr}">fr</button>
                <button @click="setSiteToEn" :class="{ 'lang-active': siteIsEn}">en</button>
            </div>
        </div>

        <div class="app-menu__bottom">
            <div class="app-menu__bottom__wrap">
                <button id="app-menu-contact"  @click="goToPageContact" :class="$contactBtnClassPosition" >contact / about</button>
                <button id="app-menu-thesis"   @click="goToPageThesis"  :class="$thesisBtnClassPosition"  >thesis</button>
                <button id="app-menu-home"     @click="goToPageHome"    :class="$homeBtnClassPosition"    >home</button>
                <button id="app-menu-projects" @click="goToPageProject" :class="$projectBtnClassPosition" >projects</button>
                <button id="app-menu-alumni"   @click="goToPageAlumni"  :class="$alumniBtnClassPosition"  >alumni</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {EventBus} from "../../../event-bus"
    import {DEFAULT_SITE_LANG, PAGE_SETTINGS, PAGES_PATHNAME} from "../../../../SETTINGS"
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
            if(pageName !== this.currentPage) {
                EventBus.$emit(EVENT_BUS_LIST.PAGE_CHANGED, [pageName])
                this.currentPage = pageName
                window.history.pushState(pageName, pageName, pageName)
            }
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
                    // return BTN_POSITION.HIDDEN
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.ALUMNI :
                    // return BTN_POSITION.HIDDEN
                    return BTN_POSITION.MIDDLE_LEFT
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
                    // return BTN_POSITION.HIDDEN
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.THESIS :
                    return BTN_POSITION.MIDDLE_LEFT
                case PAGES_PATHNAME.HOME :
                    return BTN_POSITION.MIDDLE_RIGHT
                case PAGES_PATHNAME.PROJECT :
                    return BTN_POSITION.ACTIVE
                case PAGES_PATHNAME.ALUMNI :
                    // return BTN_POSITION.HIDDEN
                    return BTN_POSITION.MIDDLE_RIGHT
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

        get $backgroundIsDark() {
            return PAGE_SETTINGS[this.$currentPage].backgroundIsDark
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
    @import "../../../../styles/_grid";

    #app-menu {
        $transition-color-timing: 500ms 500ms;

        transition: color $transition-color-timing;

        &.bg-dark {
            color: $color-main-light;

            .app-menu__top {
                box-shadow: inset 0 25px 30px black;
            }
            .app-menu__bottom {
                box-shadow: inset 0 -25px 30px black;
            }
        }

        /*@mixin menuElements {
            z-index: 1000;
            position: fixed;
        }

        #app-menu-contact,
        #app-menu-alumni,
        #app-menu-projects,
        #app-menu-thesis,
        #app-menu-home {
            @include menuElements;
        }*/

        .app-menu__top {
            position: fixed;
            z-index: 1000;
            width: 100%;
            top: 0;
            left: 0;
            height: 2em;
            transition: box-shadow $transition-color-timing;
            box-shadow: inset 0 25px 30px white;
        }

        .app-menu__bottom {
            @include gutter;
            box-sizing: border-box;
            position: fixed;
            z-index: 1000;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 2em;
            transition: box-shadow $transition-color-timing;
            box-shadow: inset 0 -25px 30px white;

            &__wrap {
                position: relative;
                width: 100%;
                @include column-container;
                @include container-content-justified;

                .active {
                    position: fixed;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    border: none;
                }
            }
        }

        #app-menu-lang {
            //@include menuElements;
            position: absolute;
            right: $gutter-width / 2;

            > *.lang-active {
                color: red;
            }
        }

        /*.top-middle {
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
        }*/
    }

    #app-menu.bottom-is-open {
        /*.bottom-middle {
            bottom: 6em;
        }*/

        .app-menu__bottom {
            bottom: 5em;
        }
    }
</style>