<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <section id="md-app">
        <app-header :name="name" :currentPageName="currentPageName"/>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <h1>Hello Decorator Component</h1>
        <hello-decorator :name="name" :initialEnthusiasm="5" />
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import AppHeader from "./components/AppHeader"
    import HelloDecorator from "./components/HelloDecorator"
    import {ClassNames} from "../ClassNames"

    @Component ({
        components: {
            HelloDecorator,
            AppHeader,
        }
    })
    export default class MDApp extends Vue {
        name = 'Coucou'
        @Prop() currentPageName!: ClassNames
    }
</script>

<style lang="scss">
    #md-app {

    }
</style>