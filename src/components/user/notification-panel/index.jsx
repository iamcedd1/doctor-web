import React, { useState, useEffect, useContext, Fragment } from "react";

// COMPONENTS
import { Sidebar, Menu } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import ImageControl from "../../controls/image-control";
import TitleControl from "../../controls/title-control";
import BoxContainer from "../../controls/container/box-container";
import FlexContainer from "../../controls/container/flex-container";
import PlaceholderControl from "../../controls/placeholder-control";
import NotificationItemControl from "../../panel/notification-item-control";

// CONTEXTS
import AppContext from "../../../contexts/app";
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { withRouter } from "react-router-dom";
import { socket } from "../../../utils/socket";

const NotificationPanel = ({ theme }) => {
    // CONTEXTS
    const { handleDecryptToken } = useContext(UserContext);
    const {
        notificationPanel,
        hideNotificationPanel,
        showNotificationPanel,
        fetchingNotifications,
        setNewNotificationCount,
        setFetchingNotifications,
    } = useContext(AppContext);

    // STATES
    const controlTheme = theme === "light" ? " mdLight" : " mdDark";
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState({});
    const [hasMore, setHasMore] = useState(false);

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const handleFetchNotifications = async (page) => {
        if (fetchingNotifications) return;
        setFetchingNotifications(true);

        const page_number = page ? page : pageNumber;
        const params = { page_number };
        const res = await api.notification.PostMethod("/notifications", params);
        const { data, status } = res;

        if (status === 200) {
            if (!data.errors) {
                const { total_count, unseen_count } = data;

                const _notifications = [...notifications, ...data.notifications];
                const hasMore = total_count > _notifications.length;

                setHasMore(hasMore);
                setPageNumber(page_number);
                setNotifications(_notifications);
                setNewNotificationCount(unseen_count);
            }
        }
        setFetchingNotifications(false);
    };

    const handleLoadMore = () => {
        if (fetchingNotifications || !hasMore || loading) return;
        const currentPage = pageNumber + 1;
        setPageNumber(currentPage);
        setLoading(loading);
    };

    const handleRead = async (id, isRead) => {
        hideNotificationPanel();

        if (isRead) return;
        const has_more = hasMore;
        setHasMore(false);

        const params = { id };
        const res = await api.notification.PostMethod("/notifications/read", params);
        const { data, status } = res;

        if (status === 200) {
            if (!data.errors) {
                const _notifications = notifications.map((item) =>
                    item.id === id ? { ...item, is_read: true } : item
                );
                setNotifications(_notifications);
            }
        }

        setHasMore(has_more);
    };

    useEffect(() => {
        function handleLoad() {
            const { practitioner_code } = handleDecryptToken();
            socket.connect();
            socket.on(`notification-${practitioner_code}`, (data) => {
                const { unseen_count, total_count, notification } = data;
                setTotalCount(total_count);
                setNewNotification(notification);
                setNewNotificationCount(unseen_count);
            });
        }
        handleLoad();
        return () => socket.close();
    }, []);

    useEffect(() => {
        handleFetchNotifications();
    }, [pageNumber]);

    useEffect(() => {
        if (newNotification?.id) {
            const _notifications = [newNotification, ...notifications];

            setHasMore(false);
            setNotifications(_notifications);
            setNewNotification({});
        }
    }, [newNotification, totalCount]);

    return (
        <Sidebar.Pushable as={Fragment}>
            <Sidebar
                vertical
                as={Menu}
                width="wide"
                direction="right"
                animation="overlay"
                visible={notificationPanel}
                data-cy="mdNotificationPanel"
                onHide={hideNotificationPanel}
                onShow={showNotificationPanel}
                className={`mdPanel mdNotificationPanel${controlTheme}`}
            >
                <FlexContainer className="mdPanelHeader">
                    <TitleControl size="large" title="Notifications" />
                </FlexContainer>
                {notifications.length > 0 ? (
                    <InfiniteScroll
                        className="mdPanelBody"
                        pageStart={0}
                        hasMore={hasMore}
                        useWindow={false}
                        loadMore={() => {
                            if (loading && hasMore) return;
                            handleLoadMore();
                        }}
                        loader={<PlaceholderControl />}
                    >
                        {notifications.map((item, index) => (
                            <NotificationItemControl
                                key={index}
                                url={item.url}
                                title={item.title}
                                isRead={item.is_read}
                                message={item.message}
                                addedDate={item.inserted_at}
                                handlePress={() => handleRead(item.id, item.is_read)}
                            />
                        ))}
                    </InfiniteScroll>
                ) : (
                    <BoxContainer centered className="mdPanelBody">
                        <ImageControl size="large" source="/images/hero/notification.svg" />
                        <TitleControl title="You have no notifications." />
                    </BoxContainer>
                )}
            </Sidebar>
        </Sidebar.Pushable>
    );
};

export default withRouter(NotificationPanel);

NotificationPanel.propTypes = {
    history: PropTypes.object,
    theme: PropTypes.oneOf(["light", "dark"]),
};

NotificationPanel.defaultProps = {
    theme: "light",
};
