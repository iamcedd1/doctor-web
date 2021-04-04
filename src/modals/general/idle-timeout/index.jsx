import React from "react";

// COMPONENTS
import ModalControl from "../../../components/controls/modal-control";
import ImageControl from "../../../components/controls/image-control";
import TitleControl from "../../../components/controls/title-control";
import TextControl from "../../../components/controls/text-control";
import ButtonControl from "../../../components/controls/button-control";

// UTILS
import moment from "moment";
import PropTypes from "prop-types";

const IdleTimeout = ({ visible, seconds, handleClose }) => {
    return (
        <ModalControl
            padded
            size="mini"
            name="timeout"
            contentCentered
            animation="none"
            visible={visible}
            className="mdTimeout"
            handleClose={handleClose}
            closeOnDimmerClick={false}
        >
            <ImageControl size="small" source="/images/general/idle-sheep.png" />
            <TitleControl title="Wake Up!" />
            <TextControl text="Your session is about to time out." />
            <TextControl
                text={moment.unix(seconds).utc().format("m [Minutes and] s [Seconds Left]")}
                color="red"
            />
            <ButtonControl fluid name="resume" text="Resume" onClick={handleClose} />
        </ModalControl>
    );
};

export default IdleTimeout;

IdleTimeout.propTypes = {
    visible: PropTypes.bool,
    seconds: PropTypes.number,
    handleClose: PropTypes.func,
};

IdleTimeout.defaultProps = {
    seconds: 600,
    visible: true,
    handleClose: () => {},
};
