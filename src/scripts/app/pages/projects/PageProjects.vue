<template>
    <section class="v-page-projects">
        <header-with-text :data="this.$pageProjectsData.header"></header-with-text>

        <main class="v-page-projects__main">
            <div class="v-page-projects__filter" >
                <filter-setting
                        :$tags="$projectsTags"></filter-setting>
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
    import {IAllProjects, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import Project from "../../components/project/Project"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import AppFooter from "../../components/appFooter/AppFooter.vue"

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
        get $pageProjectsData() { return this.data }

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

        get $itemsToShow(): IProjectItem[] {
            return this.$allProjects.project
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-projects {
        @include page-dark;
    }
</style>