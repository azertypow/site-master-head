import {getAllAlumni, getAllContact, getAllProjects, getAllThesis} from "./apiRequestes"
import {createVueApplication, IMainVue} from "./app/createVueApplication"
import Grid, {GridUi, IGrid, UNIT} from "../Grid"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    allPagesData: {
        home: {
            header: {
                title: {
                    fr: "HEAD—genève master media design",
                    en: "HEAD—geneva"
                },
                images: [
                    "",
                    ""
                ]
            },
        },
        projects: {
            header: {
                title: {
                    fr: "HEAD—<br>media design",
                    en: "HEAD—<br>media design"
                },
                subtitle: {
                    fr: "projets",
                    en: "projects"
                },
                text: {
                    fr: "",
                    en: "",
                },
            },
        },
        alumni: {
            header: {
                title: {
                    fr: "HEAD—<br>media design",
                    en: "HEAD—<br>media design"
                },
                subtitle: {
                    fr: "alumni",
                    en: "alumni"
                },
                text: {
                    fr: "",
                    en: "",
                },
            },
        },
        thesis: {
            header: {
                title: {
                    fr: "HEAD—<br>media design",
                    en: "HEAD—<br>media design"
                },
                subtitle: {
                    fr: "mémoires",
                    en: "thesis"
                },
                text: {
                    fr: "",
                    en: "",
                },
            },
        },
        contact: {
            header: {
                title: {
                    fr: "HEAD—<br>media design",
                    en: "HEAD—<br>media design"
                },
                subtitle: {
                    fr: "contacte",
                    en: "contact"
                },
                text: {
                    fr: "",
                    en: "",
                },
            },
        }
    },
    allProjects: {
        info: {
            text_description_english: "",
            text_description_french: "",
            title: "",
        },
        project: [],
    },
    allAlumni: {
        info: {
            text_description_english: "",
            text_description_french: "",
            title: "",
            url: "",
        },
        alumnis: [],
    },
    allThesis: {
        info: {
            title: "",
            text_description_french: "",
            text_description_english: "",
        },
        thesis: [],
        page: 0,
        pages: 0,
    },
    allContacts: {
        about: {
            etude_plan_english: "",
            etude_plan_french: "",
            external_link_about: "",
            general_informations_english: "",
            general_informations_french: "",
            general_presentation_english: "",
            general_presentation_french: "",
            url: "",
        },
        team: [],
    }
})

loadApplicationData(app)

function loadApplicationData(vueApplication: IMainVue) {

    getAllProjects().then(value => {
        vueApplication.data.allProjects = value
        vueApplication.data.allPagesData.projects.header.text = {
            fr: value.info.text_description_french,
            en: value.info.text_description_english,
        }
    })

    getAllAlumni().then(value => {
        vueApplication.data.allAlumni = value
        vueApplication.data.allPagesData.alumni.header.text = {
            fr: value.info.text_description_french,
            en: value.info.text_description_english,
        }
    })

    getAllThesis().then(value => {
        vueApplication.data.allThesis = value
        vueApplication.data.allPagesData.thesis.header.text = {
            fr: value.info.text_description_french,
            en: value.info.text_description_english,
        }
    })

    getAllContact().then(value => {
        vueApplication.data.allContacts = value
    })
}

// GRID

const gridSettings: IGrid = {
    column: {
        gutterOnOutside: "half gutter",
        gutterWidth: {
            unit: UNIT.PIXEL,
            value: 20,
        },
        numberOfColumn: 12,
        offset: "center",
        totalWidth: {
            value: 100,
            unit: UNIT.PERCENT,
        }
    },
    lineHeight: 20,
    row: false,
    xHeight: 10,
}

const gridPageThesis    = new Grid(document.querySelector(".v-page-thesis")    as HTMLElement, gridSettings);
const gridPageHome      = new Grid(document.querySelector(".v-page-home")      as HTMLElement, gridSettings);
const gridPageProjects  = new Grid(document.querySelector(".v-page-projects")  as HTMLElement, gridSettings);
const gridPageAlumni    = new Grid(document.querySelector(".v-page-alumni")    as HTMLElement, gridSettings);
const gridPageContact   = new Grid(document.querySelector(".v-page-contact")   as HTMLElement, gridSettings);

const gridUi = new GridUi([
    gridPageThesis,
    gridPageHome,
    gridPageProjects,
    gridPageAlumni,
    gridPageContact,
]);