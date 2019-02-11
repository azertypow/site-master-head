<template>
    <section class="v-page-thesis">
        <!--<header-with-text :data="pageThesisData.header"></header-with-text>-->

        <section class="empty-header">
        </section>

        <main class="v-page-thesis__main">
            <template v-for="item of $itemsToShow">
                <thesis
                        :$siteLang="$siteLang"
                        :data="item"/>
            </template>
        </main>

        <footer class="v-page-thesis__footer">
            <app-footer
                    :$siteLang="$siteLang"
                    :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageThesisData} from "./IPageThesisData"
    import {IAllThesis, IThesisItem} from "../../../api/genericsApiTypesIntefaces"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import Project from "../../components/project/Project.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Thesis from "../../components/thesis/Thesis"

    @Component({
        components: {Thesis, Project, AppFooter, FilterSetting, HeaderWithText}
    })
    export default class PageThesis extends Vue {
        @Prop({required: true}) data!: IPageThesisData
        get pageThesisData() {return this.data}

        @Prop({required: true}) allThesis!: IAllThesis
        get $allThesis() { return this.allThesis }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/
        get $itemsToShow(): IThesisItem[] {
            return this.$allThesis.thesis
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/pages";

    .v-page-thesis {
        @include page-dark;
    }

    .empty-header {
        height: 10rem;
        width: 100%;

        @media (min-width: $break-regular) {
            height: 15rem;
        }
    }
</style>