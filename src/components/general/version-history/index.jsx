import React, { Fragment } from "react";

// COMPONENTS
import TextControl from "../../controls/text-control";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import TitleControl from "../../controls/title-control";
import AccordionControl from "../../controls/accordion-control";

// UTILS
import PropTypes from "prop-types";

const VersionHistory = ({ items, title, theme, visible, handleClose }) => {
    // STYLES
    const controlTheme = theme === "light" ? " mdLight" : " mdDark";

    return (
        <Sidebar.Pushable as={Fragment}>
            <Sidebar
                vertical
                as={Menu}
                width="wide"
                direction="right"
                visible={visible}
                animation="overlay"
                onHide={handleClose}
                data-cy="mdVersionHistory"
                className={`mdVersionHistory${controlTheme}`}
            >
                <Menu.Header className="mdVersionHeader">
                    <TitleControl title={title} />
                    <Icon name="close" size="large" className="mdClose" onClick={handleClose} />
                </Menu.Header>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <Menu.Item content={item.version_day} className="mdVersionDay" />
                        {item.version_data &&
                            item.version_data.map((_item, index) => (
                                <AccordionControl
                                    key={index}
                                    as={Menu.Item}
                                    className="mdVersionItem"
                                    titleClass="mdVersionTitle"
                                    title={_item.version_datetime}
                                    description={
                                        <Fragment>
                                            <TextControl text={_item.version} />
                                            <TextControl text={_item.updated_by} />
                                        </Fragment>
                                    }
                                >
                                    <div className="mdVersionDescription">
                                        <TextControl text={_item.version_description} />
                                    </div>
                                </AccordionControl>
                            ))}
                    </Fragment>
                ))}
            </Sidebar>
        </Sidebar.Pushable>
    );
};

export default VersionHistory;

VersionHistory.propTypes = {
    visible: PropTypes.bool,
    items: PropTypes.array,
    title: PropTypes.string,
    handleClose: PropTypes.func,
    theme: PropTypes.oneOf(["light", "dark"]),
};

VersionHistory.defaultProps = {
    items: [],
    theme: "light",
    visible: false,
    handleClose: () => {},
    title: "VERSION HISTORY",
};
