<template>
    <section class="v-app-footer" :class="{'bg-dark': $backgroundIsDark}">

        <div class="v-app-footer__wrap">
            <div class="v-app-footer__left">
                <h5>© 2019 master media design</h5>
                <h6>
                    <a href="https://www.hesge.ch/head/" target="_blank">
                        <template   v-if="this.siteIsFr"    >HEAD — Genève, Haute école d'art et de design</template>
                        <template   v-else                  >HEAD — Geneva, High School of Art and Design</template>
                    </a>
                </h6>
            </div>
            <div class="v-app-footer__center">
                <h5 class="has-no-space-next-line">fonts</h5>
                <h6>
                    <a href="https://klim.co.nz/retail-fonts/domaine-sans-text/"    target="_blank">Klim — Domaine Sans Text</a>
                    <br>
                    <a href="https://www.swisstypefaces.com/fonts/suisse/"          target="_blank">Swiss Typefaces — Suisse Neue</a>
                </h6>
            </div>
            <div class="v-app-footer__right">
                <img    class="mmd-logo mmd-logo--small"
                        src="https://www.hesge.ch/hem/sites/default/files/contributions/Logos/hes-so_geneve_defonce_blanc.png"
                        alt="hesso logo">
            </div>
            <div class="v-app-footer__bottom">
                <h6>
                    <a href="https://github.com/azertypow/site-master-head/issues/new" target="_blank">
                        <template   v-if="this.siteIsFr"    >rapporter un bug ou un commentaire</template>
                        <template   v-else                  >report a bug or comment</template>
                    </a>
                </h6>
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

        a {
            @extend .mmd-link;
            @extend .mmd-link--arrow;
        }
    }

    .v-app-footer__wrap {
        @include column-container;
        @include container-content-justified;
    }

    .v-app-footer__left,
    .v-app-footer__center {
        @include column(1, 3);
        @include gutter;
    }

    .v-app-footer__right {
        @include column(1, 3);
        @include gutter;
        text-align: right;
    }

    .v-app-footer__bottom {
        @include gutter;
        margin-top: 2rem;
        @include column(1, 1);
    }
</style>