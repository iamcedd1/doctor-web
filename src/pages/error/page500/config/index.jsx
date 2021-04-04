import Page500 from "../index";

// UTILS
import roles from "../../../../config/roles";

const Page500Config = {
    name: "Internal Server Error",
    settings: {
        layout: {
            style: "error",
        },
        title: "Internal Server Error",
    },
    auth: roles.user,
    routes: [
        {
            exact: true,
            path: "/error/500",
            component: Page500,
        },
    ],
};

export default Page500Config;
