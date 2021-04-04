import React, { useContext, useState } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import TitleControl from "../../../components/controls/title-control";
import ButtonControl from "../../../components/controls/button-control";
import PasswordControl from "../../../components/controls/password-control";

// UTILS
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { alertMessage } from "../../../utils/alert";

// CONTEXTS
import UserContext from "../../../../src/contexts/user";

const ChangePassword = () => {
    // CONTEXTS
    const { handleLogout } = useContext(UserContext);

    // STATES
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // ERROR STATES
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // FUNCTIONS
    const handleValidation = () => {
        let valid = true;

        if (oldPassword) {
            setOldPasswordError("");
        } else {
            setOldPasswordError("Enter old password");
            valid = false;
        }

        if (newPassword) {
            setNewPasswordError("");

            if (newPassword.length < 8) {
                setNewPasswordError("Password must contain atleast 8 characters.");
                valid = false;
            } else if (!validPassword) {
                setNewPasswordError("Password is invalid");
                valid = false;
            }
        } else {
            setNewPasswordError("Enter new password");
            valid = false;
        }

        if (confirmPassword) {
            setConfirmPasswordError("");
        } else {
            setConfirmPasswordError("Enter confirm password");
            valid = false;
        }

        if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                setConfirmPasswordError("");
            } else {
                setConfirmPasswordError("Password doesn't match");
                valid = false;
            }
        }

        return valid;
    };

    const handleSubmit = async () => {
        if (loading) return;
        const isValid = handleValidation();

        if (isValid) {
            setLoading(true);

            const params = {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
                application: system.appCode,
            };

            const res = await api.sso.PostMethod("/users/change-password", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { old_password, new_password, confirm_password } = data.errors;

                    if (old_password) setOldPasswordError(old_password);
                    if (new_password) setNewPasswordError(new_password);
                    if (confirm_password) setConfirmPasswordError(confirm_password);
                } else {
                    const { message } = data;

                    alertMessage.showSuccess({
                        text: message,
                        onClose: handleLogout,
                    });
                }

                setLoading(false);
            }
        }
    };

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column computer={6} tablet={12} mobile={16}>
                    <TitleControl as="h2" color="grey" title="Enter your password below" />
                    <Form autoComplete="off">
                        <Form.Group autoComplete="off">
                            <PasswordControl
                                maxLength={80}
                                name="oldPassword"
                                label="Old Password"
                                placeholder="Enter old password"
                                value={oldPassword}
                                error={oldPasswordError}
                                onChange={(e) => {
                                    setOldPasswordError("");
                                    setOldPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group autoComplete="off">
                            <PasswordControl
                                showValidation
                                maxLength={80}
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
                                name="confirmPassword"
                                label="Confirm New Password"
                                placeholder="Enter confirm password"
                                value={confirmPassword}
                                error={confirmPasswordError}
                                onChange={(e) => {
                                    setConfirmPasswordError("");
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={8}>
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

export default ChangePassword;
