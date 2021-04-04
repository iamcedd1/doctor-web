import VerifyUser from "../index";

// UTILS
import roles from "../../../../config/roles";

const VerifyUserConfig = {
    name: "VerifyUser",
    settings: {
        code: "VU",
        layout: {
            style: "login",
        },
    },
    auth: roles.user,
    exact: true,
    routes: [
        {
            exact: true,
            path: "/verify-user",
            component: VerifyUser,
        },
    ],
};

export default VerifyUserConfig;
