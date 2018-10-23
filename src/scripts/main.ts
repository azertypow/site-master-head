import {getAppData} from "./apiRequestes"
import {createVueApplication} from "./app/createVueApplication"
import {DEFAULT_SITE_LANG} from "../SETTINGS"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
    menu: {
        lang: DEFAULT_SITE_LANG,
    },
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
        content: {
            event: [],
            seminary: [],
            workshop: []
        }
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
        content: [
            ""
        ]
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
        content: [
            ""
        ]
    }
})

getAppData().then(
    (value) => {
        console.log(value)
        app.data = value
    }
);
