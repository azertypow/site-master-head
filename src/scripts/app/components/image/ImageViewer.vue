<template>
    <div v-if="imageOpenData" id="image-viewer">
        <div class="mmd-burger-button bg-dark mmd-burger-button--close"
             @click="closeImageViewer()">
            <div class="mmd-burger-button__container">
                <span class="mmd-burger-button__line--top"></span>
                <span class="mmd-burger-button__line--middle"></span>
                <span class="mmd-burger-button__line--bottom"></span>
            </div>
        </div>
        <div class="image-container">
            <img :src="imageOpenData.generated.regular" class="image">
        </div>
        <div class="text-container"
             ref="to-animate">
            <p>{{imageOpenData.origin.meta.image_description}} </p>
            <p>{{imageOpenData.origin.meta.copyright}}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from "vue-property-decorator"
    import {IMedia_generatedItem} from "../../../api/genericsApiTypesIntefaces"
    import BottomBar from "../bottomBar/BottomBar.vue"

    @Component({
        updated: function(this: ImageViewer) {
            const textToAnimate = this.$refs["to-animate"]

            if(textToAnimate instanceof HTMLElement) {
                BottomBar.setAnimationDuration(textToAnimate)
            }
        }
    })
    export default class ImageViewer extends Vue {
        @Prop({default: null}) imageOpenData!: IMedia_generatedItem | null

        @Emit("imageViewerClosed")
        closeImageViewer() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/_params";

    #image-viewer {
        animation: fadeIn 250ms;
        box-sizing: border-box;
        padding: 3rem;
    }

    .mmd-burger-button {
        position: fixed;
        right: 0.25rem;
        top: 0.5rem;
    }

    .image-container {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;

        .image {
            display: block;
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }

    .text-container {
        color: white;
        display: flex;
        height: 3rem;
        align-items: center;
        align-content: center;
        transform: translateX(0);
        position: absolute;
        min-width: 100%;
        left: 100%;
        bottom: 0;

        animation-duration: 41.41s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: text-horizontal-scrolling;

        > * {
            padding: 0;
            margin: 0 $gutter-width 0 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes text-horizontal-scrolling {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(-200%, 0, 0);
        }
    }

</style>