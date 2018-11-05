<template>
    <section class="v-project">
        <div class="img-container">
            <template v-for="image of $projectData.images">
                <div class="img-container">
                    <div class="img" :style="{backgroundImage: 'url(' + image.url + ')'}"></div>
                    <div class="credit">
                        {{image.credit}}
                    </div>
                    <div>
                        {{image.name}}
                    </div>
                </div>
            </template>
        </div>

        <h3 class="title">{{this.$projectData.title}}</h3>

        <div class="authors">
            <p v-for="author of this.$projectData.authors">{{author}}</p>
        </div>

        <div class="description">
            <p v-if="siteIsFr"  >{{this.$projectData.description.fr}}</p>
            <p v-else           >{{this.$projectData.description.en}}</p>
        </div>

        <btn-show-details :$siteLang="$siteLang"
                          v-on:clicked="btnDetailClicked()"></btn-show-details>
        <div class="text">
            <p v-if="siteIsFr && $showDetails" >{{this.$projectData.text.fr}}</p>
            <p v-else-if="$showDetails"        >{{this.$projectData.text.en}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IProjectData} from "./IProjectData"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import BtnShowDetails from "../btnShowDetails/BtnShowDetails"
    @Component({
        components: {BtnShowDetails}
    })
    export default class Project extends Vue {
        @Prop({required: true}) data!: IProjectData
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
    }
</script>

<style lang="scss">
    .v-project {
        position: relative;
        margin-top: 10em;

        .img-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .img {
                width: 500px;
                height: 250px;
                background-size: cover;
                background-repeat: no-repeat;
                margin: auto;
            }
        }

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