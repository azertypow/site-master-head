import {LANG_LIST} from "../GLOBAL_ENUMS"
<template>
    <section class="header-with-text">
        <div class="header-with-text__text">
            <div class="header-with-text__text__scroll">
                <template v-if="siteIsFr">
                    <h1 v-html="this.data.title.fr" class="header-with-text__text__scroll__title"></h1>
                    <h2                             class="header-with-text__text__scroll__subtitle">{{this.data.subtitle.fr}}</h2>
                    <p                              class="header-with-text__text__scroll__description">{{this.data.text.fr}}</p>
                </template>
                <template v-else>
                    <h1 v-html="this.data.title.en" class="header-with-text__text__scroll__title"></h1>
                    <h2                             class="header-with-text__text__scroll__subtitle">{{this.data.subtitle.en}}</h2>
                    <p                              class="header-with-text__text__scroll__description">{{this.data.text.en}}</p>
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
        @include app-header;

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

            &__scroll {
                max-height: 75vh;
                overflow: scroll;

                > p:last-child {
                    margin-bottom: $gradient-height;
                }
            }
        }
    }
</style>