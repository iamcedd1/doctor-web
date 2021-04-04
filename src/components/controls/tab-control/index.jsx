import React from "react";

// COMPONENTS
import { Tab } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const TabControl = ({ name, position, className, borderless, handleChange, ...controlProps }) => {
    // STYLES
    const controlName = name ? `mdTab-${name}` : "mdTab";
    const controlClass = className ? ` ${className}` : "";
    const controlBorderless = borderless ? " mdBorderLess" : "";
    const controlPosition = position === "top" ? " mdBorderTop" : "";

    return (
        <Tab
            basic="true"
            renderActiveOnly
            data-cy={controlName}
            onTabChange={(e, data) => {
                handleChange && handleChange(data.activeIndex);
            }}
            className={`mdTab${controlPosition}${controlBorderless}${controlClass}`}
            menu={{ color: system.defaultColor, pointing: true, secondary: true }}
            {...controlProps}
        />
    );
};

export default TabControl;

TabControl.propTypes = {
    name: PropTypes.string,
    position: PropTypes.oneOf(["top", "bottom"]),
    className: PropTypes.string,
    borderless: PropTypes.bool,
    handleChange: PropTypes.func,
};

TabControl.defaultProps = {
    name: "",
    position: "",
    className: "",
    borderless: false,
    handleChange: () => {},
};
