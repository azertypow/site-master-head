import {getAllAlumni, getAllProjects, getAllThesis} from "./apiRequestes"
import {createVueApplication, IMainVue} from "./app/createVueApplication"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    allPagesData: {
        home: {
            header: {
                title: {
                    fr: "",
                    en: "",
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
                    fr: "HEAD—genève",
                    en: "HEAD—geneva"
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
                    fr: "HEAD—genève",
                    en: "HEAD—geneva"
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
                    fr: "HEAD—genève",
                    en: "HEAD—geneva"
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
}
