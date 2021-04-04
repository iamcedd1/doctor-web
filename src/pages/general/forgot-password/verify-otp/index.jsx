import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import OtpInput from "react-otp-input";
import { Form, Grid } from "semantic-ui-react";
import LinkControl from "../../../../components/controls/link-control";
import TextControl from "../../../../components/controls/text-control";
import TitleControl from "../../../../components/controls/title-control";
import LabelControl from "../../../../components/controls/label-control";
import ErrorControl from "../../../../components/controls/error-control";
import ButtonControl from "../../../../components/controls/button-control";
import DimmerControl from "../../../../components/controls/dimmer-control";
import BoxContainer from "../../../../components/controls/container/box-container";

// CONTEXTS
import UserContext from "../../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../../utils/api";
import { withRouter } from "react-router-dom";
import { isObjectEmpty } from "../../../../utils/helpers";

const ForgotPassword = ({ location, history }) => {
    // CONTEXTS
    const { forgotOtp, setForgotUser } = useContext(UserContext);

    // STATES
    const [otp, setOtp] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // TIMER STATES
    const [resend, setResend] = useState(false);
    const [intervalId, setIntervalId] = useState();
    const [resendCount, setResendCount] = useState(60);

    // ERROR STATES
    const [otpError, setOtpError] = useState("");

    // FUNCTIONS
    const handleValidation = () => {
        let valid = true;

        if (otp) {
            setOtpError("");
        } else {
            setOtpError("Enter OTP");
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async () => {
        const isValid = handleValidation();

        if (isValid) {
            if (loading) return;

            setLoading(true);
            const params = {
                otp,
                user_id: userData.user_id,
            };

            const res = await api.sso.PostMethod(
                "/users/doctorlink/forgot-password/verify-otp",
                params
            );
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { otp, user_id } = data.errors;

                    if (otp) setOtpError(otp);
                    if (user_id)
                        setOtpError(
                            "The OTP that you have entered is either incorrect or expired. Please try again."
                        );
                    setLoading(false);
                } else {
                    setLoading(false);
                    setForgotUser(data);
                    history.push("/reset-password");
                }
            } else if (status === 403) {
                history.push("/error/403");
            } else {
                history.push("/error/500");
            }
        }
    };

    const handleResend = async () => {
        setResend(true);
        const params = {
            user_id: userData.user_id,
        };

        const res = await api.sso.PostMethod(
            "/users/doctorlink/forgot-password/resend-otp",
            params
        );
        const { data, status } = res;

        if (status === 200) {
            if (data.errors) {
                const { otp } = data.errors;
                if (otp) setOtpError(otp);
            } else {
                return;
            }
        } else if (status === 403) {
            history.push("/error/403");
        } else {
            history.push("/error/500");
        }
    };

    useEffect(() => {
        if (resend) {
            let remaining = 60;
            const id = setInterval(() => {
                remaining -= 1;
                setResendCount(remaining);
            }, 1000);

            setIntervalId(id);
        }
    }, [resend]);

    useEffect(() => {
        if (resend && resendCount === 0) {
            clearInterval(intervalId);
            setResendCount(60);
            setResend(false);
        }
    }, [resend && resendCount]);

    useEffect(() => {
        if (isObjectEmpty(forgotOtp)) {
            history.push("/forgot-password");
            return;
        } else {
            setUserData(forgotOtp);
            setFetching(false);
        }
    }, [location]);

    return fetching ? (
        <DimmerControl />
    ) : (
        <Grid padded centered className="mdGeneralContainer">
            <Grid.Row>
                <Grid.Column computer={8} tablet={12} mobile={16}>
                    <BoxContainer centered>
                        <TitleControl
                            as="h1"
                            size="huge"
                            spacing="none"
                            title="Forgot Your Password?"
                        />
                        <TitleControl
                            as="h2"
                            header
                            spacing="none"
                            size="medium"
                            title="This extra step shows it's really you trying to sign in"
                        />
                    </BoxContainer>
                    <TextControl centered color="greyDark" text={userData.message} />
                    <Form autoComplete="off">
                        <Form.Group>
                            <Form.Field
                                width={16}
                                error={otpError && true}
                                className="mdInputOtp mdMarginTop-16 mdMarginBottom-16"
                            >
                                <OtpInput
                                    value={otp}
                                    numInputs={6}
                                    hasErrored={true}
                                    separator={" — "}
                                    onChange={(code) => {
                                        if (!isNaN(code)) {
                                            setOtp(code);
                                            setOtpError("");
                                        }
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        {otpError && (
                            <Form.Group>
                                <Form.Field width={16}>
                                    <BoxContainer centered>
                                        <ErrorControl name="otp" error={otpError} />
                                    </BoxContainer>
                                </Form.Field>
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Form.Field width={2} />
                            <Form.Field width={12}>
                                <ButtonControl
                                    fluid
                                    name="validate"
                                    text="Validate"
                                    loading={loading}
                                    onClick={handleSubmit}
                                />
                            </Form.Field>
                            <Form.Field width={2} />
                        </Form.Group>
                    </Form>
                    <BoxContainer centered>
                        <LabelControl label="Didn't get the code?" />
                    </BoxContainer>
                    <BoxContainer centered>
                        <LinkControl
                            name="resend"
                            disabled={resend}
                            text="Resend code"
                            handleClick={handleResend}
                        >
                            {resend && ` (${resendCount}s)`}
                        </LinkControl>
                    </BoxContainer>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(ForgotPassword);

ForgotPassword.propTypes = {
    location: PropTypes.any,
    history: PropTypes.any,
};
