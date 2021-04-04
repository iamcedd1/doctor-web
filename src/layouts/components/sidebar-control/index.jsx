import React, { Fragment, Suspense, useContext } from "react";

// COMPONENTS
import { Menu, Sidebar } from "semantic-ui-react";
import NavItemControl from "../../../components/controls/nav-item-control";
import ResponsiveControl from "../../../components/controls/responsive-control";
import BoxContainer from "../../../components/controls/container/box-container";

// CONTEXTS
import AppContext from "../../../contexts/app";

// UTILS
import PropTypes from "prop-types";
import { routes } from "./routers";
import { withRouter } from "react-router-dom";

const SidebarControl = ({ code, children }) => {
    // CONTEXTS
    const { visible, setVisible, setPageAccess } = useContext(AppContext);

    const smallMenu = visible ? "mdSmallSide" : "";
    const smallContent = visible ? "mdSmallContent" : "";

    // FUNCTIONS
    return (
        <div className="mdMainContent">
            <div className="mdParent">
                <div className={`mdSide ${smallMenu}`}>
                    <ResponsiveControl
                        vertical
                        as={Menu}
                        fixed="left"
                        type="tablet"
                        className={`mdSide ${smallMenu}`}
                    >
                        {routes
                            .filter(({ enable }) => enable?.includes(window.ENV))
                            .map((route) => {
                                return (
                                    <NavItemControl
                                        key={route.code}
                                        hidden={visible}
                                        text={route.text}
                                        name={route.text}
                                        link={route.route}
                                        image={route.image}
                                        active={code === route.code}
                                        handleClick={() => setPageAccess(false)}
                                    />
                                );
                            })}
                    </ResponsiveControl>
                    <ResponsiveControl type="mobile" width="max">
                        <Suspense>
                            <Sidebar.Pushable as={Fragment}>
                                <Sidebar
                                    vertical
                                    as={Menu}
                                    width="thin"
                                    direction="left"
                                    visible={!visible}
                                    animation="overlay"
                                    data-cy="mdSidebarPanel"
                                    className="mdPanel mdSidebarPanel"
                                    onHide={() => setVisible(false)}
                                    onShow={() => setVisible(true)}
                                >
                                    <BoxContainer className="mdPanelBody">
                                        {routes
                                            .filter(({ enable }) => enable?.includes(window.ENV))
                                            .map((route) => {
                                                return (
                                                    <NavItemControl
                                                        key={route.code}
                                                        hidden={visible}
                                                        text={route.text}
                                                        name={route.text}
                                                        link={route.route}
                                                        image={route.image}
                                                        active={code === route.code}
                                                        handleClick={() => setPageAccess(false)}
                                                    />
                                                );
                                            })}
                                    </BoxContainer>
                                </Sidebar>
                            </Sidebar.Pushable>
                        </Suspense>
                    </ResponsiveControl>
                </div>
                <div className={`mdContent ${smallContent}`}>{children}</div>
            </div>
        </div>
    );
};

export default withRouter(SidebarControl);

SidebarControl.propTypes = {
    code: PropTypes.string,
    children: PropTypes.any,
};

SidebarControl.defaultProps = {
    code: "",
};
