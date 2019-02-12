import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section class="header-with-image app-header"
             :class="[{'is-white' : isWhite}, { 'has-max-height' : hasMaxHeight}]">
        <div class="app-header__background-container">
            <div class="app-header__image" :style="'background-image: url(/assets/dist/images/' + jpgImageName + '@1x.jpg);'"></div>
        </div>
        <div class="app-header__text-container" :class="{'has-no-title' : !titleFr || !title}">
            <div class="app-header__text" v-if="titleFr && title">
                <h1 v-if="siteIsFr" v-html="titleFr"></h1>
                <h1 v-else          v-html="title"></h1>
            </div>
            <div class="app-header__text is-subtitle" v-if="subtitleFr && subtitle">
                <h3 v-if="siteIsFr" v-html="subtitleFr"></h3>
                <h3 v-else          v-html="subtitle"></h3>
            </div>
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
        },
        mounted: function() {
            const backgroundContainer = (this as HeaderWithImage).$el.querySelector(".app-header__background-container");

            const textElement = (this as HeaderWithImage).$el.querySelector(".app-header__text");

            if(backgroundContainer instanceof HTMLElement && textElement instanceof HTMLElement) {

                const imagesElement = backgroundContainer.querySelectorAll(".app-header__image");

                const arrayOfImageElement: HTMLElement[] = []

                for(const imageElement of imagesElement) {
                    if(imageElement instanceof HTMLElement) {
                        arrayOfImageElement.push(imageElement)
                    }
                }


                backgroundContainer.addEventListener("mousemove", (e)=> {
                    HeaderWithImage.headerImageInteraction(e, backgroundContainer, arrayOfImageElement, textElement)
                });
            }
        }
    })
    export default class HeaderWithImage extends Vue {
        @Prop({required: true}) data!: IHeaderWithImageData

        @Prop({default: false}) isWhite!: boolean

        @Prop({default: false}) hasMaxHeight!: boolean

        @Prop() titleFr!: string
        @Prop() title!: string

        @Prop() subtitleFr!: string
        @Prop() subtitle!: string

        @Prop({type: String, default:'201702_MD_Salone-Ludico_Ximoan©HEAD_MichelGiesbrecht_001'}) jpgImageName!: string

        siteLang = DEFAULT_SITE_LANG
        set $siteLang(value: LANG_LIST) {
            this.siteLang = value
        }
        get $siteLang() {
            return this.siteLang
        }

        get siteIsFr () {return this.$siteLang === LANG_LIST.FR}

        /*
        * header image interaction
        * */
        static readonly degTransformation = 10
        static readonly translationTransformation = 15

        static headerImageInteraction(e: Event, backgroundContainer: HTMLElement, arrayOfImageElement: HTMLElement[], textElement: HTMLElement) {

            const left   = backgroundContainer.getBoundingClientRect().left
            const top    = backgroundContainer.getBoundingClientRect().top
            const width  = backgroundContainer.getBoundingClientRect().width
            const height = backgroundContainer.getBoundingClientRect().height

            if(e instanceof MouseEvent) {
                const positionX = e.clientX - (left + width / 2)
                const positionY = e.clientY - (top  + height / 2)

                const vectorX = positionX / width
                const vectorY = positionY / height

                backgroundContainer.style.transform =   `translateZ(-50px) rotateX(${vectorY / 2 * HeaderWithImage.degTransformation}deg) rotateY(${vectorX * HeaderWithImage.degTransformation / 2}deg)  translateX(${ - vectorX * HeaderWithImage.translationTransformation}px)`

                textElement.style.transform =           `rotateX(${vectorY / 2 * HeaderWithImage.degTransformation / 2}deg)                           translateY(${ - vectorY * HeaderWithImage.translationTransformation / 10}px)`

                // for(let index = 0; index < arrayOfImageElement.length; index++) {
                //
                //     const imageElement = arrayOfImageElement[index];
                //
                //     switch (index) {
                //         case (0) :
                //             imageElement.style.transform = `translateX(-145%) translateY(-45%) translateZ(130px)    rotateZ(${-10 * -vectorX / 10}deg)  rotateX(${-vectorX / 3 * HeaderWithImage.degTransformation}deg) rotateY(${-vectorY / 3 * HeaderWithImage.degTransformation}deg)`
                //             break;
                //         case (2):
                //             imageElement.style.transform = `translateX(45%) translateY(-50%) translateZ(120px)      rotateZ(${-4 *   vectorX / 3}deg)  rotateX(${-vectorX / 3 * HeaderWithImage.degTransformation}deg) rotateY(${-vectorY / 3 * HeaderWithImage.degTransformation}deg)`
                //             break;
                //     }
                //
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/app-header";
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";

    .header-with-image {

    }

    .app-header__text.is-subtitle {
        padding-left: 1rem;

        @media (min-width: $break-regular) {
            padding-left: 5%;
        }

        @media (min-width: $break-large) {
            padding-left: 15%;
        }

        h3 {
            font-size: 3.25em;
            line-height: 3rem;

            @media (min-width: $break-regular) {
                font-size: 4.25em;
                line-height: 4rem;
            }
        }
    }

    .app-header__text-container.has-no-title {
        display: none;

        @media (min-width: $break-small) {
            display: block;
        }
    }

    .is-white {
        &.header-with-image {
            background: white;
        }

        .app-header__text-container {
            color: white;
        }

        .app-header__background-container {
            background: white;
        }
    }

    .has-max-height {
        @media (min-width: $break-small) {
            &.header-with-image {
                max-height: 700px;
            }

            .app-header__image {
                max-height: 500px;
            }
        }
    }

</style>