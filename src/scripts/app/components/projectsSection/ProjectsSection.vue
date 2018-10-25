<template>
    <section id="projects-section">
        <header>
            <h2 v-if="siteIsFr" >{{this.projectsSectionData.title.fr}}</h2>
            <h2 v-else          >{{this.projectsSectionData.title.en}}</h2>
            <button @click="btnDetailClicked()">
                <span v-if="siteIsFr">détails</span>
                <span v-else         >details</span>
            </button>
            <h3 v-if="siteIsFr && $showDetails" >{{this.projectsSectionData.description.fr}}</h3>
            <h3 v-else-if="$showDetails"          >{{this.projectsSectionData.description.en}}</h3>
        </header>

        <template v-for="project in projectsSectionData.projects">
            <project
                    :data="project"
                    :$siteLang="$siteLang"></project>
        </template>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {IProjectsSectionData} from "./IProjectsSectionData"
    import Project from "../project/Project"

    @Component({
        components: {Project}
    })
    export default class ProjectsSection extends Vue {
        @Prop({required: true}) data!: IProjectsSectionData
        get projectsSectionData() {return this.data}


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

    }
</style>