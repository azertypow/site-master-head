<template>
    <section class="v-thesis">

        <header class="v-cartel__header">
            <h3 class="v-cartel__header__title" v-if="$siteIsFr" >{{this.$thesisData.title_thesis_french }}</h3>
            <h3 class="v-cartel__header__title" v-else           >{{this.$thesisData.title_thesis_english}}</h3>

            <div class="v-cartel__header__author">{{this.$thesisData.students_thesis}} </div>
            <div class="v-cartel__header__author">{{this.$thesisData.tuteurs_thesis}}  </div>
        </header>

        <div class="v-cartel__description" :class="{'show-details': showDetails}">
            <div v-if="$siteIsFr"   class="v-cartel__description__texts" v-html="this.$thesisData.description_thesis_french"></div>
            <div v-else             class="v-cartel__description__texts" v-html="this.$thesisData.description_thesis_english"></div>
        </div>


        <div class="mmd-buttons">
            <btn-show-details :$siteLang="$siteLang"
                              v-on:clicked="btnDetailClicked()"></btn-show-details>

            <template v-if="$pdfLink">
                <a class="button button--small button--revert button--arrow" v-if="this.$siteIsFr" :href="$pdfLink" target="_blank">fichier PDF</a>
                <a class="button button--small button--revert button--arrow" v-else                :href="$pdfLink" target="_blank">PDF file</a>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMediaItem, IThesisItem} from "../../../api/genericsApiTypesIntefaces"
    import secureIsNaNNumber from "../../../secureIsNaNNumber"
    @Component({
        components: {BtnShowDetails}
    })
    export default class Thesis extends Vue {
        @Prop({required: true}) data!: IThesisItem
        get $thesisData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get $siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /**/

        private get descriptionContentHeight() {

            const textElement = this.$el.querySelector('.v-cartel__description__texts');

            let heightToReturn = 0;

            if(textElement) {
                heightToReturn += textElement.getBoundingClientRect().height

                const marginTop     = window.getComputedStyle(textElement, null).marginTop
                const marginBottom  = window.getComputedStyle(textElement, null).marginBottom

                heightToReturn += marginTop ? secureIsNaNNumber(parseFloat(marginTop))          : 0
                heightToReturn += marginBottom ? secureIsNaNNumber(parseFloat(marginBottom))    : 0
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
        }

        get $imagesData(): IMediaItem[] {
            const arrayOfImageMedia: IMediaItem[] = []

            for(const media of this.$thesisData.media) {
                if(media.type === "image") {
                    arrayOfImageMedia.push(media)
                }
            }

            return arrayOfImageMedia
        }

        get $pdfLink() {

            for(const media of this.$thesisData.media) {
                if(media.type === "document") return media.url
            }

            return null
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/font";

    .v-thesis {
        position: relative;
        margin-top: 10em;
    }
</style>