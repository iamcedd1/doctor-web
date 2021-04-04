import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import TitleControl from "../../../../components/controls/title-control";
import ButtonControl from "../../../../components/controls/button-control";
import DimmerControl from "../../../../components/controls/dimmer-control";
import PasswordControl from "../../../../components/controls/password-control";

// CONTEXTS
import UserContext from "../../../../contexts/user";

//UTILS
import PropTypes from "prop-types";
import { api } from "../../../../utils/api";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../../utils/alert";
import { isObjectEmpty } from "../../../../utils/helpers";

const ResetPassword = ({ history, location }) => {
    // CONTEXTS
    const { forgotUser, setExpiredLink } = useContext(UserContext);

    // STATES
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // ERROR STATES
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleValidation = () => {
        let valid = true;

        if (newPassword) {
            setNewPasswordError("");

            if (newPassword.length < 8) {
                setNewPasswordError("Password must contain atleast 8 characters.");
                valid = false;
            } else if (!validPassword) {
                setNewPasswordError("Password does not meet the requirements. Please try again");
                valid = false;
            }
        } else {
            setNewPasswordError("Enter password");
            valid = false;
        }

        if (confirmPassword) {
            setConfirmPasswordError("");
        } else {
            setConfirmPasswordError("Enter confirm password");
            valid = false;
        }

        if (newPassword && confirmPassword && validPassword) {
            if (newPassword === confirmPassword) {
                setConfirmPasswordError("");
            } else {
                setConfirmPasswordError("Password does not match. Please try again");
                valid = false;
            }
        }

        return valid;
    };

    const handleSubmit = async () => {
        const isValid = handleValidation();

        if (isValid) {
            if (loading) return;

            setLoading(true);
            const params = {
                new_password: newPassword,
                user_id: userData.user_id,
                confirm_password: confirmPassword,
            };

            const res = await api.sso.PostMethod("/users/reset-password", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { new_password, confirm_password } = data.errors;
                    setNewPasswordError(new_password);
                    setConfirmPasswordError(confirm_password);

                    setLoading(false);
                } else {
                    setLoading(false);
                    alertMessage.showSuccess({
                        title: "Password Reset",
                        text:
                            "Great job on recovering your account, you can now access your account through the login page.",
                        onClose: () => history.push("/"),
                    });
                }
            } else if (status === 403) {
                history.push("/error/403");
            } else {
                history.push("/error/500");
            }
        }
    };

    useEffect(() => {
        async function handleLoad() {
            if (!isObjectEmpty(forgotUser)) {
                setUserData(forgotUser);
                setFetching(false);
                return;
            } else {
                const params = location.search
                    ?.replace("?", "")
                    .split("&")
                    .map((param) => param.split("="))
                    .reduce((values, [key, value]) => {
                        values[key] = value;
                        return values;
                    }, {});

                if (params.token) {
                    const res = await api.sso.PostMethod(
                        "/users/forgot-password/verify-link",
                        params
                    );
                    const { data, status } = res;

                    if (status === 200) {
                        if (data.errors) {
                            setExpiredLink(true);
                            history.replace("/login");
                        } else {
                            setUserData(data);
                            setFetching(false);
                        }
                    } else {
                        setExpiredLink(true);
                        history.replace("/login");
                    }
                } else {
                    setExpiredLink(true);
                    history.replace("/login");
                }
            }
        }

        handleLoad();
    }, [location]);

    return fetching ? (
        <DimmerControl />
    ) : (
        <Grid className="mdGeneralContainer">
            <Grid.Row centered>
                <Grid.Column computer={6} tablet={12} mobile={16}>
                    <TitleControl as="h1" spacing="none" title="Reset Your Password" />
                    <TitleControl
                        header
                        as="h2"
                        spacing="none"
                        title="Enter your new password below"
                    />
                    <Form autoComplete="off">
                        <Form.Group>
                            <PasswordControl
                                showValidation
                                maxLength={80}
                                labelSize="large"
                                name="newPassword"
                                label="New Password"
                                value={newPassword}
                                error={newPasswordError}
                                placeholder="Enter new password"
                                onChange={(e) => {
                                    setNewPasswordError("");
                                    setNewPassword(e.target.value);
                                }}
                                handleCheck={(valid) => setValidPassword(valid)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <PasswordControl
                                maxLength={80}
                                labelSize="large"
                                name="confirmPassword"
                                label="Confirm Password"
                                value={confirmPassword}
                                error={confirmPasswordError}
                                placeholder="Enter confirm password"
                                onChange={(e) => {
                                    setConfirmPasswordError("");
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={12}>
                                <ButtonControl
                                    padded
                                    fluid
                                    name="proceed"
                                    text="Proceed"
                                    loading={loading}
                                    onClick={handleSubmit}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(ResetPassword);

ResetPassword.propTypes = {
    location: PropTypes.any,
    history: PropTypes.any,
};
