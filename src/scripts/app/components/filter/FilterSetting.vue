<template>
    <section class="v-filter-setting" >
        <template v-if="$indexOf_Tag_Selected === -1">
            <div v-if="siteIsEn">show</div>
            <div v-else         >montrer</div>
        </template>
        <template v-else>
            <div v-if="siteIsEn">show</div>
            <div v-else         >montrer les</div>
        </template>

        <!--tag filter-->
        <div class="v-filter-setting__tags"
             :class="{'open' : this.$tagsIsOpen}"
             v-if="$hasTextInsteadTagList">

            <span   class="v-filter-setting__tags__value"
                    @click="$openTags($event)"
                    >
                <template v-if="$indexOf_Tag_Selected === -1">
                    <template v-if="siteIsEn"   >all projects</template>
                    <template v-else            >tous les projets</template>
                </template>
                <template v-else>{{$tagSelected}}</template>
            </span>

            <div class="v-filter-setting__container" @click="$tagsIsOpen = false">
                <div class="v-filter-setting__container-grid">
                    <ul class="v-filter-setting__tags__list" :style="{ top: $tagsPositionTop + 'px' }">
                            <li @click="$indexOf_Tag_Selected = -1" :class="{'is-selected': this_Tag_IsSelected(-1)}">
                                <template v-if="siteIsEn">all projects</template>
                                <template v-else>tous les projets</template>
                            </li>
                            <div class="list__break"></div>
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
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import {EVENT_BUS_LIST, LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {EventBus} from "../../../event-bus"
    import {DEFAULT_SITE_LANG} from "../../../../SETTINGS"

    @Component({
        watch: {
            $tags: function() {
                // if the list of tags changes, select "all project" with -1 index
                (this as FilterSetting).$indexOf_Tag_Selected = -1;
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
        indexOf_Tag_Selected = -1
        get $indexOf_Tag_Selected() { return this.indexOf_Tag_Selected }
        set $indexOf_Tag_Selected(index: number) {
            this.indexOf_Tag_Selected = index

            this.$tagsIsOpen = false
        }

        get $tagSelected() {
            if(this.indexOf_Tag_Selected < 0) return "all"
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
        * emit
        * */
        $emitNewFilterValues() {
            this.$emit("change", {
                tagSelected: this.$tagSelected,
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