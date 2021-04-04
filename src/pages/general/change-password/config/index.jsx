import ChangePassword from "../index";

// UTILS
import { Link } from "react-router-dom";
import roles from "../../../../config/roles";

// CONTEXTS
import { GeneralProvider } from "../../../../contexts/general";

const ChangePasswordConfig = {
    name: "Change Password",
    settings: {
        layout: {
            style: "main",
        },
        title: "Change Password",
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
                key: "ChangePassword",
                content: "CHANGE PASSWORD",
                active: true,
                as: "span",
                to: "/",
            },
        ],
        context: GeneralProvider,
    },
    auth: roles.generalAccess,
    routes: [
        {
            exact: true,
            path: "/change-password",
            component: ChangePassword,
        },
    ],
};

export default ChangePasswordConfig;
