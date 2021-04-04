import React, { useEffect, useState } from "react";

// COMPONENTS
import MaskedInput from "react-text-mask";
import LinkControl from "../link-control";
import LabelControl from "../label-control";
import ErrorControl from "../error-control";
import { Input, Form } from "semantic-ui-react";

// UTILS
import PropTypes from "prop-types";

const TextBoxControl = ({
    hint,
    name,
    text,
    link,
    mask,
    width,
    error,
    label,
    hasError,
    subLabel,
    linkSize,
    textAlign,
    linkAlign,
    labelSize,
    linkAction,
    className,
    inputWidth,
    ...controlProps
}) => {
    // STATES
    const controlClass = className ? ` ${className}` : "";
    const controlHintName = name ? `hint-${name}` : "hint";
    const controlName = name ? `mdInput-${name}` : "mdInput";
    const controlLinkAlign = linkAlign ? ` md-${linkAlign}` : "";
    const controlTextAlign = textAlign ? ` md-${textAlign}` : "";
    const controlWidth = inputWidth ? ` mdContainerWidth-${inputWidth}` : "";

    const [controlError, setControlError] = useState(false);
    const [styleError, setStyleError] = useState("");

    // FUNCTIONS
    useEffect(() => {
        if (hasError || error) {
            setControlError(true);
            setStyleError(" error");
        } else {
            setControlError(false);
            setStyleError("");
        }
    }, [hasError, error]);

    return (
        <Form.Field width={width} error={controlError} className="mdInput">
            <LabelControl name={name} label={label} size={labelSize} />
            {subLabel && <LabelControl italic label={subLabel} size={labelSize} />}
            <div className={`mdContainer ${controlWidth}`}>
                {mask ? (
                    <Input size="large">
                        <MaskedInput
                            name={name}
                            mask={mask}
                            guide={false}
                            data-cy={controlName}
                            className={`mdMasked${styleError}${controlTextAlign}${controlClass}`}
                            {...controlProps}
                        />
                    </Input>
                ) : (
                    <Input
                        name={name}
                        size="large"
                        autoComplete="off"
                        data-cy={controlName}
                        className={`${styleError}${controlTextAlign}${controlClass}`}
                        {...controlProps}
                    />
                )}
                {text}
            </div>
            <div>
                <LabelControl name={controlHintName} label={hint} />
            </div>
            <ErrorControl name={name} error={error} />

            {link && (
                <div className={`mdLinkContainer${controlLinkAlign}`}>
                    <LinkControl action text={link} handleClick={linkAction} size={linkSize} />
                </div>
            )}
        </Form.Field>
    );
};

export default TextBoxControl;

TextBoxControl.propTypes = {
    mask: PropTypes.any,
    hint: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    width: PropTypes.number,
    error: PropTypes.string,
    label: PropTypes.string,
    hasError: PropTypes.bool,
    subLabel: PropTypes.string,
    linkSize: PropTypes.string,
    linkAction: PropTypes.func,
    className: PropTypes.string,
    labelSize: PropTypes.string,
    inputWidth: PropTypes.number,
    linkAlign: PropTypes.oneOf(["left", "center", "right"]),
    textAlign: PropTypes.oneOf(["left", "center", "right"]),
};

TextBoxControl.defaultProps = {
    hint: "",
    name: "",
    text: "",
    link: "",
    width: 16,
    error: "",
    label: "",
    subLabel: "",
    className: "",
    inputWidth: 1,
    hasError: false,
    textAlign: "left",
    labelSize: "large",
    linkSize: "medium",
    linkAlign: "right",
    linkAction: () => {},
};
