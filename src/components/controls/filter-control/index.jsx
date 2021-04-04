import React from "react";

// COMPONENTS
import ResponsiveControl from "../responsive-control";
import { Popup, Button, Tab } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";
import system from "../../../config/system";

const FilterControl = ({
    open,
    panes,
    fluid,
    fixed,
    handleOpen,
    handleClose,
    handleTabChange,
    ...controlProps
}) => {
    // STYLES
    const controlFixed = fixed ? "mdFixed" : "";

    const handleTablet = () => {
        return (
            <Popup
                flowing
                on="click"
                open={open}
                onOpen={handleOpen}
                data-cy="mdFilterPopup"
                className="mdFilter"
                onClose={handleClose}
                position="bottom right"
                closeOnDocumentClick={false}
                {...controlProps}
                trigger={
                    <Button
                        size="large"
                        basic={open}
                        fluid={fluid}
                        icon="filter"
                        data-cy="mdFilter"
                        color={system.defaultColor}
                    />
                }
            >
                <Tab
                    panes={panes}
                    renderActiveOnly
                    data-cy="mdFilterTab"
                    onTabChange={handleTabChange}
                    className={`mdTab ${controlFixed}`}
                    menu={{ color: system.defaultColor, secondary: true, pointing: true }}
                />
            </Popup>
        );
    };

    const handleDesktop = () => {
        return (
            <Popup
                flowing
                on="click"
                open={open}
                data-cy="mdFilterPopup"
                onOpen={handleOpen}
                className="mdFilter"
                onClose={handleClose}
                position="bottom right"
                closeOnDocumentClick={false}
                {...controlProps}
                trigger={
                    <Button
                        size="large"
                        basic={open}
                        icon="filter"
                        content="Filter"
                        color={system.defaultColor}
                        data-cy="mdFilter"
                        className="mdButton mdFilter"
                    />
                }
            >
                <Tab
                    panes={panes}
                    renderActiveOnly
                    data-cy="mdFilterTab"
                    onTabChange={handleTabChange}
                    className={`mdTab ${controlFixed}`}
                    menu={{ color: system.defaultColor, secondary: true, pointing: true }}
                />
            </Popup>
        );
    };

    return (
        <React.Fragment>
            <ResponsiveControl>{handleDesktop()}</ResponsiveControl>
            <ResponsiveControl width="max" type="tablet">
                {handleTablet()}
            </ResponsiveControl>
        </React.Fragment>
    );
};

export default FilterControl;

FilterControl.propTypes = {
    open: PropTypes.bool,
    panes: PropTypes.array,
    fluid: PropTypes.bool,
    fixed: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    handleTabChange: PropTypes.func,
};

FilterControl.defaultProps = {
    open: false,
    panes: [],
    fluid: false,
    fixed: false,
    handleOpen: () => {},
    handleClose: () => {},
    handleTabChange: () => {},
};
