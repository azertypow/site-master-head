<template>
    <div class="v-media-image" :class="{'is-visible' : visible}">
        <ImageWithLoader :$imageData="this.$projectData"
                         :$fitCover="false"
                         :$imageAlt="this.$projectData.origin.meta.image_description + ' ' + this.$projectData.origin.meta.copyright"
                         class="v-media-image__img"></ImageWithLoader>

        <template v-if="$showDetails">
            <div class="v-media-image__copyright">
                {{this.$projectData.origin.meta.copyright}}
            </div>
            <div class="v-media-image__description">
                {{this.$projectData.origin.meta.image_description}}
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IMedia_generatedItem, IMediaItem} from "../../../api/genericsApiTypesIntefaces"
    import ImageWithLoader from "./ImageWithLoader.vue"

    @Component({
        components: {ImageWithLoader}
    })
    export default class MediaImage extends Vue {
        @Prop({required: true}) data!: IMedia_generatedItem
        get $projectData() {return this.data}

        @Prop({required: true, type: Boolean}) showDetails!: boolean
        get $showDetails() {return this.showDetails}

        @Prop({default: true, type: Boolean}) visible!: boolean
    }
</script>

<style lang="scss">
    .v-media-image {
        width: 100%;
        height: 100%;
        //todo trnasition confilct with page transition
        /*transition: opacity 250ms ease-in-out;*/
        opacity: 0;

        &__img {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            margin: auto;
        }

        &__copyright{
            margin-top: 0.2em;
        }

        &__description{
            margin-top: 1.2em;
        }
    }

    .v-media-image.is-visible {
        opacity: 1;
    }

</style>