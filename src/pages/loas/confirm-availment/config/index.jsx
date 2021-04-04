import ConfirmAvailment from "../index";

// UTILS
import { Link } from "react-router-dom";
import roles from "../../../../config/roles";

// CONTEXTS
import { LoaProvider } from "../../../../contexts/loas";

const ConfirmAvailmentConfig = {
    name: "LOAS",
    settings: {
        layout: {
            style: "main",
        },
        code: "LOAS",
        title: "Confirm Availment",
        breadcrumbs: [
            {
                key: "HOME",
                content: "HOMEPAGE",
                link: true,
                active: true,
                as: Link,
                to: "/",
            },
            {
                key: "TR",
                content: "SEARCH TRANSACTIONS",
                link: true,
                active: true,
                as: Link,
                to: "/profile/transactions",
            },
            {
                key: "CA",
                content: "CONFIRM AVAILMENT",
                link: false,
                active: true,
                as: "span",
                to: "/profile/transactions/confirm-availment",
            },
        ],
        bankPrompt: true,
        bankWarning: false,
        context: LoaProvider,
        enableAccess: ["DEV", "IST", "UAT"],
    },
    auth: roles.generalAccess,
    routes: [
        {
            exact: true,
            path: "/profile/transactions/confirm-availment",
            component: ConfirmAvailment,
        },
    ],
};

export default ConfirmAvailmentConfig;
