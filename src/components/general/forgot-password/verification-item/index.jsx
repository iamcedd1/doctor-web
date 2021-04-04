import React from "react";

// COMPONENTS
import IconControl from "../../../controls/icon-control";

// UTILS
import cx from "clsx";
import PropTypes from "prop-types";

const VerificationItem = ({ icon, name, text, title, handleClick }) => {
    const controlName = name ? `mdVerificationItem-${name}` : "mdVerificationItem";
    const controlClasses = cx("mdVerificationItem", controlName);

    return (
        <div onClick={handleClick} data-cy={controlName} className={controlClasses}>
            <IconControl icon={icon} size="large" className="mdVerificationIcon" />
            <div className="mdVerificationContent">
                <span className="mdVerificationTitle">{title}</span>
                <span className="mdVerificationText">{text}</span>
            </div>
            <IconControl icon="angle right" size="large" className="mdVerificationArrow" />
        </div>
    );
};

export default VerificationItem;

VerificationItem.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

VerificationItem.defaultProps = {
    name: "",
    icon: "",
    text: "",
    title: "",
    handleClick: () => {},
};
