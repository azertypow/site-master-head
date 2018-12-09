<template>
    <div class="v-media-image">
        <img v-if="inImageElement"  class="v-media-image__img"   :src="this.$projectData.url"/>
        <div v-else                 class="v-media-image__img"   :style="{backgroundImage: 'url(' + this.$projectData.url + ')'}"></div>
        <template v-if="$showDetails">
            <div class="v-media-image__copyright">
                {{this.$projectData.meta.copyright}}
            </div>
            <div class="v-media-image__description">
                {{this.$projectData.meta.image_description}}
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IMediaItem} from "../../../api/genericsApiTypesIntefaces"

    @Component
    export default class MediaImage extends Vue {
        @Prop({required: true}) data!: IMediaItem
        get $projectData() {return this.data}

        @Prop({required: true, type: Boolean}) showDetails!: boolean
        get $showDetails() {return this.showDetails}

        @Prop({default: false, type: Boolean}) inImageElement!: boolean
    }
</script>

<style lang="scss">
    .v-media-image {
        width: 100%;
        height: 100%;

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
</style>