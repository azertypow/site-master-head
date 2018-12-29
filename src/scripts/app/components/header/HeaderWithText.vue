import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section class="header-with-text app-header">
        <div class="app-header__text-container">
            <div class="app-header__text">
                <template v-if="siteIsFr">
                    <h1 v-html="this.data.title.fr" ></h1>
                    <h3                             >{{this.data.subtitle.fr}}</h3>
                    <!--<p                              >{{this.data.text.fr}}</p>-->
                </template>
                <template v-else>
                    <h1 v-html="this.data.title.en" ></h1>
                    <h3                             >{{this.data.subtitle.en}}</h3>
                    <!--<p                              >{{this.data.text.en}}</p>-->
                </template>
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
    @import "../../../../styles/_params";

    .header-with-text {
        &__text {
            $gradient-height: 4em;

            width: calc(100% / 12 * 10);
            position: absolute;
            left: 50%;
            top: 33%;
            transform: translateX(-50%) translateY(-33%) rotateX(33deg) rotateY(23deg) rotateZ(-19deg);

            &:after {
                content: '';
                position: absolute;
                width: 100%;
                height: $gradient-height;
                left: 0;
                bottom: -1px;
                background: linear-gradient(hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 1));;
            }
        }
    }
</style>