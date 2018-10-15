<template>
    <section id="app-header">
        <h2 class="title">{{title}}</h2>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {ClassNames} from "../../ClassNames"

    @Component
    export default class AppHeader extends Vue {
        @Prop({default: "page title"}) title!: string
    }
</script>

<style lang="scss">
    #app-header {

    }
</style>