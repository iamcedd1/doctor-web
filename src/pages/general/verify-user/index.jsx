import React, { useState, useContext } from "react";

// COMPONENTS
import { Form } from "semantic-ui-react";
import LinkControl from "../../../components/controls/link-control";
import ImageControl from "../../../components/controls/image-control";
import TitleControl from "../../../components/controls/title-control";
import ButtonControl from "../../../components/controls/button-control";
import TextBoxControl from "../../../components/controls/textbox-control";
import BoxContainer from "../../../components/controls/container/box-container";

// CONTEXTS
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../utils/alert";
import { validateString, handleValidateRegex } from "../../../utils/helpers";

const VerifyUser = ({ history }) => {
    // CONTEXTS
    const { setRegister } = useContext(UserContext);

    // STATES
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [suffix, setSuffix] = useState("");
    const [prcNumber, setPrcNumber] = useState("");

    // ERROR STATES
    const [firstNameError, setFirstNameError] = useState("");
    const [middleNameError, setMiddleNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [suffixError, setSuffixError] = useState("");
    const [prcNumberError, setPrcNumberError] = useState("");

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        let regex = validateString({
            allowSpaces: true,
            allowedCharacters: "èéēÈÉĒ\u00f1\u00d1.,'\"-",
        });

        if (["firstName"].includes(name)) {
            handleValidateRegex({
                value,
                regex,
                handleSet: setFirstName,
                handleSetError: setFirstNameError,
            });
        } else if (["middleName"].includes(name)) {
            handleValidateRegex({
                value,
                regex,
                handleSet: setMiddleName,
                handleSetError: setMiddleNameError,
            });
        } else if (["lastName"].includes(name)) {
            handleValidateRegex({
                value,
                regex,
                handleSet: setLastName,
                handleSetError: setLastNameError,
            });
        } else if (["suffix"].includes(name)) {
            handleValidateRegex({
                value,
                regex,
                handleSet: setSuffix,
                handleSetError: setSuffixError,
            });
        } else if (["prc"].includes(name)) {
            regex = validateString({ allowLetters: false });
            handleValidateRegex({
                regex,
                value,
                handleSet: setPrcNumber,
                handleSetError: setPrcNumberError,
            });
        }
    };

    const handleValidation = () => {
        let valid = true;

        if (firstName) {
            setFirstNameError("");
        } else {
            setFirstNameError("Enter first name");
            valid = false;
        }

        if (lastName) {
            setLastNameError("");
        } else {
            setLastNameError("Enter last name");
            valid = false;
        }

        if (prcNumber) {
            setPrcNumberError("");
        } else {
            setPrcNumberError("Enter PRC number");
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async () => {
        if (loading) return;
        const isValid = handleValidation();

        if (isValid) {
            setLoading(true);
            const params = {
                suffix,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                prc_no: prcNumber,
            };

            const res = await api.doctor.PostMethod("/users/verify-doctor", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { prc_no } = data.errors;
                    if (prc_no) setPrcNumberError(prc_no);
                } else {
                    const { is_valid } = data;
                    if (is_valid) {
                        setRegister(params);
                        history.push("/register");
                    } else {
                        alertMessage.showError({
                            title: "Verification Failed",
                            text: "Something went wrong. Please try again.",
                        });
                    }
                }
            } else {
                history.push("/error/500");
            }

            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="content-container">
                <ImageControl
                    centered
                    size="large"
                    alt="DoctorLink"
                    source={system.logo}
                    title="Maxicare DoctorLink"
                />
                <TitleControl as="h1" size="huge" title="Sign up now" />
                <Form autoComplete="off">
                    <Form.Group>
                        <TextBoxControl
                            maxLength={80}
                            name="firstName"
                            label="First Name"
                            value={firstName}
                            labelSize="large"
                            error={firstNameError}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <TextBoxControl
                            maxLength={80}
                            name="middleName"
                            label="Middle Name"
                            value={middleName}
                            labelSize="large"
                            error={middleNameError}
                            onChange={handleChange}
                            placeholder="Enter middle name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <TextBoxControl
                            maxLength={80}
                            name="lastName"
                            label="Last Name"
                            value={lastName}
                            labelSize="large"
                            error={lastNameError}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <TextBoxControl
                            width={8}
                            maxLength={10}
                            name="suffix"
                            label="Suffix"
                            value={suffix}
                            labelSize="large"
                            error={suffixError}
                            onChange={handleChange}
                            placeholder="Enter suffix (optional)"
                        />
                    </Form.Group>
                    <Form.Group>
                        <TextBoxControl
                            name="prc"
                            maxLength={20}
                            label="PRC Number"
                            value={prcNumber}
                            labelSize="large"
                            error={prcNumberError}
                            onChange={handleChange}
                            placeholder="Enter PRC number"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <ButtonControl
                                fluid
                                padded
                                text="Proceed"
                                name="proceed"
                                loading={loading}
                                onClick={handleSubmit}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <BoxContainer centered>
                    <p>
                        Already have an account?{" "}
                        <LinkControl
                            text="Login here."
                            handleClick={() => history.push("/login")}
                        />
                    </p>
                </BoxContainer>
            </div>
        </div>
    );
};

export default withRouter(VerifyUser);

VerifyUser.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
