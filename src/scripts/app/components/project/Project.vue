<template>
    <section class="v-project">
        <div class="img-container">
            <template v-for="imageData of this.$imagesData">
                <MediaImage :data="imageData"/>
            </template>
        </div>

        <h3 class="title">{{this.$projectData.title}}</h3>

        <div class="authors">
            <p v-for="students of this.$projectData.students">{{students.students_name}}</p>
        </div>

        <div class="description">
            <p v-if="siteIsFr"  >{{this.$projectData.description_french}}</p>
            <p v-else           >{{this.$projectData.description_english}}</p>
        </div>

        <btn-show-details :$siteLang="$siteLang"
                          v-on:clicked="btnDetailClicked()"></btn-show-details>
        <div class="text">
            <!--todo text content ?-->
            <p v-if="siteIsFr && $showDetails" >contenu text francais ?</p>
            <p v-else-if="$showDetails"        >english content text ?</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    import {IMediaItem, IProjectItem} from "../../../api/genericsApiTypesIntefaces"
    import MediaImage from "../image/MediaImage"
    @Component({
        components: {MediaImage, BtnShowDetails}
    })
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectItem
        get $projectData() {return this.data}

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

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
    .v-project {
        position: relative;
        margin-top: 10em;

        .title {
            margin: 0;
            position: relative;
            mix-blend-mode: difference;
        }

        .authors {
            font-size: 1.5em;
            font-weight: 600;
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