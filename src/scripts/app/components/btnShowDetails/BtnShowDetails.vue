<template>
    <button @click="btnDetailClicked()" class="v-btn-show-details button--small">

        <template v-if="$isActive">
            <template v-if="siteIsFr">cacher les détails</template>
            <template v-else         >hide details</template>
        </template>
        <template v-else>
            <template v-if="siteIsFr">voir les détails</template>
            <template v-else         >show details</template>
        </template>
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

        private isActive = false
        get $isActive() {return this.isActive}

        btnDetailClicked() {
            this.isActive = !this.isActive
            this.$emit("clicked")
        }
    }
</script>

<style lang="scss">
    .v-btn-show-details {

    }
</style>