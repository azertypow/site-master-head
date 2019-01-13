<template>
    <section class="v-filter-setting" >
        <template>
            <div v-if="siteIsEn">show</div>
            <div v-else         >montrer les</div>
        </template>

        <!--tag filter-->
        <div class="v-filter-setting__tags"
             :class="{'open' : this.$tagsIsOpen}"
             v-if="$hasTextInsteadTagList">

            <span   class="v-filter-setting__tags__value"
                    @click="$openTags($event)"
                    >{{$tagSelected}}</span>

            <div class="v-filter-setting__container" @click="$tagsIsOpen = false">
                <div class="v-filter-setting__container-grid">
                    <ul class="v-filter-setting__tags__list" :style="{ top: $tagsPositionTop + 'px' }">
                        <template v-for="(tag, index) in $tags" >
                            <li @click="$indexOf_Tag_Selected = index" :class="{'is-selected': this_Tag_IsSelected(index)}">
                                {{tag}}
                            </li>
                            <div class="list__break"></div>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else>
            {{$textInsteadTagList}}
        </div>

        <!--data filter - from-->
        <template>
            <div v-if="siteIsEn">from</div>
            <div v-else         >de</div>
        </template>

        <div class="v-filter-setting__from"
             :class="{'open' : this.$min_dateIsOpen}">

            <span   class="v-filter-setting__from__value"
                    @click="$openMin_Date($event)"
                    >{{this.$min_dateSelected}}</span>

            <div class="v-filter-setting__container" @click="$min_dateIsOpen = false">
                <div class="v-filter-setting__container-grid">
                    <ul class="v-filter-setting__from__list" :style="{ top: $min_DatePositionTop + 'px' }">
                        <template v-for="(date, index) in $dates" >
                            <li @click="$indexOf_Min_DateSelected = index"
                                :class="{'is-selected': $thisIs_min_dateSelected(index)}">
                                {{date}}
                            </li>
                            <div class="list__break"></div>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <!--data filter - to-->
        <template>
            <div v-if="siteIsEn">to</div>
            <div v-else         >à</div>
        </template>

        <div class="v-filter-setting__to"
             :class="{'open' : this.$max_DateIsOpen}">

            <span class="v-filter-setting__to__value"
                  @click="$openMax_Date($event)"
                  >{{this.$max_dateSelected}}</span>

            <div class="v-filter-setting__container" @click="$max_DateIsOpen = false">
                <div class="v-filter-setting__container-grid">
                    <ul class="v-filter-setting__to__list" :style="{ top: $max_DatePositionTop + 'px' }">
                        <template v-for="(date, index) in $dates" >
                            <li @click="$indexOf_Max_DateSelected = index"
                                :class="{'is-selected': $thisIs_max_dateSelected(index)}" >
                                {{date}}
                            </li>
                            <div class="list__break"></div>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {EventBus} from "../../../event-bus"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"

    @Component({
        watch: {
            $dates: function() {
                // if the list of dates changes, select the largest date for the value "to" and ensure that we see all the projects
                (this as FilterSetting).$indexOf_Max_DateSelected = (this as FilterSetting).$dates.length - 1
            }
        },
        created: function() {
            EventBus.$on(EVENT_BUS_LIST.LANG, (event: LANG_LIST) => {
                (this as FilterSetting).$siteLang = event
            })
        },
        beforeDestroy: function () {
            EventBus.$off(EVENT_BUS_LIST.LANG)
        }
    })
    export default class FilterSetting extends Vue {
        @Prop() $textInsteadTagList!: string
        @Prop({default: () => []}) $tags!: string[]
        @Prop({default: () => []}) $dates!: number[]

        get $hasTextInsteadTagList() {
            return this.$textInsteadTagList === void 0
        }

        /*
        * lang
        * */
        private siteLang = DEFAULT_SITE_LANG
        set $siteLang(lang: LANG_LIST) {
            this.siteLang = lang
        }
        get $siteLang() {
            return this.siteLang
        }

        get siteIsEn() { return this.$siteLang === LANG_LIST.EN }

        /*
        * tags selection
        * */
        indexOf_Tag_Selected = 0
        get $indexOf_Tag_Selected() { return this.indexOf_Tag_Selected }
        set $indexOf_Tag_Selected(index: number) {
            this.indexOf_Tag_Selected = index

            this.$tagsIsOpen = false
        }

        get $tagSelected() {
            return this.$tags[this.$indexOf_Tag_Selected]
        }

        this_Tag_IsSelected(index: number) {
            return this.indexOf_Tag_Selected === index
        }

        tagsIsOpen = false
        get $tagsIsOpen() {return this.tagsIsOpen}
        set $tagsIsOpen(value: boolean) { this.tagsIsOpen = value}

        private tagsPositionTop = 0;
        get $tagsPositionTop() {return this.tagsPositionTop}
        set $tagsPositionTop(value) {this.tagsPositionTop = value}

        $openTags(event: MouseEvent) {
            this.$tagsIsOpen = true;
            if(event.srcElement) {
                this.$tagsPositionTop = event.srcElement.getBoundingClientRect().bottom;
            }
        }

        /*
        * minimum date selection
        * */
        indexOf_Min_DateSelected = 0
        get $indexOf_Min_DateSelected() { return this.indexOf_Min_DateSelected }
        set $indexOf_Min_DateSelected(index: number) {

            if(index > this.$indexOf_Max_DateSelected) {
                this.$indexOf_Max_DateSelected = index
            }

            this.indexOf_Min_DateSelected = index

            this.$min_dateIsOpen = false

            this.$emitNewFilterValues()
        }

        get $min_dateSelected() {
            return this.$dates[this.$indexOf_Min_DateSelected]
        }

        $thisIs_min_dateSelected(index: number) {
            return this.indexOf_Min_DateSelected === index
        }

        min_dateIsOpen = false
        get $min_dateIsOpen() {return this.min_dateIsOpen}
        set $min_dateIsOpen(value: boolean) { this.min_dateIsOpen = value}

        private min_DatePositionTop = 0;
        get $min_DatePositionTop() {return this.min_DatePositionTop}
        set $min_DatePositionTop(value) {this.min_DatePositionTop = value}

        $openMin_Date(event: MouseEvent) {
            this.$min_dateIsOpen = true;
            if(event.srcElement) {
                this.$min_DatePositionTop = event.srcElement.getBoundingClientRect().bottom;
            }
        }

        /*
        *maximum date selection 
        * */
        indexOf_Max_DateSelected = this.$dates.length
        get $indexOf_Max_DateSelected() { return this.indexOf_Max_DateSelected }
        set $indexOf_Max_DateSelected(index: number) {

            if(index < this.$indexOf_Min_DateSelected) {
                this.$indexOf_Min_DateSelected = index
            }

            this.indexOf_Max_DateSelected = index

            this.$max_DateIsOpen = false

            this.$emitNewFilterValues()
        }

        get $max_dateSelected() {
            return this.$dates[this.$indexOf_Max_DateSelected]
        }

        $thisIs_max_dateSelected(index: number) {
            return this.indexOf_Max_DateSelected === index
        }

        private max_DateIsOpen = false
        get $max_DateIsOpen() { return this.max_DateIsOpen }
        set $max_DateIsOpen(value: boolean) { this.max_DateIsOpen = value }

        private max_DatePositionTop = 0;
        get $max_DatePositionTop() {return this.max_DatePositionTop}
        set $max_DatePositionTop(value) {this.max_DatePositionTop = value}

        $openMax_Date(event: MouseEvent) {
            this.$max_DateIsOpen = true;
            if(event.srcElement) {
                this.$max_DatePositionTop = event.srcElement.getBoundingClientRect().bottom;
            }
        }
        /*
        * emit
        * */
        $emitNewFilterValues() {
            this.$emit("change", {
                from: this.$min_dateSelected,
                to  : this.$max_dateSelected,
            })
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_grid";
    @import "../../../../styles/ui";

    .v-filter-setting {
        @include font-reg;
        position: absolute;
        user-select: none;
        overflow: visible;

        > * {
            display: inline-block;
            padding: 0;
        }

        &__tags,
        &__from,
        &__to {
            @include link;
            position: relative;

            &__value {
                display: inline-block;
            }

            &__list {
                @include column-skip(1, 12);
                @include gutter;
                @include font-reg;
                position: relative;
                white-space: nowrap;
                display: block;
                padding-bottom: 75vh;

                li {
                    list-style: none;
                    position: relative;
                    z-index: 10;
                    display: inline-block;

                    &:before {
                        content: none;
                    }

                    &:hover:after {
                        content: "";
                        position: absolute;
                        bottom: 1ex;
                        left: 0;
                        width: 100%;
                        height: 1px;
                        background: currentColor;
                    }
                }
                .list__break {
                    width: 100%;
                }
                .is-selected {
                    display: none;
                }
            }

            &__cache {
                width: 0;
                height: 0;
                background: black;
                top: 0;
                left: 0;
                z-index: 10;
                position: fixed;
                transition: opacity 500ms;
                opacity: 0;
            }
        }

        .v-filter-setting__container {
            background-color: rgba(0, 0, 0, 0.9);
            position: fixed;
            z-index: 10;
            display: block;
            transition: opacity 500ms;
            overflow: hidden;
            top: -100%;
            left: -100%;
            width: 0;
            height: 0;
            opacity: 0;
        }

        .v-filter-setting__container-grid {
            @include column-container;
            @include site-max-width;
        }

        &__tags.open,
        &__from.open,
        &__to.open {

            .v-filter-setting__container {
                overflow: scroll;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 1;
            }

            .v-filter-setting__tags__cache,
            .v-filter-setting__from__cache,
            .v-filter-setting__to__cache {
                width: 100%;
                height: 100%;
                opacity: 0.9;
            }
        }

    }

    .v-filter-background-white {
        .v-filter-setting__container {
            background-color: rgba(255, 255, 255, 0.9);
        }
    }
</style>