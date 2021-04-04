import React, { useState, useEffect } from "react";

// COMPONENTS
import { Item, Image } from "semantic-ui-react";

// DATA
import { NOTIFICATION_TYPES } from "../../../data/general";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { timeSince } from "../../../utils/helpers";

const NotificationItemControl = ({
    url,
    type,
    title,
    isRead,
    history,
    message,
    addedDate,
    handlePress,
}) => {
    // STATES
    const controlRead = !isRead ? " mdUnread" : "";
    const [controlImage, setControlImage] = useState("");

    // FUNCTIONS
    const handleClick = () => {
        handlePress();
        if (url) history.push(url);
    };

    useEffect(() => {
        if (type) {
            const image = NOTIFICATION_TYPES.find(({ code }) => code === type)?.image;
            const imageUrl = `/images/icons/routes/${image}.svg`;
            setControlImage(imageUrl);
        }
    }, [type]);

    return (
        <Item
            onClick={handleClick}
            data-cy="mdNotificationItem"
            className={`mdNotificationItem${controlRead}`}
        >
            {controlImage && (
                <Image src={controlImage} className="mdNotificationImage" size="mini" />
            )}
            <div className="mdNotificationBody">
                <span className="mdNotificationTitle">{title}</span>
                <span className="mdNotificationMessage">{message}</span>
                <span className="mdNotificationDate">{timeSince(addedDate)}</span>
            </div>
        </Item>
    );
};

export default withRouter(NotificationItemControl);

NotificationItemControl.propTypes = {
    url: PropTypes.string,
    isRead: PropTypes.bool,
    type: PropTypes.string,
    history: PropTypes.object,
    addedDate: PropTypes.string,
    handlePress: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

NotificationItemControl.defaultProps = {
    type: "T",
    title: "",
    isRead: false,
    handlePress: () => {},
};
