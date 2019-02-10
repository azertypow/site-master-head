<template>
    <section class="v-app-footer" :class="{'bg-dark': $backgroundIsDark}">

        <div class="v-app-footer__wrap">
            <div class="v-app-footer__left">
                <h5>© 2019 master media design</h5>
            </div>
            <!--<div class="v-app-footer__center"></div>-->
            <div class="v-app-footer__right">
                <a href="https://www.hesge.ch/head/" class="mmd-link--no-underline" target="_blank">
                    <img    v-if="$backgroundIsDark"
                            class="mmd-logo mmd-logo--small"
                            src="../../../../images/head-logo/logo-head-white.png"
                            alt="hesso logo">
                    <img    v-else
                            class="mmd-logo mmd-logo--small"
                            src="../../../../images/head-logo/logo-head-black.png"
                            alt="hesso logo">
                </a>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"

    @Component
    export default class AppFooter extends Vue {
        @Prop({required: true, type: Boolean}) $backgroundIsDark!: boolean

        @Prop({required: true}) readonly $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/pages";
    @import "../../../../styles/base/all";

    .v-app-footer {
        background-color: $color-main-light;
        color: $color-main-dark;

        &.bg-dark {
            background-color: $color-main-dark;
            color: $color-main-light;
        }
    }

    .v-app-footer__wrap {
        @include column-container;
        @include container-content-justified;
    }

    .v-app-footer__left,
    .v-app-footer__center {
        @include gutter;
        @include column(1, 1);

        @media (min-width: $break-regular) {
            @include column(1, 2);
        }

        @media (min-width: $break-medium) {
            @include column(2, 5);
        }
    }

    .v-app-footer__center {
        margin-top: 2rem;

        @media (min-width: $break-regular) {
            margin-top: 0;
        }
    }

    .v-app-footer__right {
        @include gutter;
        @include column(1, 1);
        margin-top: 2rem;

        @media (min-width: $break-medium) {
            @include column(1, 5);
            text-align: right;
            margin-top: 0;
        }
    }
</style>