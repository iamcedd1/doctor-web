import React from "react";

// COMPONENTS
import { Item } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import { checkNull } from "../../../utils/helpers";

const TextLabelControl = ({
    text,
    label,
    children,
    textClass,
    labelClass,
    contentType,
    containerClass,
    ...controlProps
}) => {
    return (
        <Item className={`mdTextLabel ${containerClass}`} {...controlProps}>
            {label && <span className={`mdLabel ${labelClass}`}>{label}</span>}
            <span className={`mdText ${textClass}`}>{checkNull(text, contentType)}</span>
            {children}
        </Item>
    );
};

export default TextLabelControl;

TextLabelControl.propTypes = {
    text: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.any,
    textClass: PropTypes.string,
    labelClass: PropTypes.string,
    contentType: PropTypes.string,
    containerClass: PropTypes.string,
};

TextLabelControl.defaultProps = {
    text: "",
    label: "",
    textClass: "",
    labelClass: "",
    contentType: "",
    containerClass: "",
};
