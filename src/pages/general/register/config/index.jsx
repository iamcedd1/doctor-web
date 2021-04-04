import Register from "../index";

// UTILS
import roles from "../../../../config/roles";

const RegisterConfig = {
    name: "Register",
    settings: {
        code: "RGS",
        layout: {
            style: "login",
        },
    },
    auth: roles.user,
    exact: true,
    routes: [
        {
            exact: true,
            path: "/register",
            component: Register,
        },
    ],
};

export default RegisterConfig;
