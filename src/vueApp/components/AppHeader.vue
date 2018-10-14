<template>
    <section id="app-header" v-bind:class="currentPageName" class="hello">
        <h2 class="title">{{name}}</h2>
    </section>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {ClassNames} from "../../ClassNames"

    @Component
    export default class AppHeader extends Vue {
        @Prop() name!: string
        @Prop() currentPageName!: ClassNames
    }
</script>

<style lang="scss">
    #app-header {

    }
</style>