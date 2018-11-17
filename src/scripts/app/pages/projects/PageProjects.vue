<template>
    <section id="page-projects">
        <header-with-text :data="this.$pageProjectsDate.header"></header-with-text>
        <filter-setting
                :$tags="$projectsTags"
                :$dates="$projectsDates"
                v-on:change="$filterDate = $event"></filter-setting>
        <main>
            <template v-for="project of $projectsToShow">
                <project
                        :$siteLang="$siteLang"
                        :data="project"/>
            </template>
        </main>
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

    @Component({
        components: {
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

        get $projectsToShow(): IProjectItem[] {
            const listToReturn: IProjectItem[] = []

            for(const project of this.$allProjects.project) {
                let projectYear = parseInt(project.year)
                if(Number.isNaN(projectYear)) projectYear = this.$filterDate.from

                const projectYearIsInSelection = projectYear >= this.$filterDate.from && projectYear <= this.$filterDate.to

                if(projectYearIsInSelection) listToReturn.push(project)
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

    #page-projects {
        @include page-dark;
    }
</style>