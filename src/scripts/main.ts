import {getAllAlumni, getAllPagesData, getAllProjects} from "./apiRequestes"
import {createVueApplication, IMainVue} from "./app/createVueApplication"
import {DEFAULT_SITE_LANG} from "../SETTINGS"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    allPagesData: {
        home: {
            header: {
                title: {
                    en: "",
                    fr: ""
                },
                images: [
                    "",
                    ""
                ]
            },
        },
        projects: {
            header: {
                text: {
                    fr: "",
                    en: "",
                },
                subtitle: {
                    fr: "",
                    en: "",
                },
                title: {
                    fr: "",
                    en: "",
                }
            },
        },
        alumni: {
            header: {
                text: {
                    fr: "",
                    en: "",
                },
                subtitle: {
                    fr: "",
                    en: "",
                },
                title: {
                    fr: "",
                    en: "",
                }
            },
        },
        thesis: {
            header: {
                text: {
                    fr: "",
                    en: "",
                },
                subtitle: {
                    fr: "",
                    en: "",
                },
                title: {
                    fr: "",
                    en: "",
                }
            },
        },
        contact: {
            header: {
                text: {
                    fr: "",
                    en: "",
                },
                subtitle: {
                    fr: "",
                    en: "",
                },
                title: {
                    fr: "",
                    en: "",
                }
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
    }
})

loadApplicationData(app)

function loadApplicationData(vueApplication: IMainVue) {

    getAllPagesData().then(value => {
            vueApplication.data.allPagesData = value
        }
    );

    getAllProjects().then(value => {
        vueApplication.data.allProjects = value
    })

    getAllAlumni().then(value => {
        vueApplication.data.allAlumni = value
    })
}
