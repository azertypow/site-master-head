<template>
    <section id="project">
        <h3>{{data.title}}</h3>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IProjectData} from "./IProjectData"

    @Component
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectData
    }
</script>

<style lang="scss">
    #project {

    }
</style>