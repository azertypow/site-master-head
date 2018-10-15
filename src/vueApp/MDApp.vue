<template>
    <section id="md-app">
        <app-menu initialSiteLang="fr"></app-menu>
        <page-home :headerTitle="homeTitle"></page-home>
        {{homeTitle}}
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import AppMenu from "./components/AppMenu"
    import PageHome from './components/PageHome'
    import {ClassNames} from "../ClassNames"

    @Component ({
        components: {
            AppMenu,
            PageHome,
        }
    })
    export default class MDApp extends Vue {
        @Prop({default: "home title"}) homeTitle!: string
    }
</script>

<style lang="scss">
    #md-app {

    }
</style>