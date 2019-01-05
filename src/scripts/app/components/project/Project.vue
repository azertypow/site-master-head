<template>
    <section class="v-project">
        <header class="v-project__header">
            <div class="v-project__header__images">
                <template v-for="imageData of this.$imagesData">
                    <MediaImage
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
                        <img class="v-images-list__item__img" :src="imageData.url" :alt="imageData.meta.image_description + ' ' + imageData.meta.copyright">
                    </div>
                </template>
            </div>
        </div>

        <btn-show-details :$siteLang="$siteLang"
                          v-on:clicked="btnDetailClicked()"></btn-show-details>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMediaItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import MediaImage from "../image/MediaImage"
    import secureIsNaNNumber from "../../../secureIsNaNNumber"
    @Component({
        components: {MediaImage, BtnShowDetails},
    })
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectItem
        get $projectData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

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

        /**/

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

        get $imagesData(): IMediaItem[] {
            const arrayOfImageMedia: IMediaItem[] = []

            for(const media of this.$projectData.media) {
                if(media.type === "image") {
                    arrayOfImageMedia.push(media)
                }
            }

            return arrayOfImageMedia
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/items";
    .v-project {
        @include items;
    }
</style>