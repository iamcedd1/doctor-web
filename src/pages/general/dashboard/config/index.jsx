import Dashboard from "../index";

// UTILS
import roles from "../../../../config/roles";

// CONTEXTS
import { GeneralProvider } from "../../../../contexts/general";

const DashboardConfig = {
    name: "Dashboard",
    settings: {
        layout: {
            style: "main",
        },
        code: "DSB",
        bankPrompt: false,
        bankWarning: true,
        context: GeneralProvider,
        enableAccess: ["DEV", "IST", "UAT", "STG", "PRD"],
    },
    auth: roles.generalAccess,
    routes: [
        {
            path: "/",
            exact: true,
            component: Dashboard,
        },
    ],
};

export default DashboardConfig;
