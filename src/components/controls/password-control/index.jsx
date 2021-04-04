import React, { useState, useEffect } from "react";

// COMPONENTS
import LinkControl from "../link-control";
import TextControl from "../text-control";
import LabelControl from "../label-control";
import ErrorControl from "../error-control";
import { Input, Form, Label } from "semantic-ui-react";
import PasswordVerifyControl from "../password-verify-control";

// UTILS
import PropTypes from "prop-types";

const PasswordControl = ({
    name,
    link,
    value,
    width,
    error,
    label,
    linkSize,
    linkAlign,
    className,
    labelSize,
    linkAction,
    handleCheck,
    showValidation,
    ...controlProps
}) => {
    // STYLES
    const controlError = error ? true : false;
    const styleError = controlError ? "error" : "";
    const controlName = name ? `mdPasswordInput-${name}` : "mdPasswordInput";
    const controlLinkAlign = linkAlign ? ` md-${linkAlign}` : "";

    // STATES
    const [hidden, setHidden] = useState(true);
    const [type, setType] = useState("password");
    const [focused, setFocused] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const [hiddenText, setHiddenText] = useState("show");

    // FUNCTIONS
    const handleCapsLock = (e) => {
        const isCapsLock = e.getModifierState("CapsLock");
        setCapsLock(isCapsLock);
    };

    useEffect(() => {
        if (hidden) {
            setType("password");
            setHiddenText("show");
        } else {
            setType("text");
            setHiddenText("hide");
        }
    }, [hidden]);

    return (
        <Form.Field width={width} error={controlError} className="mdPasswordInput">
            <LabelControl name={name} label={label} size={labelSize} />
            <Input
                name={name}
                size="large"
                type={type}
                data-cy={controlName}
                className={`${styleError} ${className}`}
                icon={
                    <div
                        onClick={() => setHidden(!hidden)}
                        className={`mdHiddenContainer ${hiddenText}`}
                    />
                }
                value={value}
                autoComplete="off"
                onKeyUp={handleCapsLock}
                onKeyDown={handleCapsLock}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                {...controlProps}
            />
            {focused && capsLock && (
                <Label
                    color="red"
                    pointing="above"
                    className="mdCapsLock"
                    data-cy={`mdCapsLock-${name}`}
                    content="Warning: Caps lock is on"
                />
            )}
            <ErrorControl name={name} error={error} />
            {link && (
                <div className={`mdLinkContainer${controlLinkAlign}`}>
                    <LinkControl action text={link} handleClick={linkAction} size={linkSize} />
                </div>
            )}

            {((value && showValidation) || (showValidation && focused && value)) && !error && (
                <PasswordVerifyControl password={value} handleCheck={handleCheck} />
            )}

            {((showValidation && !focused && !value) || (showValidation && focused && !value)) &&
                !error && (
                    <TextControl
                        color="grey"
                        data-cy={`mdHint-${name}`}
                        className="mdHint mdMarginBottom-1"
                        text="Password must be at least 8 characters with one (1) capital letter, symbol and number"
                    />
                )}
        </Form.Field>
    );
};

export default PasswordControl;

PasswordControl.propTypes = {
    width: PropTypes.number,
    error: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    link: PropTypes.string,
    name: PropTypes.string,
    linkSize: PropTypes.string,
    linkAction: PropTypes.func,
    className: PropTypes.string,
    handleCheck: PropTypes.func,
    labelSize: PropTypes.string,
    showValidation: PropTypes.bool,
    linkAlign: PropTypes.oneOf(["left", "center", "right"]),
};

PasswordControl.defaultProps = {
    link: "",
    width: 16,
    error: "",
    label: "",
    value: "",
    className: "",
    labelSize: "large",
    linkSize: "medium",
    linkAlign: "right",
    linkAction: () => {},
    handleCheck: () => {},
    showValidation: false,
};
