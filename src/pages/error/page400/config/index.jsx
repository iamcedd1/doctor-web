import Page400 from "../index";

// UTILS
import roles from "../../../../config/roles";

const Page400Config = {
    name: "Bad Request",
    settings: {
        layout: {
            style: "error",
        },
        title: "Bad Request",
    },
    auth: roles.user,
    routes: [
        {
            exact: true,
            path: "/error/400",
            component: Page400,
        },
    ],
};

export default Page400Config;
