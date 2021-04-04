import React from "react";

// UTILS
import PropTypes from "prop-types";
import { checkNull } from "../../../utils/helpers";

const TextControl = ({
    name,
    text,
    bold,
    error,
    color,
    italic,
    padded,
    centered,
    indented,
    children,
    className,
    contentType,
    indentLevel,
}) => {
    // STYLES
    const controlBold = bold ? " mdBold " : "";
    const controlPadded = padded ? " mdPadded" : "";
    const controlItalic = italic ? " mdItalic " : "";
    const controlClass = className ? ` ${className}` : "";
    const controlColor = color ? ` mdColor-${color}` : "";
    const controlCentered = centered ? " mdCentered " : "";
    const controlIndented = indented ? ` mdIndented mdIndentLevel-${indentLevel}` : "";
    const controlName = error
        ? name
            ? `mdError-${name}`
            : "mdError"
        : name
        ? `mdText-${name}`
        : "mdText";

    const controlContent = children ? children : text;

    return (
        <div
            data-cy={controlName}
            className={`mdParagraph${controlPadded}${controlCentered}${controlItalic}${controlBold}${controlColor}${controlIndented}${controlClass}`}
        >
            {<span>{checkNull(controlContent, contentType)}</span>}
        </div>
    );
};

export default TextControl;

TextControl.propTypes = {
    text: PropTypes.any,
    bold: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    italic: PropTypes.bool,
    padded: PropTypes.bool,
    color: PropTypes.string,
    children: PropTypes.any,
    indented: PropTypes.bool,
    centered: PropTypes.bool,
    className: PropTypes.string,
    indentLevel: PropTypes.number,
    contentType: PropTypes.oneOf([
        "bool",
        "boolean",
        "custom-boolean",
        "numeric",
        "number",
        "amount",
        "decimal",
        "month",
        "date",
        "",
    ]),
};

TextControl.defaultProps = {
    name: "",
    text: "",
    bold: false,
    error: false,
    padded: true,
    className: "",
    italic: false,
    color: "black",
    indentLevel: 1,
    centered: false,
    contentType: "",
    indented: false,
};
