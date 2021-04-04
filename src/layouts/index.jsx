import React, { useContext } from "react";

// UTILS
import { matchRoutes } from "react-router-config";
import { withRouter, Redirect } from "react-router-dom";

// COMPONENTS
import Layouts from "./layouts";

// CONTEXTS
import AppContext from "../contexts/app";

const LayoutHandler = ({ location, props }) => {
    const { routes } = useContext(AppContext);

    const getRouteSettings = () => {
        const matched = matchRoutes(routes, location.pathname)[0];

        if (matched && matched.route.settings) {
            return { ...matched.route.settings, auth: matched.route.auth, match: matched.match };
        } else {
            return null;
        }
    };

    const settings = getRouteSettings();

    if (settings && settings.layout && settings.layout.style) {
        const Layout = Layouts[settings.layout.style];

        return <Layout settings={settings} {...props} />;
    } else {
        return <Redirect to={{ pathname: "/error/404", state: { path: location.pathname } }} />;
    }
};

export default withRouter(LayoutHandler);
