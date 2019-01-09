<template>
    <section v-if="$bottomIsOpen" id="bottom-bar">

        <template v-if="!$barHasContent">
            <div class="text-container">
                <template v-for="bottomElement of $projectsInBottomBar">
                    <div class="text-container__scrolling-container">
                        <div
                                v-if="siteIsFr"
                                ref  ="text-container__text"
                                class="text-container__text" v-html="bottomElement.text_bandeau_french"></div>
                        <div
                                v-else
                                ref  ="text-container__text"
                                class="text-container__text" v-html="bottomElement.text_bandeau_english"></div>
                    </div>
                </template>
            </div>
        </template>

        <template v-else>
            <div class="social-container">
                <div class="social-container__item">
                    <a href="https://www.instagram.com/headmediadesign/" class="mmd-link--no-underline">instagram</a>
                </div>
                <div class="social-container__item">
                    <a href="https://twitter.com/headmediadesign" class="mmd-link--no-underline">twitter</a>
                </div>
                <div class="social-container__item">
                    <a href="https://vimeo.com/headmediadesign" class="mmd-link--no-underline">vimeo</a>
                </div>
                <div class="social-container__item">
                    <a href="https://github.com/" class="mmd-link--no-underline">github</a>
                </div>
            </div>
        </template>

        <div id="bottom-bar-btn" @click="closeBottomBar()">
            <svg id="bottom-bar-btn__icon" width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M0,0 L50,50" vector-effect="non-scaling-stroke" ></path>
                <path d="M50,0 L0,50" vector-effect="non-scaling-stroke" ></path>
            </svg>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from "vue-property-decorator"
    import {EventBus} from "../../../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {getBottomBarData} from "../../../apiRequestes"
    import {pushArrayInArray} from "../../../arrayPush"
    import {IProjectItem, IProjectsAppearBottomBar, IProjectsAppearhome} from "../../../api/genericsApiTypesIntefaces"

    @Component({
        updated: function() {

            const textContainerElement: Vue | Element | Vue[] | Element[] = (this as BottomBar).$refs["text-container__text"]

            if(Array.isArray(textContainerElement)) {
                for(const element of textContainerElement) {
                    if(element instanceof HTMLElement) {
                        BottomBar.setAnimationDuration(element)
                    }
                }
            }
        }
    })
    export default class BottomBar extends Vue {
        constructor() {
            super()
            getBottomBarData().then((data) => {
                this.$projectsInBottomBar = data.project
            })
        }

        @Prop({required: true}) $bottomIsOpen!: boolean

        /*
        * site lang
        * */
        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        /*
        * content of bottom bar
        * */
        private projectsInBottomBar: IProjectItem[] = []
        get $projectsInBottomBar() {
            return this.projectsInBottomBar.slice(0, 2)
        }
        set $projectsInBottomBar(value)   {
            pushArrayInArray(value, this.projectsInBottomBar)
        }

        get $barHasContent() {return this.$projectsInBottomBar.length > 0}

        // noinspection JSMethodCanBeStatic
        closeBottomBar() {
            EventBus.$emit(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR)
        }

        static setAnimationDuration(element: HTMLElement) {
            element.style.animationDuration = element.getBoundingClientRect().width / 100 + "s"
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";
    @import "../../../../styles/fix";

    #bottom-bar {
        $height-of-one-line: $footer-height / 2;

        @include remove-first-and-last-vertical-margin;
        @include -fix-safari-navigation-3d-overflow;

        position: fixed;
        left: 0;
        bottom: 0;
        color: $color-main;
        background-color: $color-main-light;
        box-sizing: border-box;
        padding-right: $footer-height;
        width: 100%;

        .text-container {
            @include row-container;
            @include container-content-centred;
            width: 100%;
            height: $footer-height;
        }
        .text-container__scrolling-container {
            @include remove-first-and-last-vertical-margin;
            height: $height-of-one-line;

            &:nth-child(2n) .text-container__text {
                animation-direction: reverse;
            }
        }
        .text-container__text {
            @include column-container;
            @include column-container--one-line;
            @include remove-first-and-last-vertical-margin;
            height: $height-of-one-line;
            line-height: $height-of-one-line;
            white-space: nowrap;
            position: absolute;
            left: 100%;
            padding-right: 100%;
            animation-duration: 41.41s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-name: text-horizontal-scrolling;

            > * {
                @include font-xs;
                margin: 0 !important;
                margin-right: $gutter-width !important;
                padding: 0;
                line-height: $height-of-one-line / 4 * 3; // aline vertical text on figure element (height: $footer-height)
                height: $height-of-one-line;
            }

            figure {
                position: relative;
                width: $height-of-one-line * (16/9);

                > img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }
        }

        @keyframes text-horizontal-scrolling {
            from {
                transform: translate3d(0, 0, 0);
            }
            to {
                transform: translate3d(-100%, 0, 0);
            }
        }

        .social-container {
            @include column-container;
            @include container-content-justified;
            @include gutter;
            align-items: center;
            width: 100%;
            height: $footer-height;
        }
        .social-container__item {
            > * {
                @include font-reg;
            }
        }

        #bottom-bar-btn {
            @include gutter;
            @include gutter-horizontal;
            background-color: white;
            position: absolute;
            box-sizing: border-box;
            top: 0;
            right: 0;
            cursor: pointer;
            width: $footer-height;
            height: $footer-height;
        }
        #bottom-bar-btn__icon {
            fill: none;
            stroke: $color-main-dark;
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>