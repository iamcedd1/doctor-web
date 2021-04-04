import AddBankInformation from "../index";

// UTILS
import { Link } from "react-router-dom";
import roles from "../../../../../config/roles";

// CONTEXTS
import { AccountProvider } from "../../../../../contexts/account";

const AddBankInformationConfig = {
    name: "BANK INFORMATION",
    settings: {
        layout: {
            style: "main",
        },
        code: "BNK",
        title: "Add Bank Information",
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
                to: "/",
            },
            {
                key: "BNK",
                content: "BANK INFORMATION",
                link: false,
                active: true,
                as: "span",
                to: "/profile/add-information",
            },
        ],
        bankPrompt: false,
        bankWarning: false,
        context: AccountProvider,
    },
    auth: roles.generalAccess,
    routes: [
        {
            exact: true,
            path: "/profile/banks/add",
            component: AddBankInformation,
        },
    ],
};

export default AddBankInformationConfig;
