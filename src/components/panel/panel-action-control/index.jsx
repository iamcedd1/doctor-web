import React from "react";

// COMPONENTS
import { Item, Image } from "semantic-ui-react";
import IconControl from "../../controls/icon-control";
import TextControl from "../../controls/text-control";

// UTILS
import PropTypes from "prop-types";

const PanelActionControl = ({
    name,
    icon,
    text,
    image,
    spaced,
    selected,
    className,
    iconColor,
    handleClick,
    iconPosition,
}) => {
    // STATES
    const controlSpaced = spaced ? " mdSpaced" : "";
    const controlSelected = selected ? " mdSelected" : "";
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdPanelAction-${name}` : "mdPanelAction";
    const controlPosition = iconPosition === "left" ? " mdLeft" : " mdRight";

    // FUNCTIONS

    return (
        <Item
            data-cy={controlName}
            onClick={handleClick}
            className={`mdPanelAction mdIconPosition${controlPosition}${controlSpaced}${controlSelected}${controlClass}`}
        >
            {icon && (
                <IconControl
                    icon={icon}
                    size="large"
                    color={iconColor}
                    className="mdPanelActionIcon"
                />
            )}
            {image && <Image className="mdPanelActionImage" src={image} />}
            {text && <TextControl className="mdPanelActionText" text={text} />}
        </Item>
    );
};

export default PanelActionControl;

PanelActionControl.propTypes = {
    spaced: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    selected: PropTypes.bool,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    iconColor: PropTypes.string,
    name: PropTypes.string.isRequired,
    iconPosition: PropTypes.oneOf(["left", "right"]),
};

PanelActionControl.defaultProps = {
    name: "",
    icon: "",
    spaced: false,
    className: "",
    selected: false,
    iconColor: "black",
    iconPosition: "left",
    handleClick: () => {},
};
