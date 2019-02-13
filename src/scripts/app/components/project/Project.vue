<template>
    <section class="v-project">

        <header class="v-project__header">
            <div class="v-project__header__images">
                <template v-for="(imageData, imageIndex) of this.$imagesData">
                    <MediaImage
                            :visible=$imageIsVisible(imageIndex)
                            :showDetails=false
                            :data="imageData"/>
                </template>
            </div>
            <div class="v-project__header__texts v-cartel__header">
                <h3     class="v-cartel__header__title">{{this.$projectData.title}}</h3>
                <div    class="v-cartel__header__author" v-for="students of this.$projectData.students" >{{students.students_name}}</div>
            </div>
        </header>

        <div class="v-project__description v-cartel__description" :class="{'show-details': showDetails || detailsAlwaysOpening, 'no-max-height' : detailsAlwaysOpening}">
            <div v-if="$siteIsFr"   class="v-cartel__description__texts" v-html="this.$projectData.description_french"></div>
            <div v-else             class="v-cartel__description__texts" v-html="this.$projectData.description_english"></div>

            <div class="v-images-list v-cartel__description__images">
                <template v-for="(imageData, imageDataIndex) of this.$imagesData">
                    <div class="v-images-list__item"
                         @click="openImageDetails(imageDataIndex)">

                        <ImageWithLoader :$imageData="imageData"
                                         :$fitCover="true"
                                         :$imageAlt="imageData.origin.meta.image_description + ' ' + imageData.origin.meta.copyright"
                                         class="v-images-list__item__img"></ImageWithLoader>

                        <!--<img class="v-images-list__item__img" :src="imageData.generated.icon" :alt="imageData.origin.meta.image_description + ' ' + imageData.origin.meta.copyright">-->
                    </div>
                </template>
            </div>
        </div>

        <div class="mmd-buttons v-cartel__buttons">
            <btn-show-details :$siteLang="$siteLang"
                              v-if="!detailsAlwaysOpening"
                              v-on:clicked="btnDetailClicked()"></btn-show-details>

            <!--<button class="button&#45;&#45;small button&#45;&#45;arrow button&#45;&#45;revert has-no-border"  v-if="this.$siteIsFr"   @click="$getProjectUri($projectData.uri)">partager</button>-->
            <!--<button class="button&#45;&#45;small button&#45;&#45;arrow button&#45;&#45;revert has-no-border"  v-else                  @click="$getProjectUri($projectData.uri)">share</button>-->
        </div>

    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMedia_generatedItem, IMediaItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import MediaImage from "../image/MediaImage"
    import secureIsNaNNumber from "../../../secureIsNaNNumber"
    import {getProjectsByUri} from "../../../apiRequestes"
    import ImageWithLoader from "../image/ImageWithLoader.vue"
    import {EventBus} from "../../../event-bus"

    @Component({
        components: {ImageWithLoader, MediaImage, BtnShowDetails},
        mounted: function() {
            const headerElement = (this as Project).$el.querySelector(".v-project__header");

            if(headerElement instanceof HTMLElement) {

                (this as Project).headerElement = headerElement;

                const headerImages = headerElement.querySelector(".v-project__header__images")
                const headerTexts = headerElement.querySelector(".v-project__header__texts")

                if(headerImages instanceof HTMLElement && headerTexts instanceof HTMLElement) {
                    headerElement.addEventListener("mousemove", (e)=> {
                        (this as Project).headerImageInteraction(e, headerImages, headerTexts)
                    });
                }
            }

            const descriptionContainer = this.$el.querySelector('.v-cartel__description')

            if(descriptionContainer instanceof HTMLElement) { (this as Project).$descriptionContainerElement = descriptionContainer}
        }
    })
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectItem
        get $projectData() {return this.data}

        @Prop({default: false, type: Boolean}) detailsAlwaysOpening!: boolean

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        headerElement!: HTMLElement
        cursorIsLeft = true
        get cursorIsRight() {return !this.cursorIsLeft}

        /*
        * details sections
        * */

        private descriptionContentHeight() {

            console.log("open")

            const textElement = this.$el.querySelector('.v-cartel__description__texts');
            const imageListElement = this.$el.querySelector('.v-images-list');

            let heightToReturn = 0;

            if(textElement) {
                heightToReturn += textElement.getBoundingClientRect().height

                const marginTop     = window.getComputedStyle(textElement, null).marginTop
                const marginBottom  = window.getComputedStyle(textElement, null).marginBottom

                heightToReturn += marginTop ? secureIsNaNNumber(parseFloat(marginTop))          : 0
                heightToReturn += marginBottom ? secureIsNaNNumber(parseFloat(marginBottom))    : 0
            }

            if(imageListElement) {
                heightToReturn += imageListElement.getBoundingClientRect().height

                const marginTop     = window.getComputedStyle(imageListElement, null).marginTop
                const marginBottom  = window.getComputedStyle(imageListElement, null).marginBottom

                heightToReturn += marginTop     ? secureIsNaNNumber(parseFloat(marginTop))      : 0
                heightToReturn += marginBottom  ? secureIsNaNNumber(parseFloat(marginBottom))   : 0
            }

            return heightToReturn;
        }

        private showDetails = false
        set $showDetails(value) {this.showDetails = value}
        get $showDetails()      {return this.showDetails}

        descriptionContainerElement: HTMLElement | null = null
        set $descriptionContainerElement(value: HTMLElement | null) {this.descriptionContainerElement = value}
        get $descriptionContainerElement()                   {return this.descriptionContainerElement}

        private onresize = function(this: Project) {
            const selfThis = this

            if(selfThis.$descriptionContainerElement) {
                selfThis.$descriptionContainerElement.style.maxHeight = `${selfThis.descriptionContentHeight()}px`
            }
        }
        private onResizeListener: EventListenerOrEventListenerObject | null = null

        btnDetailClicked() {
            this.$showDetails = !this.$showDetails

            const descriptionContainerElement = this.$el.querySelector('.v-cartel__description')

            if(descriptionContainerElement instanceof HTMLElement) {

                if(this.$showDetails) {
                    descriptionContainerElement.style.maxHeight = `${this.descriptionContentHeight()}px`;

                    this.onResizeListener = this.onresize.bind(this);

                    if(this.onResizeListener) {
                        window.addEventListener("resize", this.onResizeListener)
                    }
                } else {
                    descriptionContainerElement.style.maxHeight = ""

                    if(this.onResizeListener) {
                        window.removeEventListener("resize", this.onResizeListener)
                        this.onResizeListener = null
                    }
                }
            }

        }

        get $imagesData(): IMedia_generatedItem[] {
            const arrayOfImageMedia: IMedia_generatedItem[] = []

            for(const media of this.$projectData.media_generated) {
                if(media.origin.type === "image") {
                    arrayOfImageMedia.push(media)
                }
            }

            return arrayOfImageMedia
        }

        // get $imageToShowData(): IMediaItem {
        //     return this.$imagesData[this.$indexOfImageToShowInHeader]
        // }

        $imageIsVisible(imageIndex: number) {return this.$indexOfImageToShowInHeader === imageIndex}

        private indexOfImageToShowInHeader = 0
        get $indexOfImageToShowInHeader() {return this.indexOfImageToShowInHeader}

        /*
        * header image interaction
        * */
        static readonly degTransformation = 20
        static readonly translationTransformation = 15

        headerImageInteraction(e: Event, headerImages: HTMLElement, headerTexts: HTMLElement) {

            const left   = headerImages.getBoundingClientRect().left
            const top    = headerImages.getBoundingClientRect().top
            const width  = headerImages.getBoundingClientRect().width
            const height = headerImages.getBoundingClientRect().height

            if(e instanceof MouseEvent) {
                const positionX = e.clientX - (left + width / 2)
                const positionY = e.clientY - (top  + height / 2)

                const vectorX = positionX / width
                const vectorY = positionY / height

                const percentOfPosition = Project.getPercentOfXPosition(e.clientX, width, left)

                this.indexOfImageToShowInHeader = Math.floor( percentOfPosition * this.$imagesData.length / 100 )

                headerImages.style.transform =  `rotateX(${vectorX * Project.degTransformation}deg)     rotateY(${vectorY * Project.degTransformation}deg) translateX(${ - vectorX * Project.translationTransformation}px) translateZ(-20px)`

                headerTexts.style.transform =   `rotateX(${vectorX * Project.degTransformation}deg)     rotateY(${vectorY * Project.degTransformation}deg) translateX(${ vectorX * Project.translationTransformation}px)    translateY(-50%)`

                this.setCursorStyle(percentOfPosition);
            }

        }

        /*
        * URI SHARE
        * */
        $getProjectUri(uri: string) {
            console.log(uri);
            getProjectsByUri(uri).then(value => {
                console.log( value.description_french )
            }, reason => {
                console.log(`OUPS, we can't get project with ${uri} uri`)
            })
        }

        //==========
        private static getPercentOfXPosition(xPosition: number, width: number, left: number) {
            const value = Math.round( (xPosition - left) / width * 100 )
            if(value < 0) return 0
            else if(value > 99) return 99
            else return value
        }

        private setCursorStyle(percent: number) {

            const cursorIsOnRight = percent > 50
            const cursosIsOnLeft = !cursorIsOnRight

            if(cursorIsOnRight && this.cursorIsLeft) {
                this.headerElement.classList.add("to-left")
                this.cursorIsLeft = false
            } else if(cursosIsOnLeft && this.cursorIsRight) {
                this.headerElement.classList.remove("to-left")
                this.cursorIsLeft = true
            }
        }

        // image details
        openImageDetails(index: number) {
            EventBus.$emit(EVENT_BUS_LIST.OPEN_IMAGE_DETAILS, this.$imagesData[index])
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/items";
    .v-project {
        @include items;
    }

    .v-project__header {
        perspective: 2500px;
        cursor: e-resize;

        &.to-left {
            cursor: w-resize;
        }
    }
</style>