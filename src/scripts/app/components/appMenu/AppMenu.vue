<template>
    <section id="app-menu" :class="{'bg-dark': $backgroundIsDark, 'bottom-is-open': $bottomIsOpen}">

        <div class="app-menu__top">
            <div class="app-menu__wrap">
                <button id="app-menu-contact"
                        class="app-menu__button button--small"
                        @click="goToPageContact"
                        :disabled="$currentPageIs_contact"
                >about<span class="contact-details"> / contact</span></button>

                <button id="app-menu-thesis"
                        class="app-menu__button button--small"
                        @click="goToPageThesis"
                        :disabled="$currentPageIs_thesis"
                >thesis</button>

                <button id="app-menu-home"
                        class="app-menu__button button--small"
                        @click="goToPageHome"
                        :disabled="$currentPageIs_home"
                >home</button>

                <button id="app-menu-projects"
                        class="app-menu__button button--small"
                        @click="goToPageProject"
                        :disabled="$currentPageIs_project"
                >projects</button>

                <button id="app-menu-alumni"
                        class="app-menu__button button--small"
                        @click="goToPageAlumni"
                        :disabled="$currentPageIs_alumni"
                >alumni</button>
            </div>
        </div>

        <div class="app-menu__bottom">
            <div class="app-menu__wrap">
                <div id="app-menu-lang">
                    <button v-if="this.siteIsFr"
                            class="button--small"
                            @click="setSiteToEn"
                    >english</button>

                    <button v-else
                            class="button--small"
                            @click="setSiteToFr"
                    >français</button>
                </div>
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

        private readonly siteLang: LANG_LIST = DEFAULT_SITE_LANG;

        set $siteLang(lang: LANG_LIST) {
            EventBus.$emit(EVENT_BUS_LIST.LANG, lang)

            // @ts-ignore: read-only property
            // noinspection TypeScriptUnresolvedVariable
            this.siteLang = lang
        }
        get $siteLang() { return this.siteLang }

        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        goToPageAlumni()    {this.$currentPage = PAGES_PATHNAME.ALUMNI  }
        goToPageContact()   {this.$currentPage = PAGES_PATHNAME.CONTACT }
        goToPageHome()      {this.$currentPage = PAGES_PATHNAME.HOME    }
        goToPageProject()   {this.$currentPage = PAGES_PATHNAME.PROJECT }
        goToPageThesis()    {this.$currentPage = PAGES_PATHNAME.THESIS  }

        private readonly currentPage!: PAGES_PATHNAME
        set $currentPage(pageName: PAGES_PATHNAME) {

            console.log("page change")

            if(pageName !== this.currentPage) {
                EventBus.$emit(EVENT_BUS_LIST.PAGE_CHANGED, [pageName])

                // @ts-ignore: read-only property
                // noinspection TypeScriptUnresolvedVariable
                this.currentPage = pageName
                window.history.pushState(pageName, pageName, pageName)
            }
        }
        get $currentPage(): PAGES_PATHNAME {return this.currentPage}

        private get $currentPageIs_contact()    {   return this.$currentPage === PAGES_PATHNAME.CONTACT }
        private get $currentPageIs_thesis()     {   return this.$currentPage === PAGES_PATHNAME.THESIS  }
        private get $currentPageIs_home()       {   return this.$currentPage === PAGES_PATHNAME.HOME    }
        private get $currentPageIs_project()    {   return this.$currentPage === PAGES_PATHNAME.PROJECT }
        private get $currentPageIs_alumni()     {   return this.$currentPage === PAGES_PATHNAME.ALUMNI  }

        get $backgroundIsDark() {   return PAGE_SETTINGS[this.$currentPage].backgroundIsDark }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";

    #app-menu {
        $transition-color-timing:   500ms 500ms;
        $app-section-height:        3rem;
        $shadow-blur:               $app-section-height / 3 * 2;
        $shadow-y:                  $app-section-height / 2;
        $shadow-properties--top:    inset 0  $shadow-y $shadow-blur;
        $shadow-properties--bottom: inset 0 #{-$shadow-y} $shadow-blur;

        transition: color $transition-color-timing;

        &.bg-dark {
            color: $color-main-light;

            .app-menu__top {
                box-shadow: $shadow-properties--top black;
            }
            .app-menu__bottom {
                box-shadow: $shadow-properties--bottom black;
            }
        }

        @mixin app-menu-section {
            @include gutter;
            box-sizing: border-box;
            position: fixed;
            z-index: 1000;
            width: 100%;
            left: 0;
            height: $app-section-height;
            transition: box-shadow $transition-color-timing;
        }

        .app-menu__top {
            @include app-menu-section;
            top: 0;
            padding-top: 1rem;
            box-shadow: $shadow-properties--top white;
        }

        .app-menu__bottom {
            @include app-menu-section;
            bottom: 0;
            padding-bottom: 1rem;
            box-shadow: $shadow-properties--bottom white;
        }

        .app-menu__wrap {
            position: relative;
            height: 100%;
            width: 100%;
        }

        .app-menu__button {
            &.active {
                cursor: default;
                line-height: 0;
                padding-bottom: 0;
            }
        }

        #app-menu-lang {
            position: absolute;
            right: $gutter-width / 2;
        }

        #app-menu-contact {
            position: absolute;
            top: 0;
            left: 0;
            transform: translateX(0);
        }
        #app-menu-thesis {
            position: absolute;
            top: 0;
            left: 25%;
            transform: translateX(-50%);
        }
        #app-menu-home {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        #app-menu-projects {
            position: absolute;
            top: 0;
            right: 25%;
            transform: translateX(50%);
        }
        #app-menu-alumni {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateX(0);
        }
    }

    #app-menu.bottom-is-open {
        .app-menu__bottom {
            bottom: $footer-height;
        }
    }
</style>