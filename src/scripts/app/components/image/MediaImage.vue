<template>
    <div class="v-media-image">
        <div class="v-m-i-img" :style="{backgroundImage: 'url(' + this.$projectData.url + ')'}"></div>
        <template v-if="$showDetails">
            <div class="v-m-i-copyright">
                {{this.$projectData.meta.copyright}}
            </div>
            <div class="v-m-i-description">
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
    }
</script>

<style lang="scss">
    .v-media-image {
        width: 100%;
        height: 100%;

        .v-m-i-img {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            margin: auto;
        }
    }
</style>