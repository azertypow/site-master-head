<template>
    <section class="v-page-contact">
        <header-with-text :data="pageContactData.header"></header-with-text>

        <main class="v-page-contact__main">
            <div class="v-page-contact__wrap-content">
                <aside class="v-page-contact__aside">

                    <div class="v-page-contact__links">
                        <h4         class="v-page-contact__links__title" v-if="siteIsFr">liens</h4>
                        <h4         class="v-page-contact__links__title" v-else         >links</h4>

                        <div        class="v-page-contact__links__link-wrap">
                            <div    class="v-page-contact__links-item"
                                    v-for="link of $listOfLinks">
                                <a  :href="link.link_value"
                                    target="_blank">{{link.title}}</a>
                            </div>
                        </div>
                    </div>

                    <div class="v-page-contact__names">
                        <h4         class="v-page-contact__names__title" v-if="siteIsFr">Equipe</h4>
                        <h4         class="v-page-contact__names__title" v-else         >links</h4>

                        <div        class="v-page-contact__names__link-wrap">
                            <div    class="v-page-contact__names-item"
                                    v-for="(team, index) of this.allContacts.team">
                                <a :href="'#team_' + index">{{team.name_team}}</a>
                            </div>
                        </div>
                    </div>

                </aside>

                <div class="v-page-contact__content">

                    <div    v-if="siteIsFr"
                            class="mmd-content"
                            v-html="this.allContacts.about.general_presentation_french"></div>

                    <div    v-else
                            class="mmd-content"
                            v-html="this.allContacts.about.general_presentation_english">
                    </div>

                </div>
            </div>

            <div class="v-page-contact__team">

                <div class="v-page-contact__team-content">

                    <div class="v-page-contact__wrap-list">

                        <div v-for="(team, index) of $listOfTeam" class="v-page-contact__list-item">

                            <div class="mmd-content mmd-id-cartel">
                                <h4 class="mmd-id-cartel_title"
                                    :id="'team_' + index">{{team.name_team}}</h4>

                                <h5 class="mmd-id-cartel_post">{{team.position_team}}</h5>

                                <p  class="mmd-id-cartel_desc" v-if="team.about_team">{{team.about_team}}</p>

                                <div class="mmd-id-cartel_contact">
                                    <a class="mmd-id-cartel_link" v-if="team.external_link_team"    :href="team.external_link_team"  >{{cleanUrl(team.external_link_team)}}</a>
                                    <a class="mmd-id-cartel_link" v-if="team.email_team"            :href="'mailto:' + team.email_team"          >{{team.email_team}}</a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </main>

        <footer class="v-page-contact__footer">
            <app-footer
                    :$siteLang="$siteLang"
                    :$backgroundIsDark=false></app-footer>
        </footer>
    </section>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator"
    import HeaderWithText from "../../components/header/HeaderWithText"
    import {IPageContactData} from "./IPageContactData"
    import AppFooter from "../../components/appFooter/AppFooter.vue"
    import {LANG_LIST} from "../../../GLOBAL_ENUMS"
    import {IAllContacts, ILinkItem, ITeamItem} from "../../../api/genericsApiTypesIntefaces"
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

        get $listOfLinks(): ILinkItem[] {
            return this.$allContacts.links
        }

        // noinspection JSMethodCanBeStatic
        cleanUrl(url: string) { return url.replace(/^https?:\/\//,'')}
    }
</script>

<style lang="scss">
    @import "../../../../styles/pages";

    .v-page-contact {
        @include page-light;
    }

    .v-page-contact__main {
        @include column(12, 12);
        padding: 0;
    }

    .v-page-contact__wrap-content {
        @include row-container--revers;

        @media (min-width: $break-medium) {
            @include column-container;
        }
    }

    .v-page-contact__content {
        @include column(12, 12);
        @include gutter;

        @media (min-width: $break-extra-small) {
            @include column(11, 12);
        }

        @media (min-width: $break-regular) {
            @include column(21, 24);
            @include column-skip(1, 12);
        }

        @media (min-width: $break-medium) {
            @include column(17, 24);
            @include column-skip(0, 24);
        }

        @media (min-width: $break-large) {
            @include column(8, 12);
            @include column-skip(1, 24);
        }

        .mmd-content {
            > *:first-child {
                margin-top: 2rem;
            }

            > h1:first-child,
            > h2:first-child {
                margin-top: 0;
            }

            > h3:first-child {
                margin-top: 1rem;
            }
        }
    }

    .v-page-contact__links__link-wrap,
    .v-page-contact__names__link-wrap {
        @include column-container;

        font-size: .75em;
        padding-top: 8px;
        padding-bottom: 10px;

        a {
            background: none;
        }
    }

    .v-page-contact__links__title,
    .v-page-contact__names__title {
        margin: 0;
        padding-bottom: 4px;
    }

    .v-page-contact__links-item,
    .v-page-contact__names-item {
        font-size: $font-medium-size--reg;
        margin-right: 30px;
        margin-bottom: 1rem;

        @media (min-width: $break-medium) {
            margin-right: 0;
            margin-bottom: 0;
            margin-top: 1rem;
            width: 100%;
        }
    }

    .v-page-contact__aside {
        @include column(12, 12);
        @include gutter;
        padding-top: 4rem;

        @media (min-width: $break-extra-small) {
        }

        @media (min-width: $break-regular) {
            @include column-skip(1, 12);
            @include column(21, 24);
            padding-top: 2rem;
        }

        @media (min-width: $break-medium) {
            @include column-skip(0, 12);
            @include column(5, 24);
        }
    }

    .v-page-contact__names,
    .v-page-contact__links {
        padding-bottom: 6px;
    }

    .v-page-contact__names {
        margin-top: 3rem;
    }

    .v-page-contact__team {
        @include column-container;
        margin-top: 3rem;

        @media (min-width: $break-medium) {
            margin-top: 10rem;
        }
    }

    .v-page-contact__team-content {
        @include column(1, 1);

        @media (min-width: $break-extra-small) {
            @include column(11, 12);
        }

        @media (min-width: $break-regular) {
            @include column(22, 24);
            @include column-skip(1,24);
        }

        @media (min-width: $break-medium) {
            @include column(1, 1);
            @include column-skip(0,24);
        }
    }

    .v-page-contact__wrap-list {
        @include column-container;
    }

    .v-page-contact__list-item {
        @include column(1, 1);
        @include gutter;

        margin-top: 5rem;


        @media (min-width: $break-small) {
            @include column(1, 2);

            &:nth-child(1),
            &:nth-child(2) {
                margin-top: 0;
            }
        }

        @media (min-width: $break-medium) {
            @include column(1, 3);

            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
                margin-top: 0;
            }
        }
    }

</style>