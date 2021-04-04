import React from "react";

// COMPONENTS
import { Icon } from "semantic-ui-react";
import TextControl from "../../text-control";
import LinkControl from "../../link-control";

// UTILS
import PropTypes from "prop-types";

const FileContainer = ({
    name,
    file,
    icon,
    iconSize,
    linkText,
    linkSize,
    linkAction,
    className,
}) => {
    // STYLE
    const controlName = name ? `mdFileContainer-${name}` : "mdFileContainer";

    return (
        <div className={`mdFileContainer ${className}`} data-cy={controlName}>
            <div className="mdFileIcon">
                <Icon name={icon} size={iconSize} />
            </div>
            <div className="mdFileContent">
                <TextControl className="mdFileName" text={file.name} />
                <LinkControl
                    size={linkSize}
                    text={linkText}
                    onClick={linkAction}
                    className="mdFileLink"
                />
            </div>
        </div>
    );
};

export default FileContainer;

FileContainer.propTypes = {
    name: PropTypes.string,
    file: PropTypes.any,
    icon: PropTypes.string,
    iconSize: PropTypes.string,
    iconName: PropTypes.string,
    linkText: PropTypes.string,
    linkSize: PropTypes.string,
    linkAction: PropTypes.func,
    className: PropTypes.string,
};

FileContainer.defaultProps = {
    name: "",
    className: "",
    iconSize: "large",
    iconName: "file",
    linkSize: "small",
    linkText: "Replace",
    linkAction: () => {},
};
