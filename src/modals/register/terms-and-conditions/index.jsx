import React, { Fragment } from "react";

// COMPONENTS
import Terms from "../../../components/general/terms";
import ModalControl from "../../../components/controls/modal-control";
import ButtonControl from "../../../components/controls/button-control";

// UTILS
import PropTypes from "prop-types";

const TermsAndConditions = ({ visible, handleClose }) => {
    // FUNCTIONS
    const handleActions = () => {
        return (
            <Fragment>
                <ButtonControl basic color="grey" name="close" text="Close" onClick={handleClose} />
            </Fragment>
        );
    };

    return (
        <ModalControl
            customed
            name="terms"
            scrolling={true}
            centered={false}
            visible={visible}
            handleClose={handleClose}
            title="DoctorLink Terms and Conditions"
            actionButtons={handleActions()}
        >
            <Terms />
        </ModalControl>
    );
};

export default TermsAndConditions;

TermsAndConditions.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
};

TermsAndConditions.defaultProps = {
    modalData: {},
    visible: false,
    handleClose: () => {},
    handleAccept: () => {},
};
