<template>
    <section id="app-menu" :class="{'bg-dark': $backgroundIsDark, 'bottom-is-open': $bottomIsOpen, 'menu-open': menuOpen}">

        <div class="app-menu__top">
            <div class="app-menu__wrap">
                <nav id="app-menu-nav">
                    <div id="nav-burger"
                         @click="burgerClicked()">
                        <div class="nav-burger__container">
                            <span class="nav-burger__line top"></span>
                            <span class="nav-burger__line middle"></span>
                            <span class="nav-burger__line bottom"></span>
                        </div>
                    </div>

                    <button id="app-menu-home"
                            class="app-menu__button button--small app-menu-nav__item"
                            @click="goToPageHome"
                            :disabled="$currentPageIs_home"
                    ><template v-if="siteIsFr">accueil</template><template v-else>home</template></button>

                    <button id="app-menu-projects"
                            class="app-menu__button button--small app-menu-nav__item"
                            @click="goToPageProject"
                            :disabled="$currentPageIs_project"
                    ><template v-if="siteIsFr">projets</template><template v-else>projects</template></button>

                    <button id="app-menu-thesis"
                            class="app-menu__button button--small app-menu-nav__item"
                            @click="goToPageThesis"
                            :disabled="$currentPageIs_thesis"
                    ><template v-if="siteIsFr">mémoires</template><template v-else>thesis</template></button>

                    <button id="app-menu-alumni"
                            class="app-menu__button button--small app-menu-nav__item"
                            @click="goToPageAlumni"
                            :disabled="$currentPageIs_alumni"
                    ><template v-if="siteIsFr">alumni</template><template v-else>alumni</template></button>

                    <button id="app-menu-contact"
                            class="app-menu__button button--small app-menu-nav__item"
                            @click="goToPageContact"
                            :disabled="$currentPageIs_contact"
                    ><template v-if="siteIsFr">à propos</template><template v-else>about</template><span class="contact-details"> / contacts</span></button>

                    <button id="inscription" class="app-menu__button button--small app-menu-nav__item">
                        <a v-if="siteIsFr"  href="https://age.hes-so.ch/imoniteur_AGEP/!formInscrs.connection?ww_c_formulaire=FORM_HEAD_MA_2019&ww_c_langue=fr" target="_blank">s'inscrire</a>
                        <a v-else           href="https://age.hes-so.ch/imoniteur_AGEP/!formInscrs.connection?ww_c_formulaire=FORM_HEAD_MA_2019&ww_c_langue=en" target="_blank">register</a>
                    </button>
                </nav>

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

    @Component({
        mounted: function() {
            window.addEventListener("resize", () => {
                if((this as AppMenu).menuOpen) (this as AppMenu).menuOpen = false
            })
        }
    })
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

            if(this.menuOpen) this.menuOpen = false

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

        menuOpen = false

        burgerClicked() {
            this.menuOpen = !this.menuOpen
        }
    }
</script>

<style lang="scss" scoped>
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
            font-size: inherit;
            padding-top: 1rem;
            padding-left: $gutter-width / 2;
            padding-right: $gutter-width / 2;
        }

        .app-menu__wrap {
            @include column-container;
            align-items: center;
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
    }

    #app-menu-nav {
        @include column-container;
        user-select: none;
    }

    .app-menu-nav__item {
        margin-right: $gutter-width;
        font-size: 1.4em !important;
    }

    #app-menu-home,
    #app-menu-projects,
    #app-menu-thesis,
    #app-menu-alumni,
    #app-menu-contact {
        display: none;
    }

    @media (min-width: $break-regular) {
        #app-menu-home,
        #app-menu-projects,
        #app-menu-thesis,
        #app-menu-alumni,
        #app-menu-contact {
            display: block;
        }
    }

    #app-menu-lang {
        margin-left: auto;
        font-size: 0.8em;

        @media (min-width: $break-extra-small) {
            font-size: inherit;
        }

        > button {
            color: black;

            .bg-dark & {
                color: white;
            }
        }
    }

    #nav-burger {
        width: 3rem;
        height: 2rem;
        position: relative;
        box-sizing: border-box;
        padding: 0.5rem 1.5rem 0.5rem 0;
        cursor: pointer;
        display: block;

        @media (min-width: $break-regular) {
            display: none;
        }
    }

    .nav-burger__container {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    .nav-burger__line {
        height: 1px;
        width: 100%;
        position: absolute;
        background: black;

        .bg-dark & {
            background: white;
        }
    }


    .top {
        top: 0;
    }

    .middle {
        top: 50%;
    }

    .bottom {
        bottom: 0;
    }

    #app-menu.menu-open {
        .app-menu__top {
            height: 100%;
            background: white;
        }

        &.bg-dark {
            .app-menu__top {
                background: black;
            }
        }

        #nav-burger {
            position: fixed;
            top: 1rem;
            left: 1rem;
        }

        #app-menu-lang {
            position: fixed;
            top: 1rem;
            right: 1rem;
        }

        #inscription {
            position: fixed;
            top: 1.5rem;
            left: 4rem;
        }

        $break-menu-small: 450px;

        #app-menu-home,
        #app-menu-projects,
        #app-menu-thesis,
        #app-menu-alumni,
        #app-menu-contact {
            display: block;
            font-size: 2em !important;
            line-height: 1.5em;
            font-family: "Suisse Neue", serif;

            @media (min-width: $break-menu-small) {
                font-size: 3em !important;
            }
        }

        #app-menu-nav {
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 3rem;
            position: absolute;
            left: 0;
            top: 0;
            max-height: 30rem;

            @media (min-width: $break-menu-small) {
                max-height: 40rem;
                top: auto;
                bottom: 0;
            }
        }

        .app-menu-nav__item {
            text-align: left;
        }
    }
</style>