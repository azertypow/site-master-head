import {getAllAlumni, getAllContact, getAllProjects, getAllThesis, getHomeData} from "./apiRequestes"
import {createVueApplication, IMainVue} from "./app/createVueApplication"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    allPagesData: {
        home: {
            url: undefined,
            project_to_show_in_home: [],
        },
        projects: {
            title_en: "",
            title_fr: "",
            url: "",
        },
        thesis: {
            title_en: "",
            title_fr: "",
            url: "",
        },
        contact: {
            title_en: "",
            title_fr: "",
            url: "",
        },
        alumni: {
            title_en: "",
            title_fr: "",
            url: "",
        }
    },
    allProjects: {
        info: {
            title_en: "",
            title_fr: "",
            url: ""
        },
        project: [],
    },
    allAlumni: {
        info: {
            title_en: "",
            title_fr: "",
            url: "",
        },
        alumnis: [],
    },
    allThesis: {
        info: {
            url: "",
            title_fr: "",
            title_en: ""
        },
        thesis: [],
        page: 0,
        pages: 0,
    },
    allContacts: {
        about: {
            general_presentation_english: "",
            general_presentation_french: "",
            url: "",
        },
        team: [],
        links: [],
        intervenants: [],
    }
})

loadApplicationData(app)

function loadApplicationData(vueApplication: IMainVue) {

    getHomeData().then(value => {
        vueApplication.data.allPagesData.home = value
    })

    getAllProjects().then(value => {
        vueApplication.data.allProjects = value
    })

    getAllAlumni().then(value => {
        vueApplication.data.allAlumni = value
    })

    getAllThesis().then(value => {
        vueApplication.data.allThesis = value
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