import ResetPassword from "../index";

// UTILS
import roles from "../../../../../config/roles";

const ResetPasswordConfig = {
    name: "Reset Password",
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
            path: "/reset-password",
            component: ResetPassword,
        },
    ],
};

export default ResetPasswordConfig;
