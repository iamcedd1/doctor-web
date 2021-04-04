import React, { useState, useEffect } from "react";

// COMPONENTS
import PasswordVerifyItem from "../password-verify-item";

// UTILS
import PropTypes from "prop-types";
import { isHasNumber, isHasSpecialChar, isHasUpperCase } from "../../../utils/helpers";

const PasswordVerifyControl = ({ password, handleCheck }) => {
    // STATES
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecial, setHasSpecial] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasStrength, setHasStrength] = useState(false);
    const [hasLength, setHasLength] = useState(false);
    const [valid, setValid] = useState(false);

    // FUNCTIONS
    const handleValidate = () => {
        let isValid = true;

        if (isHasNumber(password)) {
            setHasNumber(true);
        } else {
            setHasNumber(false);
            isValid = false;
        }

        if (isHasSpecialChar(password)) {
            setHasSpecial(true);
        } else {
            setHasSpecial(false);
            isValid = false;
        }

        if (isHasUpperCase(password)) {
            setHasUpperCase(true);
        } else {
            setHasUpperCase(false);
            isValid = false;
        }

        if (password.length < 8) {
            setHasLength(false);
        } else {
            setHasLength(true);
            isValid = true;
        }

        setValid(isValid);
    };

    useEffect(() => {
        handleValidate();
    }, [password]);

    useEffect(() => {
        let isValid = false;
        if (hasSpecial && hasLength && hasNumber && hasUpperCase) {
            setHasStrength(true);
            isValid = true;
        } else {
            setHasStrength(false);
        }

        handleCheck(isValid);
    }, [valid, hasSpecial, hasLength, hasNumber, hasUpperCase]);

    return (
        <React.Fragment>
            <PasswordVerifyItem
                name="numeric"
                status={hasNumber}
                label="Must have at least (1) numeric character."
            />
            <PasswordVerifyItem
                name="special"
                status={hasSpecial}
                label="Must have at least (1) special character."
            />
            <PasswordVerifyItem
                name="uppercase"
                status={hasUpperCase}
                label="Must have at least (1) uppercase."
            />
            <PasswordVerifyItem
                name="length"
                status={hasLength}
                label="Must be at least (8) characters long."
            />
            {hasStrength ? (
                <PasswordVerifyItem
                    status={true}
                    name="strength"
                    label="Password Strength: Strong"
                />
            ) : (
                <PasswordVerifyItem
                    name="strength"
                    status={false}
                    label="Password Strength: Weak"
                />
            )}
        </React.Fragment>
    );
};

export default PasswordVerifyControl;

PasswordVerifyControl.propTypes = {
    password: PropTypes.string,
    handleCheck: PropTypes.func,
};

PasswordVerifyControl.defaultProps = {
    password: "",
    handleCheck: () => {},
};
