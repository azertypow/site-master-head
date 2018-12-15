<template>
    <section class="v-page-home">
        <app-header-with-image
                :data="pageHomeData.header" />

        <main class="v-page-home__main">
            <projects-section
                    v-if="this.$workshopSectionHasProjectsToShow"
                    :data="$workshopsProjectsSectionData"
                    :$siteLang="$siteLang"></projects-section>

            <projects-section
                    v-if="this.$seminarSectionHasProjectsToShow"
                    :data="$seminarsProjectsSectionData"
                    :$siteLang="$siteLang"></projects-section>

            <projects-section
                    v-if="this.$eventSectionHasProjectsToShow"
                    :data="$eventsProjectsSectionData"
                    :$siteLang="$siteLang"></projects-section>
        </main>

        <footer class="v-page-home__footer">
            <app-footer class="test" :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {Component, Prop, Vue} from "vue-property-decorator"
    import AppHeaderWithImage from '../../components/header/HeaderWithImage'
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
    import {IProjectItem, PERTINENCE_SECTION_NAME, PertinenceStatue} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        components: {
            AppFooter,
            ProjectsSection,
            Project,
            AppHeaderWithImage,
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

        $getProjectsPlacedInSection(sectionName: PERTINENCE_SECTION_NAME): IProjectsPositionInSection {
            return {
                header_position: this.getProjectAtPosition(sectionName, "header_position"),
                middle_position: this.getProjectAtPosition(sectionName, "middle_position"),
                bottom_position: this.getProjectAtPosition(sectionName, "bottom_position"),
            }
        }

        get $workshopSectionHasProjectsToShow()   { return this.sectionHasProjectsToShow(PERTINENCE_SECTION_NAME.WORKSHOP)}
        get $seminarSectionHasProjectsToShow()    { return this.sectionHasProjectsToShow(PERTINENCE_SECTION_NAME.SEMINAR)}
        get $eventSectionHasProjectsToShow()      { return this.sectionHasProjectsToShow(PERTINENCE_SECTION_NAME.EVENT)}

        get $workshopsProjectsSectionData(): IProjectsSectionData {return {
            title: {
                en: "workshops",
                fr: "workshops",
            },
            description: {
                fr: "Le designer crée ensuite les représentations, les formes faisant exister de façon identifiable l'esthétique du programme, du service ou d’un objet interactif connecté. Cette intervention nécessite la transformation de l'ensemble des éléments fonctionnels et des interactions du projet en objet appropriable par un utilisateur. Cette étape incarne l'existence et la raison du projet.",
                en: "Usability answers the question \"can someone use this interface?\". Jacob Nielsen describes usability as the quality attribute [10] that describes how usable the interface is. Shneiderman proposes principles for designing more usable interfaces called \"Eight Golden Rules of Interface Design\"[11]—which are well-known heuristics for creating usable systems.",
            },
            projects: this.$getProjectsPlacedInSection(PERTINENCE_SECTION_NAME.WORKSHOP),
        }}

        get $seminarsProjectsSectionData(): IProjectsSectionData {return {
            title: {
                fr: "séminaires",
                en: "seminars",
            },
            description: {
                fr: "Dans un projet numérique l'interface cristallise le potentiel, l'utilisation et la personnalité du produit, elle est à ce titre un enjeu de création et de différenciation qui est indissociable du produit dans son ensemble. L'interface est consubstantielle au produit numérique et l'aboutissement et l’agrégation du processus de design numérique. À ce titre, on peut avancer que le design interactif est aux actions interactives homme-machine-réseau-contenu, ce que le design produit est pour l'industrie manufacturière.",
                en: "Alan Cooper argues in The Inmates Are Running the Asylum that we need a new approach to solving interactive software-based problems. The problems with designing computer interfaces are fundamentally different from those that do not include software (e.g., hammers). Cooper introduces the concept of cognitive friction, which is when the interface of a design is complex and difficult to use, and behaves inconsistently and unexpectedly, possessing different modes.",
            },
            projects: this.$getProjectsPlacedInSection(PERTINENCE_SECTION_NAME.SEMINAR),
        }}

        get $eventsProjectsSectionData(): IProjectsSectionData {return {
            title: {
                fr: "évènements",
                en: "events",
            },
            description: {
                fr: "La société de l'information et la communication numérique définissent une nouvelle industrie et de nouveaux paradigmes économiques qui ont un impact direct sur le rôle du designer. Dans ce contexte, la question de l'offre et de la conception des produits prend un rôle central.",
                en: "A persona encapsulates critical behavioural data in a way that both designers and stakeholders can understand, remember, and relate to. Personas use storytelling to engage users' social and emotional aspects, which helps designers to either visualize the best product behaviour or see why the recommended design is successful.",
            },
            projects: this.$getProjectsPlacedInSection(PERTINENCE_SECTION_NAME.EVENT),
        }}

        private sectionHasProjectsToShow(sectionName: PERTINENCE_SECTION_NAME): boolean {
            const projectsPotion = this.$getProjectsPlacedInSection(sectionName);

            if(projectsPotion.header_position) return true
            if(projectsPotion.middle_position) return true
            return !!projectsPotion.bottom_position;
        }

        private getProjectAtPosition(sectionName: PERTINENCE_SECTION_NAME, positionName: PertinenceStatue): IProjectItem | null {
            for(const project of this.$homeProjects) {
                if (project[sectionName] === positionName) {
                    return project
                }
            }
            return null
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/pages";

    .v-page-home {
        @include page-dark;
        &__main {
            margin-top: 10em;
        }
    }
</style>