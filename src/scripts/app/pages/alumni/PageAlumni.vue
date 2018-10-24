<template>
    <section id="page-alumni">
        <header-with-text :data="data.header"></header-with-text>
        <filter-setting
                $textInsteadTagList="alumni"></filter-setting>
        <section class="main">

        </section>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import FilterSetting from "../../components/filter/FilterSetting"
    import {IPageAlumniData} from "./IPageAlumniData"

    @Component({
        components: {
            HeaderWithText,
            FilterSetting,
        }
    })
    export default class PageAlumni extends Vue {
        @Prop({required: true}) data!: IPageAlumniData
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    #page-alumni {
        @include page-dark;
    }
</style>