import VerifyOtp from "../index";

// UTILS
import roles from "../../../../../config/roles";

const VerifyOtpConfig = {
    name: "Verify OTP",
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
            path: "/verify-otp",
            component: VerifyOtp,
        },
    ],
};

export default VerifyOtpConfig;
