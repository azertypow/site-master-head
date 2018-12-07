<template>
    <section v-if="$bottomIsOpen" id="bottom-bar">

        <template v-if="$barHasContent">
            <div class="text-container">
                <template v-for="bottomElement of $projectsInBottomBar">
                    <div
                            v-if="siteIsFr"
                            class="text" v-html="bottomElement.text_bandeau_french"></div>
                    <div
                            v-else
                            class="text" v-html="bottomElement.text_bandeau_english"></div>
                </template>
            </div>
        </template>

        <template v-else>
            <div class="social-container">
                <span>instagram</span>
                <span>twitter</span>
                <span>vimeo</span>
                <span>github</span>
            </div>
        </template>

        <div id="bottom-bar-btn" @click="closeBottomBar()">
            <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M0,0 L50,50" ></path>
                <path d="M50,0 L0,50" ></path>
            </svg>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {EventBus} from "../../../event-bus"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {getBottomBarData} from "../../../apiRequestes"
    import {pushArrayInArray} from "../../../arrayPush"
    import {IProjectItem, IProjectsAppearBottomBar, IProjectsAppearhome} from "../../../api/genericsApiTypesIntefaces"

    @Component
    export default class BottomBar extends Vue {
        constructor() {
            super()
            getBottomBarData().then((data) => {
                this.$projectsAppearBottomBar = data
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
        private projectsAppearBottomBar!: IProjectsAppearBottomBar
        get $projectsAppearBottomBar() {return this.projectsAppearBottomBar}
        set $projectsAppearBottomBar(value: IProjectsAppearBottomBar) {
            this.$projectsInBottomBar = value.project
            this.projectsAppearBottomBar = value
        }

        private projectsInBottomBar: IProjectItem[] = []
        get $projectsInBottomBar()        {return this.projectsInBottomBar}
        set $projectsInBottomBar(value)   {
            pushArrayInArray(value, this.projectsInBottomBar)
        }

        get $barHasContent() {return this.$projectsInBottomBar.length > 0}

        // noinspection JSMethodCanBeStatic
        closeBottomBar() {
            EventBus.$emit(EVENT_BUS_LIST.CLOSE_BOTTOM_BAR)
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/_grid";

    #bottom-bar {
        position: fixed;
        left: 0;
        bottom: 0;
        color: $color-main;
        background-color: $color-main-light;
        box-sizing: border-box;
        padding-right: 100px;
        width: 100%;

        .text-container {
            width: 100%;
            height: 5em;
        }

        .social-container {
            width: 100%;
            height: 4em;
        }
    }

    #bottom-bar-btn {
        @include gutter;
        @include gutter-horizontal;
        position: absolute;
        box-sizing: content-box;
        top: 50%;
        right: 0;
        cursor: pointer;
        transform: translate(0, -50%);

        > svg {
            fill: none;
            stroke: $color-main-dark;
            position: relative;
            top: 0;
            left: 0;
        }
    }
</style>