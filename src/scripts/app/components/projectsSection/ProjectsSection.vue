<template>
    <section class="v-projects-section">
        <header class="v-projects-section__header">
            <div class="v-projects-section__header__top">
                <h2 class="v-projects-section__title" v-if="siteIsFr" >{{this.projectsSectionData.title.fr}}</h2>
                <h2 class="v-projects-section__title" v-else          >{{this.projectsSectionData.title.en}}</h2>
            </div>
        </header>

        <div class="v-projects-section__content">
            <div class="v-projects-section__content__projects">
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
        margin-top: 12em;
        margin-bottom: 8em;

        &__title {
            font-size: 6em;
        }

        &__header {
            @include column-container;

            &__top {
                @include column(1, 1);

                @include remove-first-and-last-vertical-margin;

            }
        }

        &__content {
            @include column-container;
            margin-top: 4em;

            &__projects {
                @include column(1, 1);
                @include remove-first-and-last-vertical-margin;
            }
        }

    }
</style>