<template>
    <section id="page-projects">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                :$tags="$projectsTags"
                :$dates="$projectsDates"></filter-setting>
        <section class="main">

        </section>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageProjectsData} from "./IPageProjectsData"
    import {getProjectsDataFromTo, getProjectsTags} from "../../../apiRequestes"
    import {ITagsData} from "../../ITagsData"

    @Component({
        components: {
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageProjects extends Vue {
        constructor() {
            super()
            getProjectsTags().then((tags) => {
                (this as PageProjects).$projectsTags = tags
            })

            getProjectsDataFromTo().then((dates) => {
                (this as PageProjects).$projectsDates = dates
            })
        }

        @Prop({required: true}) data!: IPageProjectsData

        private projectsTags: string[] = []
        set $projectsTags(tags) {
            for(const tag of tags) {
                this.projectsTags.push(tag);
            }
        }
        get $projectsTags() {
            return this.projectsTags
        }

        private projectsDates: number[] = []
        set $projectsDates(tags) {
            for(const tag of tags) {
                this.projectsDates.push(tag);
            }
        }
        get $projectsDates() {
            return this.projectsDates
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-projects {
        @include page-dark;
    }
</style>