import React from "react";

// COMPONENTS
import { Popup, Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../../config/system";

const HelpTooltip = ({ name, icon, color, content, className, ...controlProps }) => {
    // STATES
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdHelp-${name}` : "mdHelp";
    const controlIconName = name ? ` mdTooltip-${name}` : "";

    return (
        <Popup
            content={content}
            position="top center"
            data-cy={controlName}
            className={`mdTooltip mdHelp${controlClass}`}
            trigger={<Icon className={`mdTooltip mdIcon${controlIconName}`} color={color} name={icon} />}
            {...controlProps}
        />
    );
};

export default HelpTooltip;

HelpTooltip.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
};

HelpTooltip.defaultProps = {
    color: system.defaultColor,
    icon: "question circle outline",
};
