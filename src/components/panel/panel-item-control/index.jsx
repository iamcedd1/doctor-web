import React from "react";

// COMPONENTS
import { Item } from "semantic-ui-react";

// CONTEXTS

// DATA

// UTILS
import PropTypes from "prop-types";
import TextControl from "../../controls/text-control";
import LabelControl from "../../controls/label-control";
import IconControl from "../../controls/icon-control";
import { isObjectEmpty } from "../../../utils/helpers";

const PanelItemControl = ({
    name,
    text,
    label,
    leading,
    trailing,
    layout,
    className,
    ...controlProps
}) => {
    // STATES
    const controlLayout = ` mdPanelItemLayout-${layout}`;
    const controlClass = className ? ` ${className}` : "";
    const controlName = name ? `mdPanelItem-${name}` : "mdPanelItem";

    return (
        <Item
            data-cy={controlName}
            className={`mdPanelItem${controlLayout}${controlClass}`}
            {...controlProps}
        >
            {isObjectEmpty(leading) && (
                <IconControl size="large" className="mdPanelActionIcon" {...leading} />
            )}
            <div className="mdPanelItemBody">
                {label && <LabelControl label={label} />}
                <TextControl text={text} />
            </div>
            {isObjectEmpty(trailing) && (
                <IconControl size="large" className="mdPanelActionIcon" {...trailing} />
            )}
        </Item>
    );
};

export default PanelItemControl;

PanelItemControl.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.number,
    className: PropTypes.string,
    leading: PropTypes.object,
    trailing: PropTypes.object,
};

PanelItemControl.defaultProps = {
    name: "",
    text: "",
    label: "",
    layout: 1,
    leading: {},
    trailing: {},
    className: "",
};
