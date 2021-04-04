import React, { useState } from "react";

// COMPONENTS
import LabelControl from "../label-control";
import { Accordion, Icon } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const AccordionControl = ({
    grid,
    name,
    icon,
    label,
    title,
    titleAs,
    children,
    contentAs,
    className,
    titleClass,
    description,
    ...controlProps
}) => {
    // CONTEXTS
    const [active, setActive] = useState(false);

    // STYLES
    const styleGrid = grid ? "mdGrid" : "";
    const styleIcon = icon ? icon : "dropdown";
    const styleContentAs = contentAs ? contentAs : "";
    const styleName = name ? `mdAccordion-${name}` : "mdAccordion";

    return (
        <Accordion
            data-cy={styleName}
            className={`mdAccordion ${styleGrid} ${className}`}
            {...controlProps}
        >
            <Accordion.Title
                as={titleAs}
                active={active}
                data-cy="mdAccordionTitle"
                className="mdAccordionTitle"
                onClick={() => setActive(!active)}
            >
                <Icon name={styleIcon} />
                <div>
                    <span className={titleClass}>{title}</span>
                    {label && (
                        <div>
                            <LabelControl label={label} />
                        </div>
                    )}
                    {description}
                </div>
            </Accordion.Title>
            <Accordion.Content
                active={active}
                as={styleContentAs}
                data-cy="mdAccordionContent"
                className="mdAccordionContent"
            >
                {children}
            </Accordion.Content>
        </Accordion>
    );
};

export default AccordionControl;

AccordionControl.propTypes = {
    grid: PropTypes.bool,
    name: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    titleAs: PropTypes.any,
    children: PropTypes.any,
    contentAs: PropTypes.any,
    className: PropTypes.string,
    titleClass: PropTypes.string,
    description: PropTypes.any,
};

AccordionControl.defaultProps = {
    name: "",
    label: "",
    title: "",
    grid: false,
    className: "",
    titleClass: "",
    icon: "dropdown",
};
