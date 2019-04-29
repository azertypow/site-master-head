<template>
    <section class="v-page-home">
        <HeaderWithImage
                titleFr="master <br> media design"
                title="master <br> media design"
                :data="pageHomeData.header" />

        <main class="v-page-home__main">
            <!--<projects-section-->
                    <!--v-if="this.$workshopSectionHasProjectsToShow"-->
                    <!--:data="$workshopsProjectsSectionData"-->
                    <!--:$siteLang="$siteLang"></projects-section>-->


            <template v-for="projectData of $homeProjects">
                <project
                        :data="projectData"
                        :$siteLang="$siteLang"></project>
            </template>
        </main>

        <footer class="v-page-home__footer">
            <app-footer
                    class="test"
                    :$siteLang="$siteLang"
                    :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {Component, Prop, Vue} from "vue-property-decorator"
    import HeaderWithImage from '../../components/header/HeaderWithImage'
    import {IPageHomeData} from "./IPageHomeData"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Project from "../../components/project/Project"
    import {getProjectsAppearHome} from "../../../apiRequestes"
    import ProjectsSection from "../../components/projectsSection/ProjectsSection"
    import {
        IProjectsPositionInSection,
        IProjectsSectionData
    } from "../../components/projectsSection/IProjectsSectionData"
    import {pushArrayInArray} from "../../../arrayPush"
    import {IProjectItem, PertinenceStatue} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        components: {
            AppFooter,
            ProjectsSection,
            Project,
            HeaderWithImage,
        }
    })
    export default class PageHome extends Vue {
        constructor() {
            super()
            getProjectsAppearHome().then((homeProjectsData) => {
                this.$homeProjects = homeProjectsData.project
            })
        }

        @Prop({required: true}) data!: IPageHomeData
        get pageHomeData() {return this.data}

        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /*
        * array of projects present in home page
        * */
        private homeProjects: IProjectItem[] = []

        set $homeProjects(value: IProjectItem[]) {
            pushArrayInArray(value, this.homeProjects)
        }
        get $homeProjects() {
            return this.homeProjects
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/_params";
    @import "../../../../styles/pages";

    .v-page-home {
        @include page-dark;
        &__main {
            margin-top: 10em;
        }
    }
</style>