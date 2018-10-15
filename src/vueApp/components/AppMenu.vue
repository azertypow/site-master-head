<template>
    <section id="app-menu">
        <div id="app-menu-lang">
            <button @click="setSiteToFr" :class="{ active: siteIsFr}">fr</button>
            <button @click="setSiteToEn" :class="{ active: siteIsEn}">en</button>
        </div>
        <div id="app-menu-contact">contact / about</div>
        <div id="app-menu-alumni">alumni</div>
        <div id="app-menu-projects">projects</div>
        <div id="app-menu-thesis">thesis</div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {LANG_LIST} from "../GLOBAL_ENUMS"

    @Component
    export default class AppMenu extends Vue {
        @Prop({default: LANG_LIST.FR}) initialSiteLang!: LANG_LIST

        private p_siteLang: LANG_LIST = this.initialSiteLang

        setSiteToFr() {
            this.siteLang = LANG_LIST.FR
        }

        setSiteToEn() {
            this.p_siteLang = LANG_LIST.EN
        }

        set siteLang(lang: LANG_LIST) {
            this.p_siteLang = lang
        }
        get siteLang() {
            return this.p_siteLang
        }

        get siteIsFr() {
            return this.siteLang === LANG_LIST.FR
        }

        get siteIsEn() {
            return this.siteLang === LANG_LIST.EN
        }
    }
</script>

<style lang="scss">
    #app-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        #app-menu-lang {
            position: absolute;
            top: 0;
            right: 0;
        }

        #app-menu-contact {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }

        #app-menu-alumni {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
        }

        #app-menu-projects {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
        }

        #app-menu-thesis {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
</style>