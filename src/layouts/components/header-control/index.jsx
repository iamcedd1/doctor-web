import React, { useContext, Fragment, lazy, Suspense, useEffect } from "react";

// COMPONENTS
import { Label, Menu, Image, Icon } from "semantic-ui-react";
import UserAvatar from "../../../components/user/user-avatar";
import ResponsiveControl from "../../../components/controls/responsive-control";

// CONTEXTS
import AppContext from "../../../contexts/app";
import UserContext from "../../../contexts/user";

// PANELS
import AccountPanel from "../../../components/user/account-panel";

// UTILS
import moment from "moment";
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { withRouter } from "react-router-dom";

const NotificationPanel = lazy(() => import("../../../components/user/notification-panel"));

const HeaderControl = ({ general, withMenu }) => {
    // CONTEXTS
    const { authenticated, currentUser } = useContext(UserContext);
    const {
        toggleMenu,
        showAccountPanel,
        hideAccountPanel,
        hideNotificationPanel,
        showNotificationPanel,
        newNotificationCount,
        setNewNotificationCount,
    } = useContext(AppContext);

    // FUNCTIONS
    const handleSeen = async () => {
        showNotificationPanel();
        const res = await api.notification.PostMethod("/notifications/seen");
        const { data, status } = res;

        if (status === 200) {
            if (!data.errors) {
                setNewNotificationCount(false);
            }
        }
    };

    useEffect(() => {
        if (!authenticated) {
            hideAccountPanel();
            hideNotificationPanel();
        }
    }, [authenticated]);

    return (
        <div className="menu mdMenu">
            <Menu borderless fixed="top" className="mdMainHeader">
                {!general && (
                    <Menu.Item className="mdMenuBurger" onClick={toggleMenu}>
                        <Icon name="bars" />
                    </Menu.Item>
                )}
                <Menu.Item>
                    <a href="/">
                        <Image src={system.logo} className="mdBrand" alt={`${system.appName}`} />
                    </a>
                </Menu.Item>

                {authenticated && withMenu && (
                    <Suspense fallback={Fragment}>
                        <Menu.Item
                            as="a"
                            position="right"
                            onClick={handleSeen}
                            className="mdNavItem mdNotification"
                        >
                            <Icon
                                size="large"
                                className="mdIcon"
                                name="bell outline"
                                color={system.defaultColor}
                            />
                            {newNotificationCount > 0 && (
                                <Label color="red" circular className="mdBadge" floating>
                                    {newNotificationCount > 99 ? "99+" : newNotificationCount}
                                </Label>
                            )}
                        </Menu.Item>
                        <Menu.Item className="mdNavItem mdSystemTime">
                            <ResponsiveControl as={Label}>
                                {moment().format("ddd, MMM DD, HH:mm A")}
                            </ResponsiveControl>
                        </Menu.Item>
                        <Menu.Item as="a" className="mdNavItem" onClick={showAccountPanel}>
                            <div className="mdMenuUser">
                                <UserAvatar name="header" />
                                <ResponsiveControl>
                                    <span className="mdUserName">Dr. {currentUser.name}</span>
                                </ResponsiveControl>
                            </div>
                        </Menu.Item>
                        <AccountPanel />
                        <NotificationPanel />
                    </Suspense>
                )}
            </Menu>
        </div>
    );
};

export default withRouter(HeaderControl);

HeaderControl.propTypes = {
    general: PropTypes.bool,
    withMenu: PropTypes.bool,
    history: PropTypes.object,
};
