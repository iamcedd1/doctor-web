import React from "react";

// COMPONENTS
import { Header } from "semantic-ui-react";
import LabelControl from "../label-control";

//UTILS
import PropTypes from "prop-types";

const TitleControl = ({
    name,
    title,
    color,
    label,
    header,
    spacing,
    children,
    centered,
    className,
    ...controlProps
}) => {
    // STYLES
    const controlColor = header ? "grey" : color;
    const controlClass = className ? ` ${className}` : "";
    const controlCentered = centered ? " mdCentered" : "";
    const controlName = name ? `mdTitle-${name}` : "mdTitle";
    const controlSpacing = spacing === "none" ? " mdResetSpace" : "";

    return (
        <Header
            color={controlColor}
            data-cy={controlName}
            className={`mdTitle${controlCentered}${controlClass}${controlSpacing}`}
            {...controlProps}
        >
            {title}
            {label && <LabelControl size="huge" label={label} italic />}
            {children}
        </Header>
    );
};

export default TitleControl;

TitleControl.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    header: PropTypes.bool,
    children: PropTypes.any,
    centered: PropTypes.bool,
    className: PropTypes.string,
    spacing: PropTypes.oneOf(["none"]),
};

TitleControl.defaultProps = {
    name: "",
    title: "",
    label: "",
    header: false,
    className: "",
    color: "black",
    centered: false,
};
