<template>
    <section class="v-page-projects">
        <!--<header-with-text :data="this.$pageProjectsData.header"></header-with-text>-->

        <!--<section class="empty-header">-->
        <!--</section>-->

        <HeaderWithImage
                :hasMaxHeight="true"
                class="projects-header"
                subtitleFr="projets"
                subtitle="projects"
                jpgImageName="_01_17_MD_MargauxCharvolin©Head_RaphaëlleMueller-BaptisteCoulon_003"
                :isWhite="false" />

        <main class="v-page-projects__main">
            <div class="v-page-projects__filter" >
                <filter-setting
                        :$tags="$projectsTags"></filter-setting>
            </div>

            <div class="v-page-projects__list">
                <template v-for="item of $itemsToShow">

                    <ProjetItem :imageData           = "getImageData(item)"
                                :hasButton           = "true"
                                :buttonText          = "{fr: 'voir le projet', en: 'open project'}"
                                :$siteIsFr           = "$siteIsFr"
                                :imageAlt            = "getImageAlt(item)"
                                :itemTitle           = "getItemTitle(item)"
                                @onOpenProject       = "openProject(item)"
                                @project-item-icon-image-loaded = "itemHeaderIconLoaded++"
                                :$startHeaderOriginalImageLoad   = "allItemHeaderIconLoaded"
                                :itemArrayOfStudents = "getItemArrayOfStudents(item)" ></ProjetItem>

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
    import {getProjectsTags} from "../../../apiRequestes"
    import {IAllProjects, IMedia_generatedItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import Project from "../../components/project/Project"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import HeaderWithImage from "../../components/header/HeaderWithImage.vue"
    import ProjetItem from "../../components/ProjetItem.vue"
    import {pageData} from "../../IAppData"

    @Component({
        components: {
            ProjetItem,
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

        @Prop({required: true}) data!: pageData
        get $pageProjectsData() { return this.data }

        @Prop({required: true}) allProjects!: IAllProjects
        get $allProjects() { return this.allProjects }

        /*
        * image item loader
        * */
        get allItemHeaderIconLoaded(): boolean { return this.itemHeaderIconLoaded === this.$itemsToShow.length }

        itemHeaderIconLoaded = 0

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