<template>
    <section class="v-page-projects">
        <header-with-text :data="this.$pageProjectsDate.header"></header-with-text>

        <main class="v-page-projects__main">
            <div class="v-page-projects__filter" >
                <filter-setting
                        :$tags="$projectsTags"
                        :$dates="$projectsDates"
                        v-on:change="$filterDate = $event"></filter-setting>
            </div>

            <template v-for="item of $itemsToShow">
                <project
                        :$siteLang="$siteLang"
                        :data="item"/>
            </template>
        </main>

        <footer class="v-page-projects__footer">
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
    import {IPageProjectsData} from "./IPageProjectsData"
    import {getProjectsTags} from "../../../apiRequestes"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import {IAllProjects, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import Project from "../../components/project/Project"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {getItemsFilterByDates, IFilterDate} from "../../itemsFilters"

    @Component({
        components: {
            AppFooter,
            Project,
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageProjects extends Vue {
        constructor() {
            super()
            getProjectsTags().then((tags) => {
                (this as PageProjects).$projectsTags = tags
            })
        }

        @Prop({required: true}) data!: IPageProjectsData
        get $pageProjectsDate() { return this.data }

        @Prop({required: true}) allProjects!: IAllProjects
        get $allProjects() { return this.allProjects }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/

        private projectsTags: string[] = []
        set $projectsTags(tags) {
            for(const tag of tags) {
                this.projectsTags.push(tag);
            }
        }
        get $projectsTags() {
            return this.projectsTags
        }

        get $projectsDates() {
            //todo use api/other/minmaxdates
            return generateDateFromTo(this.$allProjects.project)
        }

        get $itemsToShow(): IProjectItem[] {
            return getItemsFilterByDates(this.$allProjects.project, this.$filterDate)
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

    .v-page-projects {
        @include page-dark;
    }
</style>