<template>
    <div class="v-media-image">
        <div class="v-m-i-img" :style="{backgroundImage: 'url(' + this.$projectData.url + ')'}"></div>
        <div class="v-m-i-copyright">
            {{this.$projectData.meta.copyright}}
        </div>
        <div class="v-m-i-description">
            {{this.$projectData.meta.image_description}}
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IMediaItem} from "../../../api/genericsApiTypesIntefaces"

    @Component
    export default class MediaImage extends Vue {
        @Prop({required: true}) data!: IMediaItem
        get $projectData() {return this.data}
    }
</script>

<style lang="scss">
    .v-media-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .v-m-i-img {
            width: 500px;
            height: 250px;
            background-size: cover;
            background-repeat: no-repeat;
            margin: auto;
        }
    }
</style>