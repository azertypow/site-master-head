<template>
    <section id="filterSetting">
        <ul v-if="$hasTextInsteadTagList">
            <li v-for="tag in $tags">
                {{tag}}
            </li>
        </ul>
        <div v-else>
            {{$textInsteadTagList}}
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"

    @Component
    export default class FilterSetting extends Vue {
        @Prop() $textInsteadTagList!: string
        @Prop({default: () => []}) $tags!: string

        get $hasTextInsteadTagList() {
            return this.$textInsteadTagList === void 0
        }

    }
</script>

<style lang="scss">
    #filterSetting {

    }
</style>