import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import { Container, Grid } from "semantic-ui-react";

// DATA
import { HERO_IMAGES } from "../../data/general";

// UTILS
import PropTypes from "prop-types";
import { renderRoutes } from "react-router-config";
import { Redirect, withRouter } from "react-router-dom";

// CONTEXTS
import AppContext from "../../contexts/app";
import UserContext from "../../contexts/user";

const LoginLayout = ({ children, location, settings }) => {
    // CONTEXTS
    const { routes, setPermissions } = useContext(AppContext);
    const { authenticated, handleLogout } = useContext(UserContext);

    // CONSTANTS
    const loc = location.state;
    const path = loc ? (loc.path ? loc.path : "/") : "/";

    // STATES
    const [hero, setHero] = useState("");

    // FUNCTIONS
    useEffect(() => {
        const { code, forceLogout } = settings;

        const heroImages = HERO_IMAGES.filter((item) => item.codes.includes(code));
        const hero = heroImages[0].image;
        setHero(hero);

        if (authenticated && forceLogout) {
            handleLogout();
        }
    }, [settings]);

    useEffect(() => {
        setPermissions([]);
    }, []);

    return authenticated ? (
        <Redirect to={path} />
    ) : (
        <Container fluid>
            <Grid padded columns={2} className="mdGeneralWrapper">
                <Grid.Column computer={7} tablet={16} mobile={16} className="login-container">
                    {renderRoutes(routes)}
                    {children}
                </Grid.Column>
                <Grid.Column
                    computer={9}
                    className="right-container"
                    style={{ backgroundImage: `url('images/hero/${hero}.svg')` }}
                />
            </Grid>
        </Container>
    );
};

export default withRouter(LoginLayout);

LoginLayout.propTypes = {
    location: PropTypes.any,
    children: PropTypes.any,
    settings: PropTypes.object,
};

LoginLayout.defaultProps = {};
