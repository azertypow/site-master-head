<template>
    <section class="v-page-contact">
        <header-with-text :data="pageContactData.header"></header-with-text>

        <main class="v-page-contact__main">
            <div class="v-page-contact__wrap-content">
                <div class="v-page-contact__links">
                    <h3 class="v-page-contact__links__title" v-if="siteIsFr">liens</h3>
                    <h3 class="v-page-contact__links__title" v-else         >links</h3>
                    <div class="v-page-contact__links__link-wrap" v-html="this.allContacts.about.external_link_about"></div>
                </div>

                <div class="v-page-contact__content">

                    <h3>master media design —HEAD</h3>

                    <div class="v-page-contact__presentation">
                        <template v-if="siteIsFr">
                            <h4>présentation</h4>
                            <div v-html="this.allContacts.about.general_presentation_french">
                            </div>
                        </template>
                        <template v-else>
                            <h4>presentation</h4>
                            <div v-html="this.allContacts.about.general_presentation_english">
                            </div>
                        </template>
                    </div>
                    <div class="v-page-contact__plan">
                        <template v-if="siteIsFr">
                            <h4>plan d'étude</h4>
                            <div v-html="this.allContacts.about.etude_plan_french">
                            </div>
                        </template>
                        <template v-else>
                            <h4>study plan</h4>
                            <div v-html="this.allContacts.about.etude_plan_english">
                            </div>
                        </template>
                    </div>
                    <div class="v-page-contact__information">
                        <template v-if="siteIsFr">
                            <h4>information</h4>
                            <div v-html="this.allContacts.about.general_informations_french">
                            </div>
                        </template>
                        <template v-else>
                            <h4>information</h4>
                            <div v-html="this.allContacts.about.general_informations_english">
                            </div>
                        </template>
                    </div>
                </div>

                <div class="v-page-contact__names">
                    <ul>
                        <li v-for="(team, index) of this.allContacts.team">
                            <a :href="'#team_' + index">
                                <h5>{{team.name_team}}</h5>
                                <p>{{team.position_team}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="v-page-contact__wrap-list">
                <div class="v-page-contact__list-of-team">
                    <div v-for="(team, index) of $listOfTeam">
                        <h3 :id="'team_' + index">{{team.name_team}}</h3>
                        <h4>{{team.position_team}}</h4>
                        <p>{{team.about_team}}</p>
                        <div class="v-page-contact__team-contact">
                            <a :href="team.external_link_team"  >{{cleanUrl(team.external_link_team)}}</a>
                            <a :href="team.email_team"          >{{team.email_team}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="v-page-contact__footer">
            <app-footer :$backgroundIsDark=false></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import {IPageContactData} from "./IPageContactData"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {IAllContacts, ITeamItem} from "../../../api/genericsApiTypesIntefaces"
    @Component({
        components: {
            AppFooter,
            HeaderWithText,
        }
    })
    export default class PageContact extends Vue {
        @Prop({required: true}) data!: IPageContactData
        get pageContactData() {return this.data}

        @Prop({required: true}) $siteLang!: LANG_LIST
        get siteIsFr() { return this.$siteLang === LANG_LIST.FR }

        @Prop({required: true}) allContacts!: IAllContacts
        get $allContacts() { return this.allContacts }

        get $listOfTeam(): ITeamItem[] {
            return this.$allContacts.team
        }

        // noinspection JSMethodCanBeStatic
        cleanUrl(url: string) { return url.replace(/^https?:\/\//,'')}
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-contact {
        @include page-light;

        .header-with-text__text:after {
            content: none;
        }
    }
</style>