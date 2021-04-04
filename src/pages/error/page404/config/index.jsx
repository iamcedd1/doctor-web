import Page404 from "../index";

// UTILS
import roles from "../../../../config/roles";

const Page404Config = {
    name: "Page Not Found",
    settings: {
        layout: {
            style: "error",
        },
        title: "Page Not Found",
    },
    auth: roles.user,
    routes: [
        {
            exact: true,
            path: "/error/404",
            component: Page404,
        },
    ],
};

export default Page404Config;
