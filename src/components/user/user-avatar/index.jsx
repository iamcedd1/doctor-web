import React, { useContext } from "react";

// COMPONENTS
import { Image } from "semantic-ui-react";

// CONTEXTS
import UserContext from "../../../contexts/user";

// DATA

// UTILS
import PropTypes from "prop-types";

const UserAvatar = ({ name, size, className, ...controlProps }) => {
    // CONTEXTS
    const { currentUser } = useContext(UserContext);

    // STATES
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdUserAvatar-${name}` : "mdUserAvatar";

    // FUNCTIONS

    return (
        <Image
            avatar
            circular
            size={size}
            data-cy={controlName}
            className={`mdUserAvatar${controlClass}`}
            {...controlProps}
        >
            {currentUser.initials}
        </Image>
    );
};

export default UserAvatar;

UserAvatar.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};

UserAvatar.defaultProps = {
    size: "small",
    className: "",
};
