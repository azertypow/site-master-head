<template>
    <section id="filterSetting">
        <div>show</div>

        <!--tag filter-->
        <ul class="" v-if="$hasTextInsteadTagList">
            <li v-for="tag in $tags">
                {{tag}}
            </li>
        </ul>
        <div v-else>
            {{$textInsteadTagList}}
        </div>

        <!--data filter - from-->
        <div>
            from
        </div>
        <ul>
            <template v-for="(date, index) in $dates" >
                <li @click="$indexOf_Min_DateSelected = index" :class="{isSelected: this_Min_DateIsSelected(index)}">
                    {{date}}
                </li>
            </template>
        </ul>

        <!--data filter - to-->
        <div>
            to
        </div>
        <ul>
            <template v-for="(date, index) in $dates" >
                <li @click="$indexOf_Max_DateSelected = index" :class="{isSelected: this_Max_DateIsSelected(index)}">
                    {{date}}
                </li>
            </template>
        </ul>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"

    @Component({
        watch: {
            $dates: function() {
                (this as FilterSetting).$indexOf_Max_DateSelected = (this as FilterSetting).$dates.length - 1
            }
        }
    })
    export default class FilterSetting extends Vue {
        @Prop() $textInsteadTagList!: string
        @Prop({default: () => []}) $tags!: string[]
        @Prop({default: () => []}) $dates!: number[]

        /*
        * minimum date selection
        * */
        indexOf_Min_DateSelected = 0
        set $indexOf_Min_DateSelected(index: number) {
            this.indexOf_Min_DateSelected = index
        }
        get $indexOf_Min_DateSelected() {
            return this.indexOf_Min_DateSelected
        }

        this_Min_DateIsSelected(index: number) {
            return this.indexOf_Min_DateSelected === index
        }
        
        /*
        *maximum date selection 
        * */
        indexOf_Max_DateSelected = this.$dates.length
        set $indexOf_Max_DateSelected(index: number) {
            this.indexOf_Max_DateSelected = index
        }
        get $indexOf_Max_DateSelected() {
            return this.indexOf_Max_DateSelected
        }

        this_Max_DateIsSelected(index: number) {
            return this.indexOf_Max_DateSelected === index
        }
        
        get $hasTextInsteadTagList() {
            return this.$textInsteadTagList === void 0
        }
    }
</script>

<style lang="scss">
    #filterSetting {
        .isSelected {
            color: red;
        }
    }
</style>