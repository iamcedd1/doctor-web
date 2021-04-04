import ViewProfile from "../index";

// UTILS
import { Link } from "react-router-dom";
import roles from "../../../../config/roles";

// CONTEXTS
import { ProfileProvider } from "../../../../contexts/profile";

const ViewProfileConfig = {
    name: "View Profile",
    settings: {
        layout: {
            style: "main",
        },
        code: "PRF",
        breadcrumbs: [
            {
                key: "Home",
                content: "HOMEPAGE",
                link: true,
                active: true,
                as: Link,
                to: "/",
            },
            {
                key: "Profile",
                content: "PROFILE",
                link: false,
                active: true,
                as: "span",
                to: "/loas",
            },
        ],
        bankPrompt: true,
        bankWarning: false,
        context: ProfileProvider,
        enableAccess: ["DEV", "IST", "UAT"],
    },
    auth: roles.generalAccess,
    routes: [
        {
            exact: true,
            path: "/profile/",
            component: ViewProfile,
        },
        {
            exact: true,
            path: "/profile/:page",
            component: ViewProfile,
        },
        {
            exact: true,
            path: "/profile/transactions/:code/view",
            component: ViewProfile,
        },
    ],
};

export default ViewProfileConfig;
