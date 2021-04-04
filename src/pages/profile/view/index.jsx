import React, { useState, useContext, useEffect } from "react";

// COMPONENTS
import { Grid, Divider } from "semantic-ui-react";
import UserAvatar from "../../../components/user/user-avatar";
import TitleControl from "../../../components/controls/title-control";
import DimmerControl from "../../../components/controls/dimmer-control";
import BoxContainer from "../../../components/controls/container/box-container";
import PanelActionControl from "../../../components/panel/panel-action-control";
import ResponsiveControl from "../../../components/controls/responsive-control";
import GridContainer from "../../../components/controls/container/grid-container";

// CONTEXTS
import UserContext from "../../../contexts/user";

// DATA
import { PROFILE_TABS } from "../../../data/profile";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const ViewProfile = ({ history, match }) => {
    // CONTEXTS
    const { currentUser } = useContext(UserContext);

    // STATES
    const [tab, setTab] = useState("GI");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("GI");

    // FUNCTIONS
    const handleTabs = (type = "") => {
        return PROFILE_TABS.filter(({ visible }) => visible).map((item) => {
            const url = item.mobileName?.toLowerCase();
            const name = type === "M" ? item.mobileName : item.name;
            return (
                <PanelActionControl
                    text={name}
                    key={item.code}
                    icon={item.icon}
                    iconPosition="right"
                    selected={item.code === activeTab}
                    handleClick={() => history.push(`/profile/${url}`)}
                />
            );
        });
    };

    useEffect(() => {
        if (match.params?.page) {
            const currentTab = PROFILE_TABS.find(
                ({ mobileName }) => mobileName.toLowerCase() === match.params?.page
            );

            if (currentTab) {
                setTab(currentTab?.code);
                setActiveTab(currentTab?.code);
            } else {
                history.push(`${match.path.replace(":page", "general")}`);
            }
        } else {
            if (match.params?.code) {
                setTab("VTR");
                setActiveTab("TR");
            } else {
                history.push("/profile/general");
            }
        }

        setLoading(false);
    }, [match]);

    return (
        <Grid>
            {loading && <DimmerControl />}
            <Grid.Row>
                <Grid.Column widescreen={3} computer={4} tablet={16} mobile={16}>
                    <BoxContainer className="mdMarginBottom-16" centered>
                        <UserAvatar name="profile" size="large" />
                        <TitleControl
                            size="large"
                            className="mdUserName mdMarginTop-16"
                            title={`Dr. ${currentUser?.name}`}
                        />
                    </BoxContainer>
                    <ResponsiveControl
                        as={BoxContainer}
                        padded="vertical"
                        type="mobile"
                        width="max"
                    >
                        <GridContainer columns={2}>{handleTabs("M")}</GridContainer>
                    </ResponsiveControl>
                    <ResponsiveControl type="tablet" width="min">
                        <ResponsiveControl
                            as={BoxContainer}
                            padded="vertical"
                            type="tablet"
                            width="max"
                        >
                            <GridContainer columns={2}>{handleTabs()}</GridContainer>
                        </ResponsiveControl>
                        <ResponsiveControl as={BoxContainer} padded="vertical">
                            {handleTabs()}
                        </ResponsiveControl>
                    </ResponsiveControl>
                </Grid.Column>
                <Grid.Column tablet={16} mobile={16} computer={12} widescreen={13}>
                    {PROFILE_TABS.find(({ code }) => code === tab)?.view}
                </Grid.Column>
                <Divider />
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(ViewProfile);

ViewProfile.propTypes = {
    history: PropTypes.any,
    match: PropTypes.object,
};

ViewProfile.defaultProps = {};
