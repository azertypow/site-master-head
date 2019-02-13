<template>
    <section class="v-page-thesis">
        <!--<header-with-text :data="pageThesisData.header"></header-with-text>-->

        <section class="empty-header">
        </section>

        <main class="v-page-thesis__main">
            <div class="v-page-thesis__list">
                <template v-for="item of $itemsToShow">
                    <!--<thesis-->
                            <!--:$siteLang="$siteLang"-->
                            <!--:data="item"/>-->

                    <ProjetItem :imageData           = "getImageData(item)"
                                :hasButton           = "true"
                                :buttonText          = "{fr: 'voir le pdf', en: 'open pdf'}"
                                :buttonLink          = "getPDFLink(item)"
                                :$siteIsFr           = "$siteIsFr"
                                :imageAlt            = "getImageAlt(item)"
                                :itemTitle           = "getItemTitle_fr(item)"
                                :itemTitle_en        = "getItemTitle_en(item)"
                                :itemArrayOfStudents = "getItemArrayOfStudents(item)"
                                :itemTutor           = "getTutorName(item)" ></ProjetItem>
                </template>
            </div>
        </main>

        <footer class="v-page-thesis__footer">
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
    import {IPageThesisData} from "./IPageThesisData"
    import {IAllThesis, IThesisItem} from "../../../api/genericsApiTypesIntefaces"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import Project from "../../components/project/Project.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Thesis from "../../components/thesis/Thesis"
    import ProjetItem from "../../components/ProjetItem.vue"

    @Component({
        components: {Thesis, Project, AppFooter, FilterSetting, HeaderWithText, ProjetItem}
    })
    export default class PageThesis extends Vue {
        @Prop({required: true}) data!: IPageThesisData
        get pageThesisData() {return this.data}

        @Prop({required: true}) allThesis!: IAllThesis
        get $allThesis() { return this.allThesis }

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/
        get $itemsToShow(): IThesisItem[] {
            return this.$allThesis.thesis
        }

        // noinspection JSMethodCanBeStatic
        getImageData(item: IThesisItem)  { return null}

        // noinspection JSMethodCanBeStatic
        getImageAlt(item: IThesisItem)   { return null}

        // noinspection JSMethodCanBeStatic
        getPDFLink(item: IThesisItem)     {

            for(const media of item.media) {
                if(media.type === "document") return media.url
            }

            return null
        }

        // noinspection JSMethodCanBeStatic
        getItemTitle_fr(item: IThesisItem)  { return item.title_thesis_french}
        // noinspection JSMethodCanBeStatic
        getItemTitle_en(item: IThesisItem)     { return item.title_thesis_english}

        // noinspection JSMethodCanBeStatic
        getItemArrayOfStudents(item: IThesisItem) { return [item.students_thesis]}

        // noinspection JSMethodCanBeStatic
        getTutorName(item: IThesisItem) { return item.tuteurs_thesis}
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/pages";

    .v-page-thesis {
        @include page-dark;
    }

    .v-page-thesis__main {
        @include column(12, 12);
        padding-left: 0;
        padding-right: 0;
    }

    .v-page-thesis__list {
        @include column-container;
    }

    .empty-header {
        height: 10rem;
        width: 100%;

        @media (min-width: $break-regular) {
            height: 15rem;
        }
    }
</style>