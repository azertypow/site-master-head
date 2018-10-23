<template>
    <section id="page-home">
        <app-header-with-image
                :data="data.header" />
        <section class="main">
            <section id="page-home-workshop">
                <header>
                    <h2 v-if="siteIsFr" >workshops</h2>
                    <h2 v-else          >workshops</h2>
                </header>
            </section>
            <section id="page-home-seminars">
                <header>
                    <h2 v-if="siteIsFr" >séminaires</h2>
                    <h2 v-else          >seminars</h2>
                </header>
            </section>
            <section id="page-home-events">
                <header>
                    <h2 v-if="siteIsFr" >évènements</h2>
                    <h2 v-else          >events</h2>
                </header>
                <div class="content">
                </div>
            </section>
        </section>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import AppHeaderWithImage from '../../components/header/HeaderWithImage'
    import {IPageHomeData} from "./IPageHomeData"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"

    @Component({
        components: {
            AppHeaderWithImage,
        }
    })
    export default class PageHome extends Vue {
        @Prop({required: true}) data!: IPageHomeData
        @Prop({required: true}) $siteLang!: LANG_LIST

        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
        get siteIsEn() { return this.$siteLang === LANG_LIST.EN }

    }
</script>

<style lang="scss">
    @import "../../../../styles/_settings";
    @import "../../../../styles/pages";

    #page-home {
        @include page-dark;
    }
</style>