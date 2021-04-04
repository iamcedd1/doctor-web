import React, { useState } from "react";

// COMPONENTS
import { Popup, Icon, Modal } from "semantic-ui-react";
import ButtonIconControl from "../button-icon-control";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ImageControl from "../image-control";

const MenuPopper = ({
    items,
    match,
    trigger,
    history,
    position,
    children,
    handleOpen,
    handleClose,
    ...controlProps
}) => {
    // STATES
    const [isOpen, setIsOpen] = useState(false);

    // FUNCTIONS
    const onClose = () => {
        handleClose && handleClose();
        setIsOpen(false);
    };

    const onOpen = () => {
        handleOpen && handleOpen();
        setIsOpen(true);
    };

    return (
        <Popup
            flowing
            on="click"
            open={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            trigger={trigger}
            position={position}
            closeOnDocumentClick
            data-cy="mdMenuPopper"
            className="mdMenuPopper"
            {...controlProps}
        >
            <Modal className="mdMenuModal" open={isOpen} dimmer="inverted" />
            <div data-cy="mdMenuItems" className="mdMenuItems">
                {items &&
                    items.map((item) => (
                        <div
                            key={item.name}
                            data-cy="mdMenuItem"
                            className="mdMenuItem"
                            href={`${match.url}/${item.url}`}
                            onClick={() => history.push(`${match.url}/${item.url}`)}
                        >
                            <div className="mdMenuItemImage">
                                {item.image && <ImageControl source={item.image} />}
                                {item.icon && <Icon name={item.icon} size="huge" />}
                            </div>
                            <div className="mdMenuItemName">
                                <span>{item.name}</span>
                            </div>
                        </div>
                    ))}

                <div className="mdMenuItem mdClose">
                    <ButtonIconControl circular icon="close" color="grey" handleClick={onClose} />
                </div>
            </div>
        </Popup>
    );
};

export default withRouter(MenuPopper);

MenuPopper.propTypes = {
    items: PropTypes.array,
    match: PropTypes.any,
    trigger: PropTypes.any,
    history: PropTypes.any,
    position: PropTypes.string,
    children: PropTypes.any,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
};

MenuPopper.defaultProps = {
    items: [],
    position: "bottom right",
    handleOpen: () => {},
    handleClose: () => {},
};
