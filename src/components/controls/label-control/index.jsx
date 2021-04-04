import React from "react";

// COMPONENTS
import { Label } from "semantic-ui-react";
import HelpTooltip from "../tooltip/help-tooltip";

// UTILS
import PropTypes from "prop-types";

const LabelControl = ({
    size,
    name,
    help,
    label,
    color,
    padded,
    italic,
    children,
    className,
    labelStyle,
    helpContent,
    ...controlProps
}) => {
    // STYLE
    const controlItalic = italic ? " mdItalic" : "";
    const controlPadded = padded ? " mdPadded" : "";
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdLabel-${name}` : "mdLabel";

    return label || children ? (
        <Label
            basic
            size={size}
            color={color}
            style={labelStyle}
            data-cy={controlName}
            className={`mdLabel${controlClass}${controlItalic}${controlPadded}`}
            {...controlProps}
        >
            {label}
            {children}
            {help && <HelpTooltip name={name} content={helpContent} />}
        </Label>
    ) : null;
};

export default LabelControl;

LabelControl.propTypes = {
    help: PropTypes.bool,
    name: PropTypes.string,
    size: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    padded: PropTypes.bool,
    italic: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    labelStyle: PropTypes.string,
    helpContent: PropTypes.string,
};

LabelControl.defaultProps = {
    name: "",
    label: "",
    help: false,
    size: "large",
    color: "grey",
    padded: false,
    italic: false,
    className: "",
    helpContent: "",
};
