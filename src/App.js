import React, { useEffect, useContext } from "react";

// CONTEXTS
import UserContext from "./contexts/user";

// COMPONENTS
import LayoutHandler from "./layouts";

// UTILS
import { api } from "./utils/api";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// STYLES
import "semantic-ui-less/semantic.less";
import "animate.css/animate.min.css";
import "./styles/scss/index.scss";

const App = ({ location, history }) => {
    const { authenticated, clearUser } = useContext(UserContext);

    useEffect(() => {
        async function handlePermissions() {
            const res = await api.sso.PostMethod("/validate_token");
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    clearUser({});
                    history.push("/login");
                }
            } else if (status === 403) {
                clearUser({});
                history.push("/error/403");
            } else {
                clearUser({});
                history.push("/error/500");
            }
        }

        const token = localStorage.getItem("access_token");
        if (authenticated && token) {
            handlePermissions();
        }
    }, [location, authenticated]);

    return <LayoutHandler />;
};

export default withRouter(App);

App.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
