import React, { Fragment } from "react";

// COMPONENTS
import LoaInformation from "../loa-information";
import { Sidebar, Menu } from "semantic-ui-react";

// CONTEXTS

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const LoaInformationPanel = ({ data, theme, loading, visible, handleHide, handleShow }) => {
    // STATES
    const controlTheme = theme === "light" ? " mdLight" : " mdDark";

    // FUNCTIONS

    return (
        <Sidebar.Pushable as={Fragment}>
            <Sidebar
                vertical
                as={Menu}
                width="wide"
                direction="right"
                visible={visible}
                animation="overlay"
                onHide={handleHide}
                onShow={handleShow}
                data-cy="mdLoaInformationPanel"
                className={`mdPanel mdLoaInformationPanel${controlTheme}`}
            >
                <LoaInformation loading={loading} data={data} />
            </Sidebar>
        </Sidebar.Pushable>
    );
};

export default withRouter(LoaInformationPanel);

LoaInformationPanel.propTypes = {
    data: PropTypes.object,
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    history: PropTypes.object,
    handleHide: PropTypes.func,
    handleShow: PropTypes.func,
    theme: PropTypes.oneOf(["light", "dark"]),
};

LoaInformationPanel.defaultProps = {
    data: {},
    theme: "light",
    visible: false,
    handleShow: () => {},
    handleHide: () => {},
};
