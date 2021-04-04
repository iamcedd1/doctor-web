import VerifyAccount from "../index";

// UTILS
import roles from "../../../../config/roles";

const VerifyAccountConfig = {
    name: "VerifyAccount",
    settings: {
        code: "VA",
        layout: {
            style: "login",
        },
        forceLogout: true,
    },
    auth: roles.user,
    exact: true,
    routes: [
        {
            exact: true,
            path: "/verify-account",
            component: VerifyAccount,
        },
    ],
};

export default VerifyAccountConfig;
