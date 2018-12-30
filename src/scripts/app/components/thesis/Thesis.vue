<template>
    <section class="v-thesis">

        <h3 v-if="$siteIsFr" class="title">{{this.$thesisData.title_thesis_french }}</h3>
        <h3 v-else           class="title">{{this.$thesisData.title_thesis_english}}</h3>

        <div class="authors">
            <p>{{this.$thesisData.students_thesis}} </p>
            <p>{{this.$thesisData.tuteurs_thesis}}  </p>
        </div>

        <div class="description">
            <p v-if="$siteIsFr"  >{{this.$thesisData.description_thesis_french }}</p>
            <p v-else            >{{this.$thesisData.description_thesis_english}}</p>
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

        .title {
            font-size: 3em;
            margin: 0;
            position: relative;
            mix-blend-mode: difference;
        }

        .authors {
            font-size: $font-s;
            font-weight: 600;
            mix-blend-mode: difference;


            > * {
                margin: 0;
            }
        }

        .description {
            max-width: 50em;
            margin-top: 10em;
        }
    }
</style>