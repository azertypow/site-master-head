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
            <div class="v-project__header__texts">
                <h3 class="title">{{this.$projectData.title}}</h3>

                <div class="authors">
                    <p v-for="students of this.$projectData.students">{{students.students_name}}</p>
                </div>
            </div>
        </header>

        <div class="v-project__description" :class="{'show-details': showDetails}">
            <div class="v-project__description__texts">
                <div v-if="$siteIsFr" v-html="this.$projectData.description_french"   ></div>
                <div v-else           v-html="this.$projectData.description_english"  ></div>
            </div>

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