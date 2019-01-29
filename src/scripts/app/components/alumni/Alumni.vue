<template>
    <div class="mmd-content mmd-id-cartel v-alumni">
        <h4 class="mmd-id-cartel_title">{{this.$alumniData.prenom_alumni}} {{this.$alumniData.nom_alumni}}</h4>

        <h6>{{this.$alumniData.year}}</h6>

        <h5 class="mmd-id-cartel_post" v-if="this.$alumniData.actual_post_alumni">{{this.$alumniData.actual_post_alumni}}</h5>

        <div  class="mmd-id-cartel_desc mmd-content-small v-alumni__add-link" v-if="this.$alumniData.external_link_alumni" v-html="this.$alumniData.external_link_alumni"></div>

        <div class="mmd-id-cartel_contact" v-if="this.$alumniData.website_perso_alumni">
            <a class="mmd-id-cartel_link"   target="_blank" :href="this.$alumniData.website_perso_alumni"            >{{cleanUrl(this.$alumniData.website_perso_alumni)}}</a>
        </div>
        <div class="mmd-id-cartel_contact" v-if="this.$alumniData.email_perso_alumni">
            <a class="mmd-id-cartel_link"   target="_blank" :href="'mailto:' + this.$alumniData.email_perso_alumni"  >{{this.$alumniData.email_perso_alumni}}</a>
        </div>
    </div>
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
    }
</style>