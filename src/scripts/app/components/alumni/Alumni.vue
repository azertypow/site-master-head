<template>
    <section class="v-alumni">

        <div class="v-alumni__header">
            <h3 class="v-alumni__header__title">
                {{this.$alumniData.prenom_alumni}} {{this.$alumniData.nom_alumni}}
            </h3>
            <div class="v-alumni__header__date">
                {{this.$alumniData.year}}
            </div>
        </div>

        <div class="v-alumni__content">
            <h4 class="v-alumni__content__current-post">
                {{this.$alumniData.actual_post_alumni}}
            </h4>

            <p class="v-alumni__content__site">
                <a :href="cleanUrl(this.$alumniData.website_perso_alumni)" target="_blank">{{cleanUrl(this.$alumniData.website_perso_alumni)}}</a>
            </p>

            <p class="v-alumni__content__mail">
                <a :href="'mailto:' + this.$alumniData.email_perso_alumni">{{this.$alumniData.email_perso_alumni}}</a>
            </p>

            <div class="v-alumni__content__text" v-html="this.$alumniData.external_link_alumni">
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {IAlumnisItem} from "../../../api/genericsApiTypesIntefaces"

    @Component
    export default class Alumni extends Vue {
        @Prop({required: true}) data!: IAlumnisItem
        get $alumniData() {return this.data}

        // noinspection JSMethodCanBeStatic
        cleanUrl(url: string) { return url.replace(/^https?:\/\//,'')}
    }
</script>

<style lang="scss">
    @import "../../../../styles/_grid";

    .v-alumni {
        overflow: hidden;

        &__header {
            &__date {
                font-size: 0.7em;
            }

            &__title {
                font-size: 2em;
                margin: 0;
            }
        }

        &__content {
            @include remove-first-and-last-vertical-margin;
            padding-left: 20px;
            margin-top: 1rem;

            &__text {
                @include remove-first-and-last-vertical-margin;
            }
        }
    }
</style>