<template>
    <section class="v-project">
        <h3>{{this.$projectData.title}}</h3>
        <div class="authors">
            <p v-for="author of this.$projectData.authors">{{author}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IProjectData} from "./IProjectData"

    @Component
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectData
        get $projectData() {return this.data}
    }
</script>

<style lang="scss">
    .v-project {

    }
</style>