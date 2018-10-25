<template>
    <section class="v-project">
        <h3>{{this.$projectData.title}}</h3>
        <div class="authors">
            <p v-for="author of this.$projectData.authors">{{author}}</p>
        </div>
        <div class="text">
            <p v-if="siteIsFr"  >{{this.$projectData.text.fr}}</p>
            <p v-else           >{{this.$projectData.text.en}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IProjectData} from "./IProjectData"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"

    @Component
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectData
        get $projectData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
    }
</script>

<style lang="scss">
    .v-project {

    }
</style>