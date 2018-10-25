<template>
    <section id="page-home">
        <app-header-with-image
                :data="data.header" />
        <main>
            <section id="page-home-workshop">
                <header>
                    <h2 v-if="siteIsFr" >workshops</h2>
                    <h2 v-else          >workshops</h2>
                </header>

                <template v-for="workshop in $homeProjects.workshops">
                    <project :data="workshop"></project>
                </template>
            </section>

            <section id="page-home-seminars">
                <header>
                    <h2 v-if="siteIsFr" >séminaires</h2>
                    <h2 v-else          >seminars</h2>
                </header>

                <template v-for="seminars in $homeProjects.seminars">
                    <project :data="seminars"></project>
                </template>
            </section>

            <section id="page-home-events">
                <header>
                    <h2 v-if="siteIsFr" >évènements</h2>
                    <h2 v-else          >events</h2>
                </header>

                <template v-for="events in $homeProjects.events">
                    <project :data="events"></project>
                </template>
            </section>

        </main>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import AppHeaderWithImage from '../../components/header/HeaderWithImage'
    import {IPageHomeData} from "./IPageHomeData"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import Project from "../../components/project/Project"
    import {getHomeProjectsData} from "../../../apiRequestes"
    import {IHomeProjectsData} from "../../IHomeProjectsData"

    @Component({
        components: {
            Project,
            AppHeaderWithImage,
        }
    })
    export default class PageHome extends Vue {
        constructor() {
            super()
            getHomeProjectsData().then((homeProjectsData) => {
                this.$homeProjects = homeProjectsData
            })
        }

        @Prop({required: true}) data!: IPageHomeData
        @Prop({required: true}) $siteLang!: LANG_LIST

        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }
        get siteIsEn() { return this.$siteLang === LANG_LIST.EN }

        /*
        * array of projects present in home page
        * */
        private homeProjects: IHomeProjectsData = {
            events: [],
            seminars: [],
            workshops: [],
        }
        set $homeProjects(value: IHomeProjectsData) {
            this.pushArrayInArray(value.workshops, this.homeProjects.workshops)
            this.pushArrayInArray(value.seminars, this.homeProjects.seminars)
            this.pushArrayInArray(value.events, this.homeProjects.events)
        }
        get $homeProjects() {
            return this.homeProjects
        }

        pushArrayInArray(arrayToAdd: Array<any>, arrayToExtend: Array<any>) {
            for(const value of arrayToAdd) {
                console.log(value)
                arrayToExtend.push(value);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/_params";
    @import "../../../../styles/pages";

    #page-home {
        @include page-dark;
    }
</style>