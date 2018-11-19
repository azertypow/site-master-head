<template>
    <section class="v-alumni">
        <h3><strong>{{this.$alumniData.prenom_alumni}}</strong> {{this.$alumniData.nom_alumni}}</h3>
        <h4>{{this.$alumniData.actual_post_alumni}}</h4>
        <ul>
            <li>
                <a :href="cleanUrl(this.$alumniData.website_perso_alumni)" target="_blank">{{cleanUrl(this.$alumniData.website_perso_alumni)}}</a>
            </li>
            <li>
                <a :href="'mailto:' + this.$alumniData.email_perso_alumni">{{this.$alumniData.email_perso_alumni}}</a>
            </li>
            <li v-html="this.$alumniData.external_link_alumni">
            </li>
        </ul>
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
    .v-alumni {

    }
</style>