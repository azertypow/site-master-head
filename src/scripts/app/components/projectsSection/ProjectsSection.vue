<template>
    <section class="v-projects-section">
        <header class="v-projects-section__header">
            <div class="v-projects-section__header__top">
                <h2 v-if="siteIsFr" >{{this.projectsSectionData.title.fr}}</h2>
                <h2 v-else          >{{this.projectsSectionData.title.en}}</h2>
                <div class="v-projects-section__header__collapse">
                    <btn-show-details :$siteLang="$siteLang"
                                      v-on:clicked="btnDetailClicked()"></btn-show-details>
                </div>
            </div>
            <div class="v-projects-section__subtitle">
                <h3 v-if="siteIsFr && $showDetails" >{{this.projectsSectionData.description.fr}}</h3>
                <h3 v-else-if="$showDetails"          >{{this.projectsSectionData.description.en}}</h3>
            </div>
        </header>

        <div class="v-projects-section__content">
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
        </div>

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
    @import "../../../../styles/_grid";

    .v-projects-section {

        &__header {
            &__top {
                position: relative;
                display: inline-block;

                > * {
                    margin: 0;
                }
            }
            &__collapse {
                transform: translate(100%, 0);
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }

        &__content {
        }

    }
</style>