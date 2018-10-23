<template>
    <section id="app-menu" :class="{'bg-dark': backgroundIsDark, 'bottom-is-open': $bottomIsOpen}">
        <div id="app-menu-lang">
            <button @click="setSiteToFr" :class="{ active: siteIsFr}">fr</button>
            <button @click="setSiteToEn" :class="{ active: siteIsEn}">en</button>
        </div>
        <button id="app-menu-home"     @click="goToPageHome">home</button>
        <button id="app-menu-contact"  @click="goToPageContact">contact / about</button>
        <button id="app-menu-alumni"   @click="goToPageAlumni">alumni</button>
        <button id="app-menu-projects" @click="goToPageProject">projects</button>
        <button id="app-menu-thesis"   @click="goToPageThesis">thesis</button>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {EventBus} from "../../../event-bus"
    import {IAppMenuData} from "./IAppMenuData"
    import {PAGES_PATHNAME} from "../../../../SETTINGS"
    import {getWindowPageInfo} from "../../../currentPageInfo"

    @Component
    export default class AppMenu extends Vue {
        @Prop({required: true}) data!: IAppMenuData
        @Prop({required: true}) $bottomIsOpen!: boolean

        setSiteToFr() { this.$siteLang = LANG_LIST.FR }
        setSiteToEn() { this.$siteLang = LANG_LIST.EN }

        private siteLang = this.data.lang

        set $siteLang(lang: LANG_LIST) {
            EventBus.$emit(EVENT_BUS_LIST.LANG, lang)
            this.siteLang = lang
        }
        get $siteLang() { return this.siteLang }

        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
        get siteIsEn() { return this.$siteLang === LANG_LIST.EN }


        goToPageAlumni()    {this.goToPage(PAGES_PATHNAME.ALUMNI)}
        goToPageContact()   {this.goToPage(PAGES_PATHNAME.CONTACT)}
        goToPageHome()      {this.goToPage(PAGES_PATHNAME.HOME)}
        goToPageProject()   {this.goToPage(PAGES_PATHNAME.PROJECT)}
        goToPageThesis()    {this.goToPage(PAGES_PATHNAME.THESIS)}

        goToPage(pageName: PAGES_PATHNAME) {
            window.history.pushState(pageName, pageName, pageName)
            console.log(this.backgroundIsDark())
        }

        // noinspection JSMethodCanBeStatic
        backgroundIsDark() {
            return getWindowPageInfo(window).backgroundIsDark
        }
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

        #app-menu-home {
            @include menuElements;
        }

        #app-menu-lang {
            @include menuElements;
            top: 0;
            right: 0;
            > *.active {
                color: red;
            }
        }

        #app-menu-contact {
            @include menuElements;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }

        #app-menu-alumni {
            @include menuElements;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
        }

        #app-menu-projects {
            @include menuElements;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
        }

        #app-menu-thesis {
            @include menuElements;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }

    #app-menu.bottom-is-open {
        #app-menu-thesis {
            bottom: 6em;
        }
    }
</style>