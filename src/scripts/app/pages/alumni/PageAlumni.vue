<template>
    <section id="page-alumni">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="alumni"
                :$dates="$alumniDates"></filter-setting>
        <section class="main">

        </section>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageAlumniData} from "./IPageAlumniData"
    import {getAlumniDataFromTo} from "../../../apiRequestes"

    @Component({
        components: {
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageAlumni extends Vue {
        constructor() {
            super()

            getAlumniDataFromTo().then((dates) => {
                (this as PageAlumni).$alumniDates = dates
            })
        }

        @Prop({required: true}) data!: IPageAlumniData

        /*
        * dates
        * */
        private alumniDates: number[] = []
        set $alumniDates(tags) {
            for(const tag of tags) {
                this.alumniDates.push(tag);
            }
        }
        get $alumniDates() {
            return this.alumniDates
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-alumni {
        @include page-dark;
    }
</style>