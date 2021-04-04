import ForgotPassword from "../index";

// UTILS
import roles from "../../../../config/roles";

const ForgotPasswordConfig = {
    name: "Forgot Password",
    settings: {
        layout: {
            style: "general",
        },
        withAuthentication: true,
    },
    auth: roles.generalAccess,
    routes: [
        {
            exact: true,
            path: "/forgot-password",
            component: ForgotPassword,
        },
    ],
};

export default ForgotPasswordConfig;
