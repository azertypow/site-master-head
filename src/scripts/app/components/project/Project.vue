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

        <div class="v-project__description v-cartel__description" :class="{'show-details': showDetails}">
            <div v-if="$siteIsFr"   class="v-cartel__description__texts" v-html="this.$projectData.description_french"></div>
            <div v-else             class="v-cartel__description__texts" v-html="this.$projectData.description_english"></div>

            <div class="v-images-list">
                <template v-for="imageData of this.$imagesData">
                    <div class="v-images-list__item">
                        <img class="v-images-list__item__img" :src="imageData.generated.icon" :alt="imageData.origin.meta.image_description + ' ' + imageData.origin.meta.copyright">
                    </div>
                </template>
            </div>
        </div>

        <div class="mmd-buttons">
            <btn-show-details :$siteLang="$siteLang"
                              v-on:clicked="btnDetailClicked()"></btn-show-details>

            <button class="button--small button--arrow button--revert"  v-if="this.$siteIsFr"   @click="$getProjectUri($projectData.uri)">partager</button>
            <button class="button--small button--arrow button--revert"  v-else                  @click="$getProjectUri($projectData.uri)">share</button>
        </div>

    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMedia_generatedItem, IMediaItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import MediaImage from "../image/MediaImage"
    import secureIsNaNNumber from "../../../secureIsNaNNumber"
    import {getProjectsByUri} from "../../../apiRequestes"

    @Component({
        components: {MediaImage, BtnShowDetails},
        mounted: function() {
            const headerElement = (this as Project).$el.querySelector(".v-project__header");

            if(headerElement instanceof HTMLElement) {
                const headerImages = headerElement.querySelector(".v-project__header__images")
                const headerTexts = headerElement.querySelector(".v-project__header__texts")

                if(headerImages instanceof HTMLElement && headerTexts instanceof HTMLElement) {
                    headerElement.addEventListener("mousemove", (e)=> {
                        (this as Project).headerImageInteraction(e, headerImages, headerTexts)
                    });
                }
            }
        }
    })
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectItem
        get $projectData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/

        private get descriptionContentHeight() {

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

        /*
        * details sections
        * */
        private showDetails = false
        set $showDetails(value) {this.showDetails = value}
        get $showDetails()      {return this.showDetails}

        btnDetailClicked() {
            this.$showDetails = !this.$showDetails

            const descriptionContainerElement = this.$el.querySelector('.v-cartel__description')

            if(descriptionContainerElement instanceof HTMLElement) {

                if(this.$showDetails) {
                    descriptionContainerElement.style.maxHeight = `${this.descriptionContentHeight}px`;
                } else {
                    descriptionContainerElement.style.maxHeight = ""
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

                function getPercentOfXPosition(xPosition: number, width: number, left: number) {
                    const value = Math.round( (xPosition - left) / width * 100 )
                    if(value < 0) return 0
                    else if(value > 99) return 99
                    else return value
                }

                this.indexOfImageToShowInHeader = Math.floor( getPercentOfXPosition(e.clientX, width, left) * this.$imagesData.length / 100 )

                headerImages.style.transform =  `rotateX(${vectorX * Project.degTransformation}deg)     rotateY(${vectorY * Project.degTransformation}deg) translateX(${ - vectorX * Project.translationTransformation}px)`

                headerTexts.style.transform =   `rotateX(${vectorX * Project.degTransformation}deg)     rotateY(${vectorY * Project.degTransformation}deg) translateX(${ vectorX * Project.translationTransformation}px)`
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
    }
</script>

<style lang="scss">
    @import "../../../../styles/items";
    .v-project {
        @include items;
    }

    .v-project__header {
        perspective: 2500px;
    }
</style>