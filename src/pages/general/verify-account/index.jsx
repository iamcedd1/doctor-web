import React, { useState, useEffect } from "react";

// COMPONENTS
import OtpInput from "react-otp-input";
import { Form } from "semantic-ui-react";
import TextControl from "../../../components/controls/text-control";
import LinkControl from "../../../components/controls/link-control";
import TitleControl from "../../../components/controls/title-control";
import ImageControl from "../../../components/controls/image-control";
import ErrorControl from "../../../components/controls/error-control";
import LabelControl from "../../../components/controls/label-control";
import ButtonControl from "../../../components/controls/button-control";
import DimmerControl from "../../../components/controls/dimmer-control";
import BoxContainer from "../../../components/controls/container/box-container";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../utils/alert";

const VerifyAccount = ({ location, history }) => {
    // STATES
    const [otp, setOtp] = useState("");
    const [user, setUser] = useState("");
    const [counter, setCounter] = useState(1);
    const [message, setMessage] = useState("");
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
                user_id: user,
            };

            const res = await api.doctor.PostMethod("/users/register/verify-otp", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const { otp } = data.errors;

                    if (otp) setOtpError(otp);
                    setLoading(false);
                } else {
                    const { message } = data;
                    alertMessage.showSuccess({
                        confirmButtonText: "Confirm",
                        title: "Verification Successful!",
                        text: message,
                        onClose: () => {
                            history.push("/login");
                        },
                    });
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
            user_id: user,
        };

        const res = await api.sso.PostMethod("/users/register/resend-otp", params);
        const { data, status } = res;

        if (status === 200) {
            if (data.errors) {
                const { otp } = data.errors;
                if (otp) setOtpError(otp);
            } else {
                setResend(true);
            }
        } else if (status === 403) {
            history.push("/error/403");
        } else {
            history.push("/error/500");
        }
    };

    const handleLoad = async () => {
        let error = false;
        const search = location.search
            ?.replace("?", "")
            .split("&")
            .map((param) => param.split("="))
            .reduce((values, [key, value]) => {
                values[key] = value;
                return values;
            }, {});

        if (search.token) {
            const params = {
                application: system.appCode,
                invite_token: search.token,
            };
            const res = await api.sso.PostMethod("/users/register/verify-link", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    error = true;
                } else {
                    const { user_id, message, is_valid } = data;
                    if (is_valid) {
                        setMessage(message);
                        setUser(user_id);
                        setFetching(false);
                        return;
                    } else {
                        error = true;
                    }
                }
            } else {
                error = true;
            }

            if (error) {
                if (counter <= 3) {
                    setCounter(counter + 1);
                    return;
                } else {
                    history.replace("/login");
                }
            }
        } else {
            history.replace("/login");
        }
    };

    useEffect(() => {
        if (counter <= 4) handleLoad();
    }, [counter]);

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

    return fetching ? (
        <DimmerControl />
    ) : (
        <div className="wrapper">
            <div className="content-container">
                <BoxContainer padded>
                    <ImageControl
                        centered
                        size="large"
                        alt="DoctorLink"
                        source={system.logo}
                        title="Maxicare DoctorLink"
                    />
                </BoxContainer>
                <BoxContainer centered>
                    <TitleControl as="h1" size="huge" title="Enter One Time Pin" />
                </BoxContainer>
                <BoxContainer padded="horizontal">
                    <TextControl centered color="greyDark">
                        {`${message} Please enter the code below.`}
                    </TextControl>
                </BoxContainer>
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
                    <Form.Group>
                        <Form.Field width={16}>
                            <BoxContainer centered>
                                <ErrorControl name="otp" error={otpError} />
                            </BoxContainer>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <ButtonControl
                                fluid
                                padded
                                name="validate"
                                text="Validate"
                                loading={loading}
                                onClick={handleSubmit}
                            />
                        </Form.Field>
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
            </div>
        </div>
    );
};

export default withRouter(VerifyAccount);

VerifyAccount.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
