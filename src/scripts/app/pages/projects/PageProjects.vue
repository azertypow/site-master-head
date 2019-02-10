<template>
    <section class="v-page-projects">
        <header-with-text :data="this.$pageProjectsData.header"></header-with-text>

        <main class="v-page-projects__main">
            <div class="v-page-projects__filter" >
                <filter-setting
                        :$tags="$projectsTags"></filter-setting>
            </div>

            <div class="v-page-projects__list">
                <template v-for="item of $itemsToShow">
                    <div class="v-page-projects__item">
                        <div>
                            <ImageWithLoader :$imageData = "getImageData(item)"
                                             :$imageAlt  = "getImageAlt(item)"
                                             class="v-page-projects__item__image"
                                             :$fitCover  = "true" ></ImageWithLoader>

                            <p class="v-page-projects__item__title">{{getItemTitle(item)}}</p>
                        </div>

                        <h5 class="v-page-projects__item__student"
                            v-for="studentName of getItemArrayOfStudents(item)">{{studentName}}</h5>

                        <div>
                            <button @click="openProject(item)" class="button--small">
                                <template v-if="$siteIsFr">voir le projet</template>
                                <template v-else         >open project</template>
                            </button>
                        </div>
                    </div>

                    <!--<project-->
                            <!--:$siteLang="$siteLang"-->
                            <!--:data="item"/>-->
                </template>
            </div>
        </main>

        <footer class="v-page-projects__footer">
            <app-footer
                    :$siteLang="$siteLang"
                    :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageProjectsData} from "./IPageProjectsData"
    import {getProjectsTags} from "../../../apiRequestes"
    import {IAllProjects, IMedia_generatedItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import Project from "../../components/project/Project"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import ImageWithLoader from "../../components/image/ImageWithLoader.vue"

    @Component({
        components: {
            ImageWithLoader,
            AppFooter,
            Project,
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
        get $pageProjectsData() { return this.data }

        @Prop({required: true}) allProjects!: IAllProjects
        get $allProjects() { return this.allProjects }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/

        private projectsTags: string[] = []
        set $projectsTags(tags) {
            for(const tag of tags) {
                this.projectsTags.push(tag);
            }
        }
        get $projectsTags() {
            return this.projectsTags
        }

        get $itemsToShow(): IProjectItem[] {
            return this.$allProjects.project
        }

        // noinspection JSMethodCanBeStatic
        getImageData(item: IProjectItem): IMedia_generatedItem {return item.media_generated[0]}

        // noinspection JSMethodCanBeStatic
        getImageAlt(item: IProjectItem): string {

            const imageData = item.media_generated[0]

            return imageData.origin.meta.image_description + ' ' + imageData.origin.meta.copyright
        }

        // noinspection JSMethodCanBeStatic
        getItemTitle(item: IProjectItem): string { return item.title}

        // noinspection JSMethodCanBeStatic
        getItemArrayOfStudents(item: IProjectItem): string[] {
            const array = []
            for(const student of item.students) {
                array.push(student.students_name)
            }
            return array
        }

        // noinspection JSMethodCanBeStatic
        openProject(item: IProjectItem) {
            console.log(item)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/pages";

    .v-page-projects {
        @include page-dark;
    }

    .v-page-projects__main {
        @include column(12, 12);
        padding-left: 0;
        padding-right: 0;
    }

    .v-page-projects__filter {
        @include gutter;
    }

    .v-page-projects__list {
        @include column-container;
    }

    .v-page-projects__item {
        @include column(1, 3);
        @include gutter;
        @include gutter-horizontal;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .v-page-projects__item__image {
        width: 100%;
        height: 10rem;
    }

    .v-page-projects__item__title {
        margin: 0;
    }

    .v-page-projects__item__student {

    }
</style>