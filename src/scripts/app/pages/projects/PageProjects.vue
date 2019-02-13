<template>
    <section class="v-page-projects">
        <!--<header-with-text :data="this.$pageProjectsData.header"></header-with-text>-->

        <!--<section class="empty-header">-->
        <!--</section>-->

        <HeaderWithImage
                :hasMaxHeight="false"
                class="projects-header"
                subtitleFr="projets<br>d'étudiants"
                subtitle="projects<br>students"
                jpgImageName="_01_17_MD_MargauxCharvolin©Head_RaphaëlleMueller-BaptisteCoulon_003"
                :isWhite="false"
                :data="this.data.header" />

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

                            <p class="v-page-projects__item__title is-not-extra-small">{{getItemTitle(item)}}</p>
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

        <div class="v-page-projects__modal"
             v-if="projectOpen">
            <div class="v-page-projects__modal-container">
                <div class="v-page-projects__modal-column">

                    <button @click="closeProject()" class="button--small close-top">
                        <template v-if="$siteIsFr">fermer le projet</template>
                        <template v-else         >close project</template>
                    </button>

                    <project :$siteLang="$siteLang"
                             class="v-page-projects__modal-project"
                             :detailsAlwaysOpening = "true"
                             :data="projectOpen"/>

                    <button @click="closeProject()" class="button--small close-bottom">
                        <template v-if="$siteIsFr">fermer le projet</template>
                        <template v-else         >close project</template>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageProjectsData} from "./IPageProjectsData"
    import {getProjectsTags} from "../../../apiRequestes"
    import {IAllProjects, IMedia_generatedItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import Project from "../../components/project/Project"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import ImageWithLoader from "../../components/image/ImageWithLoader.vue"
    import HeaderWithImage from "../../components/header/HeaderWithImage.vue"

    @Component({
        components: {
            ImageWithLoader,
            AppFooter,
            Project,
            HeaderWithImage,
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

        projectOpen: IProjectItem | null = null

        openProject(item: IProjectItem) {
            this.projectOpen = item
        }

        closeProject() {
            this.projectOpen = null
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/pages";

    .v-page-projects {
        @include page-dark;
    }

    .empty-header {
        height: 10rem;
        width: 100%;
    }

    .v-page-projects__main {
        @include column(12, 12);
        padding-left: 0;
        padding-right: 0;
        margin-top: 3rem;
    }

    .v-page-projects__filter {
        @include gutter;
    }

    .v-page-projects__list {
        @include column-container;
    }

    .v-page-projects__item {
        @include gutter;
        @include gutter-horizontal;
        @include column(1, 1);
        max-width: 30em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: $break-small) {
            @include column(1, 2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        @media (min-width: $break-medium) {
            @include column(1, 3);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
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

    .v-page-projects__modal {
        position: fixed;
        background: black;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;

        animation-duration: 1s;
        animation-name: fadeIn;
    }

    .v-page-projects__modal-container {
        @include column-container;
        @include container-content-centred;
        @include site-max-width;
        padding-top: 5rem;
        padding-bottom: 50vh;
    }

    .v-page-projects__modal-column {
        @include column(1, 1);
        @include gutter;
        @include remove-first-and-last-vertical-margin;

        @media (min-width: $break-regular) {
            @include column(22, 24);
        }

        @media (min-width: $break-large) {
            @include column(10, 12);
        }
    }

    .v-page-projects__modal-project {
        margin-top: 3rem;
        margin-bottom: 10rem;
    }

    .close-top {
        float: right;
    }

    .close-bottom {
        display: block;
        margin-left: auto;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>