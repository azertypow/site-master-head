<template>
    <section class="v-page-thesis">
        <header-with-text :data="pageThesisData.header"></header-with-text>

        <div class="v-page-projects__filter" >
            <filter-setting
                    class="v-page-thesis__filter"
                    $textInsteadTagList="thesis"
                    :$dates="$projectsDates"
                    v-on:change="$filterDate = $event"></filter-setting>
        </div>

        <main class="v-page-thesis__main">
            <template v-for="item of $itemsToShow">
                <thesis
                        :$siteLang="$siteLang"
                        :data="item"/>
            </template>
        </main>

        <footer class="v-page-thesis__footer">
            <app-footer :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageThesisData} from "./IPageThesisData"
    import {IAllThesis, IThesisItem} from "../../../api/genericsApiTypesIntefaces"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import Project from "../../components/project/Project.vue"
    import {getItemsFilterByDates, IFilterDate} from "../../itemsFilters"
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

        get $projectsDates() {
            return generateDateFromTo(this.$allThesis.thesis)
        }

        get $itemsToShow(): IThesisItem[] {
            return getItemsFilterByDates(this.$allThesis.thesis, this.$filterDate)
        }

        /*
        * FILTER
        * */
        private filterDate: IFilterDate = {
            from:   0,
            to:     0,
        }
        get $filterDate() {return this.filterDate}
        set $filterDate(value) {
            this.filterDate = value
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-thesis {
        @include page-dark;
    }
</style>