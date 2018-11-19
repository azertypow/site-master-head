<template>
    <section class="v-page-contact">
        <header-with-text :data="pageContactData.header"></header-with-text>

        <main>

        </main>
        <app-footer></app-footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import {IPageContactData} from "./IPageContactData"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    @Component({
        components: {
            AppFooter,
            HeaderWithText,
        }
    })
    export default class PageContact extends Vue {
        @Prop({required: true}) data!: IPageContactData
        get pageContactData() {return this.data}
    }
</script>

<style lang="scss">
    .v-page-contact {

    }
</style>