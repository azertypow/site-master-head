<template>
    <section class="v-page-alumni">
        <HeaderWithImage
                :hasMaxHeight="true"
                class="alumni-header"
                :subtitleFr="$allAlumni.info.title_fr"
                :subtitle="$allAlumni.info.title_en"
                jpgImageName="Diptyque2"
                :isWhite="true" />

        <main class="v-page-alumni__main">
            <div class="v-page-alumni__main__alumni">
                <template v-for="alumni of this.$alumniToShow">
                    <div class="v-page-alumni__main__alumni__item">
                        <alumni :data="alumni"/>
                    </div>
                </template>
            </div>
        </main>

        <footer class="v-page-alumni__footer">
            <app-footer
                    :$siteLang="$siteLang"
                    :$backgroundIsDark=false></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IAllAlumni, IAlumnisItem} from "../../../api/genericsApiTypesIntefaces"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Alumni from "../../components/alumni/Alumni"
    import HeaderWithImage from "../../components/header/HeaderWithImage.vue"

    @Component({
        components: {
            Alumni,
            AppFooter,
            FilterSetting,
            HeaderWithImage
        }
    })
    export default class PageAlumni extends Vue {
        @Prop({required: true}) allAlumni!: IAllAlumni
        get $allAlumni() { return this.allAlumni }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/
        get $alumniToShow(): IAlumnisItem[] {
            return this.$allAlumni.alumnis
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/pages";

    .empty-header {
        height: 6rem;
        width: 100%;

        @media (min-width: $break-small) {
            height: 8rem;
        }
    }

    .alumni-header {
        margin-bottom: 4rem;
    }

    .v-page-alumni {
        @include page-light;

        .header-with-text__text:after {
            content: none;
        }

        &__main {
            @include column(12, 12);
            padding: 0;

            &__alumni {
                @include column-container;
                margin-top: 5rem;

                &__item {
                    @include column(1, 1);
                    @include gutter;
                    margin-top: 5em;

                    @media (min-width: $break-small) {
                        @include column(6, 12);

                        &:nth-child(1),
                        &:nth-child(2) {
                            margin-top: 0;
                        }
                    }

                    @media (min-width: $break-regular) {
                        @include column(4, 12);

                        &:nth-child(3) {
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .v-page-alumni .app-header__image {
        background-position: center 55%;
    }
</style>