<template>
    <section id="app-menu" :class="{'bg-dark': $backgroundIsDark, 'bottom-is-open': $bottomIsOpen}">

        <div class="app-menu__top">
            <div class="app-menu__wrap">
                <button id="app-menu-contact"
                        class="app-menu__button button--small"
                        @click="goToPageContact"
                        :disabled="$currentPageIs_contact"
                ><template v-if="siteIsFr">à propos</template><template v-else>about</template><span class="contact-details"> / contacts</span></button>

                <button id="app-menu-thesis"
                        class="app-menu__button button--small"
                        @click="goToPageThesis"
                        :disabled="$currentPageIs_thesis"
                ><template v-if="siteIsFr">mémoires</template><template v-else>thesis</template></button>

                <button id="app-menu-home"
                        class="app-menu__button button--small"
                        @click="goToPageHome"
                        :disabled="$currentPageIs_home"
                ><template v-if="siteIsFr">accueil</template><template v-else>home</template></button>

                <button id="app-menu-projects"
                        class="app-menu__button button--small"
                        @click="goToPageProject"
                        :disabled="$currentPageIs_project"
                ><template v-if="siteIsFr">projets</template><template v-else>projects</template></button>

                <button id="app-menu-alumni"
                        class="app-menu__button button--small"
                        @click="goToPageAlumni"
                        :disabled="$currentPageIs_alumni"
                ><template v-if="siteIsFr">alumni</template><template v-else>alumni</template></button>
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
    @import "../../../../styles/fix";

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
                @include -fix-safari-navigation-3d-overflow;
                box-shadow: $shadow-properties--top black;
            }
            .app-menu__bottom {
                @include -fix-safari-navigation-3d-overflow;
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
            box-shadow: $shadow-properties--top white;

            font-size: 0.8em;
            padding-left: $gutter-width / 4;
            padding-right: $gutter-width / 4;
            padding-top: .5rem;

            @media (min-width: $break-extra-small) {
                font-size: inherit;
                padding-top: 1rem;
                padding-left: $gutter-width / 2;
                padding-right: $gutter-width / 2;
            }
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
            border: transparent;
            padding: 0;

            &:disabled {
                font-style: italic;
            }
        }

        .contact-details {
            display: none;

            @media (min-width: $break-medium) {
                display: inline;
            }
        }

        #app-menu-lang {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 0.8em;

            @media (min-width: $break-extra-small) {
                font-size: inherit;
            }
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
            transform: translateX(-25%);
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
            transform: translateX(25%);
        }
        #app-menu-alumni {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateX(0);
        }
    }

    #app-menu-lang {
        > button {
            color: black;

            .bg-dark & {
                color: white;
            }
        }
    }

    #app-menu.bottom-is-open {
        .app-menu__bottom {
            bottom: $footer-height;
        }
    }
</style>