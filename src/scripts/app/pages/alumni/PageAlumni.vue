<template>
    <section id="page-alumni">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="alumni"
                :$dates="$alumniDates"></filter-setting>
        <main>

        </main>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageAlumniData} from "./IPageAlumniData"
    import {generateDateFromTo} from "../../generateDateFromTo"
    import {IAllAlumni} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        components: {
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageAlumni extends Vue {
        @Prop({required: true}) data!: IPageAlumniData

        @Prop({required: true}) allAlumni!: IAllAlumni
        get $allAlumni() { return this.allAlumni }

        get $alumniDates() {
            //todo use api/other/minmaxdates
            return generateDateFromTo(this.$allAlumni.alumnis)
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-alumni {
        @include page-dark;
    }
</style>