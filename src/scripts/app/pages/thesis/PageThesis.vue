<template>
    <section class="v-page-thesis">
        <header-with-text :data="pageThesisData.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="thesis"
                :$dates="$projectsDates"></filter-setting>
        <main>

        </main>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageThesisData} from "./IPageThesisData"
    import {getThesisDataFromTo} from "../../../apiRequestes"

    @Component({
        components: {FilterSetting, HeaderWithText}
    })
    export default class PageThesis extends Vue {
        constructor() {
            super()
            getThesisDataFromTo().then((dates) => {
                (this as PageThesis).$projectsDates = dates
            })
        }

        @Prop({required: true}) data!: IPageThesisData
        get pageThesisData() {return this.data}

        private projectsDates: number[] = []
        set $projectsDates(tags) {
            for(const tag of tags) {
                this.projectsDates.push(tag);
            }
        }
        get $projectsDates() {
            return this.projectsDates
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-thesis {
        @include page-dark;
    }
</style>