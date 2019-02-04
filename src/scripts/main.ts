import {getAllAlumni, getAllContact, getAllProjects, getAllThesis} from "./apiRequestes"
import {createVueApplication, IMainVue} from "./app/createVueApplication"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    allPagesData: {
        home: {
            header: {
                title: {
                    fr: "master<br>media design",
                    en: "master<br>media design"
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
                    fr: "master<br>media design",
                    en: "master<br>media design"
                },
                subtitle: {
                    fr: "projets",
                    en: "projects"
                },
                // text: {
                //     fr: "",
                //     en: "",
                // },
            },
        },
        alumni: {
            header: {
                title: {
                    fr: "master<br>media design",
                    en: "master<br>media design"
                },
                subtitle: {
                    fr: "alumni",
                    en: "alumni"
                },
                // text: {
                //     fr: "",
                //     en: "",
                // },
            },
        },
        thesis: {
            header: {
                title: {
                    fr: "master<br>media design",
                    en: "master<br>media design"
                },
                subtitle: {
                    fr: "mémoires",
                    en: "thesis"
                },
                // text: {
                //     fr: "",
                //     en: "",
                // },
            },
        },
        contact: {
            header: {
                title: {
                    fr: "master<br>media design",
                    en: "master<br>media design"
                },
                subtitle: {
                    fr: "contacts et informations",
                    en: "contacts and informations"
                },
                // text: {
                //     fr: "",
                //     en: "",
                // },
            },
        }
    },
    allProjects: {
        info: {
            // text_description_english: "",
            // text_description_french: "",
            title: "",
        },
        project: [],
    },
    allAlumni: {
        info: {
            // text_description_english: "",
            // text_description_french: "",
            title: "",
            url: "",
        },
        alumnis: [],
    },
    allThesis: {
        info: {
            title: "",
            // text_description_french: "",
            // text_description_english: "",
        },
        thesis: [],
        page: 0,
        pages: 0,
    },
    allContacts: {
        about: {
            // etude_plan_english: "",
            // etude_plan_french: "",
            // general_informations_english: "",
            // general_informations_french: "",
            general_presentation_english: "",
            general_presentation_french: "",
            url: "",
        },
        team: [],
        links: [],
    }
})

loadApplicationData(app)

function loadApplicationData(vueApplication: IMainVue) {

    getAllProjects().then(value => {
        vueApplication.data.allProjects = value
        // vueApplication.data.allPagesData.projects.header.text = {
        //     fr: value.info.text_description_french,
        //     en: value.info.text_description_english,
        // }
    })

    getAllAlumni().then(value => {
        vueApplication.data.allAlumni = value
        // vueApplication.data.allPagesData.alumni.header.text = {
        //     fr: value.info.text_description_french,
        //     en: value.info.text_description_english,
        // }
    })

    getAllThesis().then(value => {
        vueApplication.data.allThesis = value
        // vueApplication.data.allPagesData.thesis.header.text = {
        //     fr: value.info.text_description_french,
        //     en: value.info.text_description_english,
        // }
    })

    getAllContact().then(value => {
        vueApplication.data.allContacts = value
    })
}

// GRID

// import Grid, {GridUi, IGrid, UNIT} from "../Grid"
//
// const gridSettings: IGrid = {
//     column: {
//         gutterOnOutside: "half gutter",
//         gutterWidth: {
//             unit: UNIT.PIXEL,
//             value: 36,
//         },
//         numberOfColumn: 12,
//         offset: "center",
//         totalWidth: {
//             value: 100,
//             unit: UNIT.PERCENT,
//         }
//     },
//     lineHeight: 36/2,
//     row: false,
//     xHeight: 15,
// }
//
// // medium
// gridSettings.xHeight = 12
//
// const gridUi = new GridUi([
//     new Grid(document.querySelector(".v-page-thesis")    as HTMLElement, gridSettings),
//     new Grid(document.querySelector(".v-page-home")      as HTMLElement, gridSettings),
//     new Grid(document.querySelector(".v-page-projects")  as HTMLElement, gridSettings),
//     new Grid(document.querySelector(".v-page-alumni")    as HTMLElement, gridSettings),
//     new Grid(document.querySelector(".v-page-contact")   as HTMLElement, gridSettings),
//     // new Grid(document.querySelector("body")   as HTMLElement, gridSettings),
// ]);