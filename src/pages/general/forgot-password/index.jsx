import React, { Fragment, useState } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import TextControl from "../../../components/controls/text-control";
import TitleControl from "../../../components/controls/title-control";
import ButtonControl from "../../../components/controls/button-control";
import TextBoxControl from "../../../components/controls/textbox-control";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { withRouter } from "react-router-dom";
import { handleValidateRegex, validateString } from "../../../utils/helpers";
import SuspenseControl from "../../../components/controls/suspense-control";
import VerificationMethod from "../../../modals/forgot-password/verification-method";

const ForgotPassword = ({ history }) => {
    // STATES
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    // ERROR STATES
    const [usernameError, setUsernameError] = useState("");

    // MODAL STATES
    const [modalData, setModalData] = useState({});
    const [modalMethod, setModalMethod] = useState(false);

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        let regex = validateString({ allowLetters: false });

        if (["username"].includes(name)) {
            handleValidateRegex({
                regex,
                value,
                handleSet: setUsername,
                handleSetError: setUsernameError,
            });
        }
    };

    const handleValidation = () => {
        let valid = true;

        if (username) {
            setUsernameError("");
        } else {
            setUsernameError("Enter PRC number");
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
                username,
                application: "DW",
            };

            const res = await api.sso.PostMethod("/users/doctorlink/forgot-password", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { message } = data.errors;
                    if (message) setUsernameError(message);
                    setLoading(false);
                } else {
                    setLoading(false);

                    const { email, mobile, user_id } = data;
                    if (user_id) {
                        setModalData({ mobile, email, user_id });
                        setModalMethod(true);
                    }
                }
            } else if (status === 403) {
                history.push("/error/403");
            } else {
                history.push("/error/500");
            }
        }
    };

    return (
        <Fragment>
            <Grid padded centered className="mdGeneralContainer">
                <Grid.Row>
                    <Grid.Column computer={8} tablet={12} mobile={16}>
                        <TitleControl as="h1" title="Forgot your password?" />
                        <TextControl text="Fill out the information below and instructions will be sent to your registered contact information." />
                        <Form>
                            <Form.Group>
                                <TextBoxControl
                                    autoFocus
                                    size="large"
                                    maxLength={20}
                                    name="username"
                                    value={username}
                                    labelSize="large"
                                    label="PRC Number"
                                    error={usernameError}
                                    placeholder="Enter PRC number"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Field>
                                    <ButtonControl
                                        fluid
                                        padded
                                        loading={loading}
                                        onClick={handleSubmit}
                                        text="Request reset instructions"
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <SuspenseControl>
                {modalMethod && (
                    <VerificationMethod
                        visible={modalMethod}
                        modalData={modalData}
                        handleClose={() => setModalMethod(false)}
                    />
                )}
            </SuspenseControl>
        </Fragment>
    );
};

export default withRouter(ForgotPassword);

ForgotPassword.propTypes = {
    history: PropTypes.any,
};
