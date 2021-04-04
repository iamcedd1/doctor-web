import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import { Container, Grid } from "semantic-ui-react";
import HeaderControl from "../components/header-control";

// UTILS
import PropTypes from "prop-types";
import { renderRoutes } from "react-router-config";
import { withRouter, Redirect } from "react-router-dom";

// CONTEXTS
import AppContext from "../../contexts/app";
import UserContext from "../../contexts/user";

const GeneralLayout = ({ location, children, settings }) => {
    // CONTEXTS
    const { routes } = useContext(AppContext);
    const { authenticated } = useContext(UserContext);

    // STATES
    const [withAuthentication, setWithAuthentication] = useState(false);

    // CONSTANTS
    const loc = location.state;
    const path = loc ? (loc.path ? loc.path : "/") : "/";

    // FUNCTIONS
    useEffect(() => {
        const { withAuthentication } = settings;
        setWithAuthentication(withAuthentication);
    }, [settings]);

    return authenticated && withAuthentication ? (
        <Redirect to={path} />
    ) : (
        <div className="mdMainLayout mdGeneralLayout">
            <HeaderControl general />
            <Container>
                <Grid centered padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {renderRoutes(routes)}
                            {children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
};

export default withRouter(GeneralLayout);

GeneralLayout.propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
    settings: PropTypes.object,
};
