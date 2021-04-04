import React, { useState } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import ModalControl from "../../../components/controls/modal-control";
import ButtonControl from "../../../components/controls/button-control";
import PasswordControl from "../../../components/controls/password-control";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { alertMessage } from "../../../utils/alert";

const ChangePassword = ({ visible, modalData, handleClose }) => {
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
                username: modalData?.username,
            };

            const res = await api.sso.PostMethod("/users/doctorlink/change-password", params);
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
                        text:
                            message ??
                            "Your password has been successfully changed. You may now proceed with your new login credentials.",
                        onClose: handleClose,
                    });
                }
            }

            setLoading(false);
        }
    };

    return (
        <ModalControl
            customed
            size="tiny"
            centered={false}
            visible={visible}
            name="changePassword"
            title="Change Password"
            handleClose={handleClose}
            titleLabel="Change your auto-generated password to proceed."
        >
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form autoComplete="off">
                            <Form.Group autoComplete="off">
                                <PasswordControl
                                    maxLength={80}
                                    labelSize="large"
                                    name="oldPassword"
                                    label="Old Password"
                                    value={oldPassword}
                                    error={oldPasswordError}
                                    placeholder="Enter old password"
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
                            <Form.Group autoComplete="off">
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
                                <Form.Field width={16}>
                                    <ButtonControl
                                        fluid
                                        padded
                                        text="Submit"
                                        loading={loading}
                                        name="changePassword"
                                        onClick={handleSubmit}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default ChangePassword;

ChangePassword.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    handleClose: PropTypes.func,
};

ChangePassword.defaultProps = {
    visible: false,
    handleClose: () => {},
};
