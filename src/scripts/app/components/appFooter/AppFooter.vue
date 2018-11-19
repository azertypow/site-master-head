<template>
    <section id="app-footer">
        <p>footer</p>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"

    @Component
    export default class AppFooter extends Vue {

    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #app-footer {
        @include page-dark;
        height: 10em;
    }
</style>