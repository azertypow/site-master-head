<template>
    <section id="app-footer" :class="{'bg-dark': $backgroundIsDark}">
        <p>footer</p>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"

    @Component
    export default class AppFooter extends Vue {
        @Prop({required: true, type: Boolean}) $backgroundIsDark!: boolean
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/pages";

    #app-footer {
        background-color: $color-main-light;
        color: $color-main-dark;

        &.bg-dark {
            background-color: $color-main-dark;
            color: $color-main-light;
        }

        height: 10em;
    }
</style>