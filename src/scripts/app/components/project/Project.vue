<template>
    <section id="project">
        <p>{{data.title}}</p>
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