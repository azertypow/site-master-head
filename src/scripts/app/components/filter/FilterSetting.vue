<template>
    <section id="filterSetting">
        <template>
            <div v-if="siteIsEn">show</div>
            <div v-else         >montrer les</div>
        </template>

        <!--tag filter-->
        <ul class="" v-if="$hasTextInsteadTagList">
            <template v-for="(tag, index) in $tags" >
                <li @click="$indexOf_Tag_Selected = index" :class="{isSelected: this_Tag_IsSelected(index)}">
                    {{tag}}
                </li>
            </template>
        </ul>
        <div v-else>
            {{$textInsteadTagList}}
        </div>

        <!--data filter - from-->
        <template>
            <div v-if="siteIsEn">from</div>
            <div v-else         >de</div>
        </template>
        <ul>
            <template v-for="(date, index) in $dates" >
                <li @click="$indexOf_Min_DateSelected = index"
                    :class="{isSelected: $thisIs_min_dateSelected(index)}" >
                    {{date}}
                </li>
            </template>
        </ul>

        <!--data filter - to-->
        <template>
            <div v-if="siteIsEn">to</div>
            <div v-else         >à</div>
        </template>
        <ul>
            <template v-for="(date, index) in $dates" >
                <li @click="$indexOf_Max_DateSelected = index"
                    :class="{isSelected: $thisIs_max_dateSelected(index)}" >
                    {{date}}
                </li>
            </template>
        </ul>
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
        set $indexOf_Tag_Selected(index: number) {
            this.indexOf_Tag_Selected = index
        }
        get $indexOf_Tag_Selected() {
            return this.indexOf_Tag_Selected
        }

        this_Tag_IsSelected(index: number) {
            return this.indexOf_Tag_Selected === index
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

            this.$emitNewFilterValues()
        }

        get $min_dateSelected() {
            return this.$dates[this.$indexOf_Min_DateSelected]
        }

        $thisIs_min_dateSelected(index: number) {
            return this.indexOf_Min_DateSelected === index
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

            this.$emitNewFilterValues()
        }

        get $max_dateSelected() {
            return this.$dates[this.$indexOf_Max_DateSelected]
        }

        $thisIs_max_dateSelected(index: number) {
            return this.indexOf_Max_DateSelected === index
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
    #filterSetting {
        user-select: none;

        .isSelected {
            color: red;
        }
    }
</style>