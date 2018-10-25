<template>
    <button @click="btnDetailClicked()" class="v-btn-show-details">
        <span v-if="siteIsFr">détails</span>
        <span v-else         >details</span>
    </button>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"

    @Component
    export default class BtnShowDetails extends Vue {
        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        btnDetailClicked() {
            this.$emit("clicked")
        }
    }
</script>

<style lang="scss">
    .v-btn-show-details {

    }
</style>