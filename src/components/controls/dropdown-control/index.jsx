import React from "react";

// COMPONENTS
import { Dropdown } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const DropdownControl = ({
    icon,
    name,
    items,
    color,
    withIcon,
    children,
    className,
    ...controlProps
}) => {
    // STYLES
    const controlClass = className ? ` ${className}` : "";
    const controlIcon = items.length > 0 && !withIcon ? icon : false;
    const controlName = name ? `mdDropdown-${name}` : "mdDropdown";

    return (
        <Dropdown
            icon={controlIcon}
            data-cy={controlName}
            className={`mdDropdown ${color}${controlClass}`}
            {...controlProps}
        >
            <Dropdown.Menu>
                {items &&
                    items.length > 0 &&
                    items.map((item, index) => {
                        return item.isDivider ? (
                            <Dropdown.Divider key={index} />
                        ) : item.icon ? (
                            <Dropdown.Item
                                key={index}
                                text={item.name}
                                className="mdItem"
                                onClick={item.handleClick}
                                icon={{ name: item.icon, color: item.color }}
                            />
                        ) : (
                            <Dropdown.Item
                                key={index}
                                text={item.name}
                                onClick={item.handleClick}
                            />
                        );
                    })}
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownControl;

DropdownControl.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.array,
    color: PropTypes.string,
    withIcon: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
};

DropdownControl.defaultProps = {
    name: "",
    items: [],
    className: "",
    withIcon: false,
    icon: "dropdown",
    color: system.defaultColor,
};
