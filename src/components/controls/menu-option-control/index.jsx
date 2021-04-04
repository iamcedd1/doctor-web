import React from "react";

// COMPONENTS
import { Dropdown } from "semantic-ui-react";
import PermissionControl from "../permission-control";

// UTILS
import PropTypes from "prop-types";

const MenuOptionControl = ({ icon, items, iconSize, className, iconColor, ...controlProps }) => {
    return (
        <Dropdown
            floating
            direction="left"
            data-cy="mdMenuOption"
            className={`mdMenuOption ${className}`}
            icon={{ name: icon, size: iconSize, color: iconColor }}
            {...controlProps}
        >
            <Dropdown.Menu>
                {items.map(
                    (item) =>
                        item.visible && (
                            <PermissionControl key={item.code} permission={item.permission}>
                                <Dropdown.Item icon={item.icon} content={item.text} {...item} />
                            </PermissionControl>
                        )
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MenuOptionControl;

MenuOptionControl.propTypes = {
    icon: PropTypes.string,
    items: PropTypes.array,
    iconSize: PropTypes.string,
    className: PropTypes.string,
    iconColor: PropTypes.string,
};

MenuOptionControl.defaultProps = {
    items: [],
    className: "",
    iconSize: "large",
    iconColor: "grey",
    icon: "ellipsis vertical",
};
