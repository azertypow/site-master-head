<template>
    <section id="page-alumni">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="alumni"
                :$dates="$alumniDates"
                v-on:change="$filterDate = $event"></filter-setting>

        <main>
            <template v-for="alumni of this.$alumniToShow">
                <alumni
                        :data="alumni"/>
            </template>
        </main>

        <app-footer :$backgroundIsDark=false></app-footer>
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
        private filterDate = {
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

    #page-alumni {
        @include page-light;
    }
</style>