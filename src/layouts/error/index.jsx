import React, { useContext } from "react";

// UTILS
import { renderRoutes } from "react-router-config";

// COMPONENTS
import { Container, Grid } from "semantic-ui-react";
import HeaderControl from "../components/header-control";

// CONTEXTS
import AppContext from "../../contexts/app";

const Layout = ({ children }) => {
    // CONTEXTS
    const { routes } = useContext(AppContext);

    return (
        <div className="mdMainLayout mdErrorLayout">
            <HeaderControl general withMenu />
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

export default Layout;
