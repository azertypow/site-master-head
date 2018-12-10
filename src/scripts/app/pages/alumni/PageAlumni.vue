<template>
    <section class="v-page-alumni">
        <header-with-text :data="data.header"></header-with-text>

        <main class="v-page-alumni__main">
            <div class="v-page-alumni__filter" >
                <filter-setting
                        $textInsteadTagList="alumni"
                        :$dates="$alumniDates"
                        v-on:change="$filterDate = $event"></filter-setting>
            </div>

            <div class="v-page-alumni__main__alumni">
                <template v-for="alumni of this.$alumniToShow">
                    <div class="v-page-alumni__main__alumni__item">
                        <alumni :data="alumni"/>
                    </div>
                </template>
            </div>
        </main>

        <footer class="v-page-alumni__footer">
            <app-footer :$backgroundIsDark=false></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageAlumniData} from "./IPageAlumniData"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import {IAllAlumni, IAlumnisItem} from "../../../api/genericsApiTypesIntefaces"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Alumni from "../../components/alumni/Alumni"
    import {IFilterDate} from "../../itemsFilters"

    @Component({
        components: {
            Alumni,
            AppFooter,
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageAlumni extends Vue {
        @Prop({required: true}) data!: IPageAlumniData

        @Prop({required: true}) allAlumni!: IAllAlumni
        get $allAlumni() { return this.allAlumni }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/

        get $alumniDates() {
            //todo use api/other/minmaxdates
            return generateDateFromTo(this.$allAlumni.alumnis)
        }

        get $alumniToShow(): IAlumnisItem[] {
            const listToReturn: IAlumnisItem[] = []

            for(const alumni of this.$allAlumni.alumnis) {
                let alumniYear = parseInt(alumni.year)
                if(Number.isNaN(alumniYear)) alumniYear = this.$filterDate.from

                const alumniYearIsInSelection = alumniYear >= this.$filterDate.from && alumniYear <= this.$filterDate.to

                if(alumniYearIsInSelection) listToReturn.push(alumni)
            }

            return listToReturn
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

    .v-page-alumni {
        @include page-light;

        &__main {
            @include column(12, 12);
            padding: 0;

            &__alumni {
                @include column-container;

                &__item {
                    @include column(4, 12);
                    @include gutter;
                    margin-top: 5em;
                }
            }
        }
    }
</style>