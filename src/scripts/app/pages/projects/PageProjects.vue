<template>
    <section id="page-projects">
        <header-with-text :data="this.$pageProjectsDate.header"></header-with-text>
        <filter-setting
                :$tags="$projectsTags"
                :$dates="$projectsDates"></filter-setting>
        <main>

        </main>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageProjectsData} from "./IPageProjectsData"
    import {getProjectsTags} from "../../../apiRequestes"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import {IAllProjects} from "../../../api/genericsApiTypesIntefaces"

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
        }

        @Prop({required: true}) data!: IPageProjectsData
        get $pageProjectsDate() { return this.data }

        @Prop({required: true}) allProjects!: IAllProjects
        get $allProjects() { return this.allProjects }

        private projectsTags: string[] = []
        set $projectsTags(tags) {
            for(const tag of tags) {
                this.projectsTags.push(tag);
            }
        }
        get $projectsTags() {
            return this.projectsTags
        }

        get $projectsDates() {
            //todo use api/other/minmaxdates
            return generateDateFromTo(this.$allProjects.project)
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-projects {
        @include page-dark;
    }
</style>