import React from "react";

// COMPONENTS
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const NavItemControl = ({
    name,
    link,
    text,
    icon,
    image,
    size,
    color,
    level,
    active,
    hidden,
    handleClick,
    ...controlProps
}) => {
    // STYLES
    const controlHidden = hidden ? " mdHidden" : "";
    const controlLevel = level ? ` mdLevel-${level}` : "";
    const controlIconColor = active ? system.defaultColor : color;
    const controlImageUrl = image
        ? active
            ? `/images/icons/routes/active/${image}.svg`
            : `/images/icons/routes/${image}.svg`
        : "";

    return (
        <Menu.Item
            as={Link}
            to={link}
            name={name}
            active={active}
            onClick={handleClick}
            className={`mdNavItem${controlLevel}${controlHidden}`}
            {...controlProps}
        >
            {icon && <Icon name={icon} size={size} color={controlIconColor} className="mdIcon" />}
            {image && <Image src={controlImageUrl} className="mdIcon" size={size} />}
            {text && (
                <span className="mdText" hidden={hidden}>
                    {text}
                </span>
            )}
        </Menu.Item>
    );
};

export default NavItemControl;

NavItemControl.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    level: PropTypes.string,
    active: PropTypes.bool,
    hidden: PropTypes.bool,
    handleClick: PropTypes.func,
};

NavItemControl.defaultProps = {
    name: "",
    link: "",
    text: "",
    icon: "",
    image: "",
    level: "",
    size: "large",
    color: "grey",
    active: false,
    hidden: false,
    handleClick: () => {},
};
