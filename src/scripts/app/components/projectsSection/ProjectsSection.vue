<template>
    <section id="projects-section">
        <header>
            <div class="title-container">
                <h2 v-if="siteIsFr" >{{this.projectsSectionData.title.fr}}</h2>
                <h2 v-else          >{{this.projectsSectionData.title.en}}</h2>
                <div class="details-btn-container">
                    <btn-show-details :$siteLang="$siteLang"
                                      v-on:clicked="btnDetailClicked()"></btn-show-details>
                </div>
            </div>
            <div class="subtitle-container">
                <h3 v-if="siteIsFr && $showDetails" >{{this.projectsSectionData.description.fr}}</h3>
                <h3 v-else-if="$showDetails"          >{{this.projectsSectionData.description.en}}</h3>
            </div>
        </header>

        <project
                v-if="projectsSectionData.projects.header_position"
                :data="projectsSectionData.projects.header_position"
                :$siteLang="$siteLang"></project>

        <project
                v-if="projectsSectionData.projects.middle_position"
                :data="projectsSectionData.projects.middle_position"
                :$siteLang="$siteLang"></project>

        <project
                v-if="projectsSectionData.projects.bottom_position"
                :data="projectsSectionData.projects.bottom_position"
                :$siteLang="$siteLang"></project>

    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {IProjectsSectionData} from "./IProjectsSectionData"
    import Project from "../project/Project"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"

    @Component({
        components: {BtnShowDetails, Project}
    })
    export default class ProjectsSection extends Vue {
        @Prop({required: true}) data!: IProjectsSectionData
        get projectsSectionData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /*
        * details sections
        * */
        private showDetails = false
        set $showDetails(value) {this.showDetails = value}
        get $showDetails()      {return this.showDetails}

        btnDetailClicked() {
            this.$showDetails = !this.$showDetails
        }
    }
</script>

<style lang="scss">
    #projects-section {
        .subtitle-container {
            h3 {
                font-size: 2em;
            }
        }

        .title-container {
            position: relative;
            display: inline-block;

            > * {
                margin: 0;
            }

            .details-btn-container {
                transform: translate(100%, 0);
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
</style>