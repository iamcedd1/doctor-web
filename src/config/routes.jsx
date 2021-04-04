import React from "react";

// UTILS
import helpers from "../utils/helpers";
import { Redirect } from "react-router-dom";

// ACCESS CONTROL CONFIGS
import LoginConfig from "../pages/general/login/config/";
import RegisterConfig from "../pages/general/register/config/";
import VerifyUserConfig from "../pages/general/verify-user/config/";
import VerifyAccountConfig from "../pages/general/verify-account/config/";
import ChangePasswordConfig from "../pages/general/change-password/config/";

// FORGOT PASSWORD CONFIGS
import ForgotPasswordConfig from "../pages/general/forgot-password/config/";
import VerifyOtpConfig from "../pages/general/forgot-password/verify-otp/config";
import ResetPasswordConfig from "../pages/general/forgot-password/reset-password/config";

// GENERAL CONFIGS
import DashboardConfig from "../pages/general/dashboard/config/";

// LOAS
import ConfirmAvailmentConfig from "../pages/loas/confirm-availment/config";

// ACCOUNTS
import AddBankInformationConfig from "../pages/profile/banks/add/config/";

// PROFILE
import ViewProfileConfig from "../pages/profile/view/config";

// ERROR CONFIGS
import Page400Config from "../pages/error/page400/config/";
import Page404Config from "../pages/error/page404/config/";
import Page500Config from "../pages/error/page500/config/";

const routeConfigs = [
    // ACCESS CONTROL
    LoginConfig,
    VerifyUserConfig,
    RegisterConfig,
    VerifyAccountConfig,
    ChangePasswordConfig,

    // FORGOT PASSWORD
    VerifyOtpConfig,
    ForgotPasswordConfig,
    ResetPasswordConfig,

    // GENERAL
    DashboardConfig,

    // LOAS
    ConfirmAvailmentConfig,

    // ACCOUNT
    AddBankInformationConfig,

    // PROFILE
    ViewProfileConfig,

    // ERRORS
    Page400Config,
    Page404Config,
    Page500Config,
];

const routes = [
    ...helpers.generateRoutesFromConfigs(routeConfigs),
    {
        // eslint-disable-next-line react/display-name
        component: () => <Redirect to="/errors/404" />,
    },
];

export default routes;
