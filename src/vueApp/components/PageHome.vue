<template>
    <section id="page-home">
        <app-header :title="headerTitle"/>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import AppHeader from './AppHeader'

    @Component({
        components: {
            AppHeader
        }
    })
    export default class PageHome extends Vue {
        @Prop({default: "header title"}) headerTitle!: string
    }
</script>

<style lang="scss">
    #page-home {

    }
</style>