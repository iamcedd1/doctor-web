import Login from "../index";

// UTILS
import roles from "../../../../config/roles";

const LoginConfig = {
    name: "Login",
    settings: {
        code: "LGN",
        layout: {
            style: "login",
        },
    },
    auth: roles.user,
    exact: true,
    routes: [
        {
            exact: true,
            path: "/login",
            component: Login,
        },
    ],
};

export default LoginConfig;
