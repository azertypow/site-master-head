<template>
    <section id="page-projects">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="alumni"></filter-setting>
        <section class="main">

        </section>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageProjectsData} from "./IPageProjectsData"

    @Component({
        components: {
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageProjects extends Vue {
        @Prop({required: true}) data!: IPageProjectsData
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-projects {
        @include page-dark;
    }
</style>