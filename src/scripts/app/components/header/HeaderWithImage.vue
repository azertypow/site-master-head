import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section class="header-with-image">
        <div class="canvas-container">
            <div class="header-with-image__canvas__image" style="background-image: url('http://localhost:8000/content/projects/2-project-a/pi.jpg');transform: translateX(-109%) translateY(-32%) translateZ(163px) rotateY(30deg) rotateZ(-17deg);"></div>
            <div class="header-with-image__canvas__image" style="background-image: url('http://localhost:8000/content/projects/1-autre-projet/anna-popovic-56025-unsplash.jpg');transform: translateX(-40%) translateY(-30%) translateZ(60px) rotateY(5deg) rotateZ(9deg);"></div>
            <div class="header-with-image__canvas__image" style="background-image: url('http://localhost:8000/content/projects/5-2/annie-spratt-51434-unsplash.jpg');transform: translateX(26%) translateY(-30%) translateZ(56px) rotateY(-15deg) rotateZ(-10deg);"></div>
        </div>
        <div class="header-with-image__text">
            <h1 v-if="siteIsFr"   >{{this.data.title.fr}}</h1>
            <h1 v-else          >{{this.data.title.en}}</h1>
        </div>
    </section>
</template>

<script lang="ts">
    import {IHeaderWithImageData} from "./IHeaderWithImageData"
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EventBus} from "../../../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"

    @Component({
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                (this as HeaderWithImage).$siteLang = event
                console.log("coucou")
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
        }
    })
    export default class HeaderWithImage extends Vue {
        @Prop({required: true}) data!: IHeaderWithImageData

        siteLang = DEFAULT_SITE_LANG
        set $siteLang(value: LANG_LIST) {
            this.siteLang = value
        }
        get $siteLang() {
            return this.siteLang
        }

        get siteIsFr () {return this.$siteLang === LANG_LIST.FR}
    }
</script>

<style lang="scss">
    @import "../../../../styles/app-header";
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";

    .header-with-image {
        @include app-header;
        .canvas-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $color-main-dark;

            perspective: 1000px;
            transform-style: preserve-3d;
            transform-box: view-box;
        }

        &__canvas {
            &__image {
                width: 600px;
                height: 500px;
                position: absolute;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                top: 50%;
                left: 50%;
            }
        }

        &__text {
            @include remove-first-and-last-vertical-margin;

            top: 25%;
            font-size: 4em;
            transform: translateY(-50%);
            margin-left: calc(100% / 12 * 1);
            width: calc(100% / 12 * 10);
        }
    }
</style>