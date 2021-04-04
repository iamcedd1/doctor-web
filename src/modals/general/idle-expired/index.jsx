import React from "react";

// COMPONENTS
import TextControl from "../../../components/controls/text-control";
import ModalControl from "../../../components/controls/modal-control";
import ImageControl from "../../../components/controls/image-control";
import TitleControl from "../../../components/controls/title-control";
import ButtonControl from "../../../components/controls/button-control";

// UTILS
import PropTypes from "prop-types";

const IdleExpired = ({ visible, handleClose }) => {
    return (
        <ModalControl
            padded
            size="mini"
            contentCentered
            visible={visible}
            handleClose={handleClose}
        >
            <ImageControl size="small" source="/images/general/idle-sheep.png" />
            <TitleControl title="Seems like your session timed out." />
            <TextControl text="Log back in to continue" />
            <ButtonControl padded fluid text="Login" onClick={handleClose} />
        </ModalControl>
    );
};

export default IdleExpired;

IdleExpired.propTypes = {
    visible: PropTypes.bool,
    handleClose: PropTypes.func,
};

IdleExpired.defaultProps = {
    visible: true,
    handleClose: () => {},
};
