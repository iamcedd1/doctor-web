import React from "react";

// COMPONENTS
import TextControl from "../text-control";
import TitleControl from "../title-control";
import ButtonIconControl from "../button-icon-control";
import { Modal, TransitionablePortal } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const ModalControl = ({
    name,
    size,
    title,
    close,
    padded,
    visible,
    customed,
    children,
    centered,
    duration,
    animation,
    className,
    scrolling,
    titleLabel,
    handleClose,
    actionButtons,
    withTransition,
    contentCentered,
    closeOnDimmerClick,
    closeOnDocumentClick,
    ...controlProps
}) => {
    // STYLES
    const controlPadded = padded ? "mdPadded " : "";
    const controlName = name ? `mdModal-${name}` : "mdModal";
    const controlCentered = contentCentered ? "mdCentered " : "";
    const controlTitleName = name ? `mdTitle-${name}` : "mdTitle";
    const controlTitleLabelName = titleLabel ? "titleLabel" : "";

    // FUNCTIONS
    const handleModal = () => {
        return (
            <Modal
                size={size}
                open={visible}
                dimmer="inverted"
                centered={centered}
                data-cy={controlName}
                onClose={handleClose}
                className={`mdModal ${className}`}
                closeOnDimmerClick={closeOnDimmerClick}
                closeOnDocumentClick={closeOnDocumentClick}
                {...controlProps}
            >
                {customed && (
                    <Modal.Header data-cy={controlTitleName} className="mdModalHeader">
                        {title}
                        {titleLabel && (
                            <TextControl
                                color="greyDark"
                                text={titleLabel}
                                name={controlTitleLabelName}
                                className="mdModalTitleLabel"
                            />
                        )}
                    </Modal.Header>
                )}
                <Modal.Content
                    scrolling={scrolling}
                    className={`mdModalContent ${controlPadded}${controlCentered}`}
                >
                    {title && !customed && <TitleControl name={name} title={title} />}
                    {close && (
                        <div className="mdClose">
                            <ButtonIconControl
                                circular
                                icon="close"
                                color="grey"
                                handleClick={handleClose}
                            />
                        </div>
                    )}
                    {children}
                </Modal.Content>
                {customed && actionButtons && <Modal.Actions>{actionButtons}</Modal.Actions>}
            </Modal>
        );
    };

    return withTransition ? (
        <TransitionablePortal
            open={visible}
            transition={{
                animation,
                duration,
            }}
        >
            {handleModal()}
        </TransitionablePortal>
    ) : (
        handleModal()
    );
};

export default ModalControl;

ModalControl.propTypes = {
    close: PropTypes.bool,
    name: PropTypes.string,
    size: PropTypes.string,
    padded: PropTypes.bool,
    title: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.any,
    centered: PropTypes.bool,
    customed: PropTypes.bool,
    scrolling: PropTypes.bool,
    duration: PropTypes.number,
    animation: PropTypes.string,
    className: PropTypes.string,
    actionButtons: PropTypes.any,
    titleLabel: PropTypes.string,
    withTransition: PropTypes.bool,
    contentCentered: PropTypes.bool,
    closeOnDimmerClick: PropTypes.bool,
    closeOnDocumentClick: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
};

ModalControl.defaultProps = {
    title: "",
    close: false,
    padded: false,
    className: "",
    size: "small",
    duration: 500,
    visible: false,
    titleLabel: "",
    centered: true,
    customed: false,
    scrolling: false,
    animation: "zoom",
    withTransition: true,
    handleClose: () => {},
    contentCentered: false,
    closeOnDimmerClick: true,
    closeOnDocumentClick: false,
};
