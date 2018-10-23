<template>
    <section v-if="$bottomIsOpen" id="bottom-bar">
        <div class="container">top</div>
        <div class="container">bottom</div>
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
    import {EVENT_BUS_LIST} from "../../../GLOBAL_ENUMS"

    @Component
    export default class BottomBar extends Vue {
        @Prop({required: true}) $bottomIsOpen!: boolean

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
        width: 100%;

        .container {
            width: 100%;
            height: 2em;
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