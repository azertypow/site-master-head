<template>
    <div class="v-image-with-loader">
        <img :src="$imageSrc"
             :alt="$imageAlt"
             :class="$imageClass"
             @load="originalImageIsLoaded = true">

        <img :src="$imageSrc_icon"
             :alt="$imageAlt"
             :class="[$imageClass, {'img-loaded' : originalImageIsLoaded}]"
             class="v-image-with-loader__cache">
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IMedia_generatedItem} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        // created: function() {
        //     console.log("created")
        // },
    })
    export default class ImageWithLoader extends Vue {
        @Prop() $imageData!: IMedia_generatedItem
        @Prop() $imageAlt!: string
        @Prop() $imageClass!: string

        originalImageIsLoaded = false;

        get $imageSrc_icon() {
            return this.$imageData.generated.icon
        }

        get $imageSrc() {
            return this.$imageData.generated.regular
        }
    }
</script>

<style scoped lang="scss">
    .v-image-with-loader {
        position: relative;

        img {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .v-image-with-loader__cache {
        transition: opacity 1s ease-in-out;
        opacity: 1;

        &.img-loaded {
            opacity: 0;
        }
    }
</style>