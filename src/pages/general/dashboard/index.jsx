import React from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import TitleControl from "../../../components/controls/title-control";

// UTILS
import system from "../../../config/system";

// CONTEXTS

const Dashboard = () => {
    return (
        <Grid centered>
            <Grid.Column width={16} textAlign="center">
                <TitleControl>
                    Welcome to
                    <span className={`${system.defaultColor}`}> {system.appName}</span>!
                </TitleControl>
            </Grid.Column>
        </Grid>
    );
};

export default Dashboard;
