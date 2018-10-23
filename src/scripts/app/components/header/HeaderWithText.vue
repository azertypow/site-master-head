import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section id="header-with-text">
        <div class="text-content">
            <div v-if="siteIsFr">
                <h1>{{this.data.title.fr}}</h1>
                <h2>{{this.data.subtitle.fr}}</h2>
                <p>{{this.data.text.fr}}</p>
            </div>
            <div v-else>
                <h1>{{this.data.title.en}}</h1>
                <h2>{{this.data.subtitle.en}}</h2>
                <p>{{this.data.text.en}}</p>
            </div>

        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EventBus} from "../../../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"
    import {IHeaderWithTextData} from "./IHeaderWithTextData"

    @Component({
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                console.log( (this as HeaderWithText).$siteLang = event )
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
        }
    })
    export default class HeaderWithText extends Vue {
        @Prop({required: true}) data!: IHeaderWithTextData

        siteLang = DEFAULT_SITE_LANG
        set $siteLang(value: LANG_LIST) {
            this.siteLang = value
        }
        get $siteLang() {
            return this.siteLang
        }

        get siteIsFr () {return this.$siteLang === LANG_LIST.FR}
    }
</script>

<style lang="scss">
    @import "../../../../styles/app-header";
    @import "../../../../styles/_settings";

    #header-with-text {
        @include app-header;
    }
</style>