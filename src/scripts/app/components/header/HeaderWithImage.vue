import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section class="header-with-image app-header">
        <div class="app-header__background-container">
            <div class="app-header__image" style="background-image: url('/content/projects/5-bootcamp/md_bootcamp-2018head-raphaellemueller-11.jpg');                              transform: translateX(-145%)    translateY(-45%) translateZ(130px) rotateY(5deg)    rotateZ(-10deg);"></div>
            <div class="app-header__image" style="background-image: url('/content/projects/5-bootcamp/md_bootcamp-2018head-raphaellemueller-8-low.jpg');   transform: translateX(-50%)     translateY(-50%) translateZ(125px) rotateY(-4deg)   rotateZ(7deg);"></div>
            <div class="app-header__image" style="background-image: url('/content/projects/5-bootcamp/md_bootcamp-2018head-raphaellemueller-23-low.jpg');              transform: translateX(45%)      translateY(-50%) translateZ(120px) rotateY(5deg)    rotateZ(-4deg);"></div>
        </div>
        <div class="app-header__text-container">
            <div class="app-header__text">
                <h1 v-if="siteIsFr" v-html="this.data.title.fr"></h1>
                <h1 v-else          v-html="this.data.title.en"></h1>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import {IHeaderWithImageData} from "./IHeaderWithImageData"
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {EventBus} from "../../../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"

    @Component({
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                (this as HeaderWithImage).$siteLang = event
                console.log("coucou")
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
        }
    })
    export default class HeaderWithImage extends Vue {
        @Prop({required: true}) data!: IHeaderWithImageData

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
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";

    .header-with-image {

    }
</style>