<template>
    <section class="v-thesis">

        <div class="v-cartel__header">
            <h3 class="v-cartel__header__title" v-if="$siteIsFr" >{{this.$thesisData.title_thesis_french }}</h3>
            <h3 class="v-cartel__header__title" v-else           >{{this.$thesisData.title_thesis_english}}</h3>

            <div class="v-cartel__header__author">{{this.$thesisData.students_thesis}} </div>
            <div class="v-cartel__header__author">{{this.$thesisData.tuteurs_thesis}}  </div>
        </div>

        <div class="v-cartel__description">
            <div v-if="$siteIsFr"   class="v-cartel__description__texts" v-html="this.$thesisData.description_thesis_french"></div>
            <div v-else             class="v-cartel__description__texts" v-html="this.$thesisData.description_thesis_english"></div>
        </div>

        <btn-show-details :$siteLang="$siteLang"
                          v-on:clicked="btnDetailClicked()"></btn-show-details>
        <div class="text">
            <!--todo text content ?-->
            <p v-if="$siteIsFr && $showDetails" >contenu text francais ?</p>
            <p v-else-if="$showDetails"        >english content text ?</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMediaItem, IThesisItem} from "../../../api/genericsApiTypesIntefaces"
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
    }
</script>

<style lang="scss">
    @import "../../../../styles/font";

    .v-thesis {
        position: relative;
        margin-top: 10em;
    }
</style>