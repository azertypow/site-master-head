import {getAppData} from "./apiRequestes"
import {createVueApplication} from "./app/createVueApplication"
import {DEFAULT_SITE_LANG} from "../SETTINGS"

console.log("%c=== head media design <3 ===", "color: hotpink")

let app = createVueApplication({
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
    }
})

getAppData().then(
    (value) => {
        console.log(value)
        app.data = value
    }
);
