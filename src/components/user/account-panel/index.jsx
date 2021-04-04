import React, { Fragment, useContext, lazy, useState } from "react";

// COMPONENTS
import UserAvatar from "../user-avatar";
import TitleControl from "../../controls/title-control";
import ButtonControl from "../../controls/button-control";
import { Sidebar, Menu, Divider } from "semantic-ui-react";
import SuspenseControl from "../../controls/suspense-control";
import PanelActionControl from "../../panel/panel-action-control";
import BoxContainer from "../../controls/container/box-container";

// CONTEXTS
import AppContext from "../../../contexts/app";
import UserContext from "../../../contexts/user";

// DATA
import { PANEL_ITEMS } from "../../../data/general";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// MODALS
const TermsAndConditions = lazy(() => import("../../../modals/profile/terms-and-conditions"));

const AccountPanel = ({ theme, history }) => {
    // CONTEXTS
    const { currentUser, handleLogout } = useContext(UserContext);
    const { accountPanel, hideAccountPanel, showAccountPanel } = useContext(AppContext);

    // STATES
    const controlTheme = theme === "light" ? " mdLight" : " mdDark";

    // MODAL STATES
    const [modalTerms, setModalTerms] = useState(false);

    // FUNCTIONS
    const handleClick = (url) => {
        hideAccountPanel();
        history.push(url);
    };

    return (
        <Sidebar.Pushable as={Fragment}>
            <Sidebar
                vertical
                as={Menu}
                width="wide"
                direction="right"
                animation="overlay"
                visible={accountPanel}
                data-cy="mdAccountPanel"
                onHide={hideAccountPanel}
                onShow={showAccountPanel}
                className={`mdPanel mdAccountPanel${controlTheme}`}
            >
                <BoxContainer centered className="mdPanelHeader">
                    <UserAvatar name="settings" size="medium" />
                    <TitleControl
                        size="large"
                        className="mdUserName"
                        title={`Dr. ${currentUser?.name}`}
                    />
                </BoxContainer>
                <Divider />
                <BoxContainer className="mdPanelBody">
                    {PANEL_ITEMS.map((item, index) => (
                        <PanelActionControl
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            handleClick={() => handleClick(item.url)}
                        />
                    ))}
                    {/* <PanelActionControl
                        icon="file outline"
                        text="Terms and Conditions"
                        handleClick={() => {
                            hideAccountPanel();
                            setModalTerms(true);
                        }}
                    /> */}
                </BoxContainer>
                <BoxContainer padded="vertical" centered className="w-80">
                    <ButtonControl
                        basic
                        fluid
                        color="red"
                        text="Logout"
                        name="logout"
                        onClick={handleLogout}
                        icon="sign-out alternate"
                    />
                </BoxContainer>
                <SuspenseControl>
                    {modalTerms && (
                        <TermsAndConditions
                            visible={modalTerms}
                            handleClose={() => setModalTerms(false)}
                        />
                    )}
                </SuspenseControl>
            </Sidebar>
        </Sidebar.Pushable>
    );
};

export default withRouter(AccountPanel);

AccountPanel.propTypes = {
    history: PropTypes.object,
    theme: PropTypes.oneOf(["light", "dark"]),
};

AccountPanel.defaultProps = {
    theme: "light",
};
