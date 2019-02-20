<template>
    <div class="v-page-projects__item" :class="{'has-no-image' : !imageData}">
        <div class="v-project-item__header" :class="{'has-no-image' : !imageData}">
            <ImageWithLoader v-if="imageData"
                             :$imageData = "imageData"
                             :$imageAlt  = "imageAlt"
                             class="v-page-projects__item__image"
                             @icon-image-loaded="emitIconHeaderImageLoaded"
                             :$startOriginalImageLoad="$startHeaderOriginalImageLoad"
                             :$fitCover  = "true" ></ImageWithLoader>

            <div :class="{'solo' : !imageData}">
                <template v-if="itemTitle_en">
                    <p class="v-page-projects__item__title is-not-extra-small" v-if="$siteIsFr"     >{{itemTitle}}</p>
                    <p class="v-page-projects__item__title is-not-extra-small" v-else               >{{itemTitle_en}}</p>
                </template>
                <template v-else>
                    <p class="v-page-projects__item__title is-not-extra-small">{{itemTitle}}</p>
                </template>
            </div>
        </div>

        <div>
            <h5 class="v-page-projects__item__student"
                v-for="studentName of itemArrayOfStudents">{{studentName}}</h5>

            <h6 class="v-page-projects__item__student"
                v-if="itemTutor">{{itemTutor}}</h6>
        </div>

        <div v-if="hasButton">
            <a v-if="buttonLink"
               target="_blank"
               :href="buttonLink"
               class="button button--small button--arrow button--revert">
                <template v-if="$siteIsFr">{{buttonText.fr}}</template>
                <template v-else         >{{buttonText.en}}</template>
            </a>
            <button v-else
                    @click="openProjectClicked()"
                    class="button--small">
                <template v-if="$siteIsFr">{{buttonText.fr}}</template>
                <template v-else         >{{buttonText.en}}</template>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Emit} from "vue-property-decorator"
    import {IMedia_generatedItem, IProjectItem} from "../../api/genericsApiTypesIntefaces"
    import ImageWithLoader from "../components/image/ImageWithLoader.vue"

    @Component({
        components: {
            ImageWithLoader,
        }
    })
    export default class ProjetItem extends Vue {
        @Prop({required: true, type: Boolean}) $siteIsFr!: boolean

        @Prop({required: true, type: Boolean})  hasButton!: boolean
        @Prop()                                 buttonText!: {fr: string, en: string}
        @Prop()                                 buttonLink!: string

        @Prop() imageData!: IMedia_generatedItem
        @Prop() imageAlt!: string
        @Prop() itemTitle!: string
        @Prop() itemTitle_en!: string
        @Prop() itemArrayOfStudents!: string[]
        @Prop() itemTutor!: string

        @Emit("onOpenProject")
        openProjectClicked() {}

        /*
        * image loading
        * */
        @Emit("project-item-icon-image-loaded")
        emitIconHeaderImageLoaded() {}

        @Prop({default: false, type: Boolean}) $startHeaderOriginalImageLoad!: boolean
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/_grid";

    .v-page-projects__item {
        @include gutter;
        @include gutter-horizontal;
        @include column(1, 1);
        max-width: 30em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.has-no-image {
            max-width: none;
        }

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

    .v-project-item__header.has-no-image {
        flex: 1 1 0;
        border-bottom: solid 1px;
        margin-bottom: 1rem;
    }

    .v-page-projects__item__image {
        width: 100%;
        height: 10rem;
    }

    .solo {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .v-page-projects__item__title {
        margin: 0;

        .has-no-image & {
            max-width: 17em;
        }
    }

    .v-page-projects__item__student {

    }
</style>