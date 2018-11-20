<template>
    <section class="v-page-thesis">
        <header-with-text :data="pageThesisData.header"></header-with-text>

        <div class="v-page-projects__filter" >
            <filter-setting
                    class="v-page-thesis__filter"
                    $textInsteadTagList="thesis"
                    :$dates="$projectsDates"></filter-setting>
        </div>

        <main class="v-page-thesis__main">

        </main>

        <footer class="v-page-thesis__footer">
            <app-footer :$backgroundIsDark=true></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageThesisData} from "./IPageThesisData"
    import {IAllThesis} from "../../../api/genericsApiTypesIntefaces"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import AppFooter from "../../components/appFooter/AppFooter.vue"

    @Component({
        components: {AppFooter, FilterSetting, HeaderWithText}
    })
    export default class PageThesis extends Vue {
        @Prop({required: true}) data!: IPageThesisData
        get pageThesisData() {return this.data}

        @Prop({required: true}) allThesis!: IAllThesis
        get $allThesis() { return this.allThesis }

        get $projectsDates() {
            return generateDateFromTo(this.$allThesis.thesis)
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-thesis {
        @include page-dark;
    }
</style>