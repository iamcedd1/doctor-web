import React, { useState, useContext, Fragment, useEffect } from "react";

// COMPONENTS
import { Form, Checkbox } from "semantic-ui-react";
import LinkControl from "../../../components/controls/link-control";
import ImageControl from "../../../components/controls/image-control";
import TitleControl from "../../../components/controls/title-control";
import LabelControl from "../../../components/controls/label-control";
import ErrorControl from "../../../components/controls/error-control";
import ButtonControl from "../../../components/controls/button-control";
import TextBoxControl from "../../../components/controls/textbox-control";
import TextAreaControl from "../../../components/controls/text-area-control";
import CheckboxControl from "../../../components/controls/checkbox-control";
import PasswordControl from "../../../components/controls/password-control";
import BoxContainer from "../../../components/controls/container/box-container";
import GridContainer from "../../../components/controls/container/grid-container";
import FlexContainer from "../../../components/controls/container/flex-container";
import TeleconsultData from "../../../components/general/register/teleconsult-data";

// CONTEXTS
import UserContext from "../../../contexts/user";

// DATA
import { REGISTER_TELECONSULT_CHANNELS } from "../../../data/user";

// MODALS
import TermsAndConditions from "../../../modals/register/terms-and-conditions";
import TeleconsultSchedule from "../../../modals/register/teleconsult-schedule";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../utils/alert";
import { isValidEmail, validateString, handleValidateRegex } from "../../../utils/helpers";

const Register = ({ history }) => {
    // CONTEXTS
    const { register, teleSchedules, setTeleSchedules } = useContext(UserContext);

    // STATES
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [terms, setTerms] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otherChannel, setOtherChannel] = useState("");
    const [teleChannels, setTeleChannels] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    // MODAL STATES
    const [modalTerms, setModalTerms] = useState(false);
    const [modalSchedule, setModalSchedule] = useState(false);

    // ERROR STATES
    const [termsError, setTermsError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [channelError, setChannelError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [scheduleError, setScheduleError] = useState("");
    const [otherChannelError, setOtherChannelError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        let regex = validateString({ allowedCharacters: ".@_-" });

        if (["email"].includes(name)) {
            handleValidateRegex({
                regex,
                value,
                handleSet: setEmail,
                handleSetError: setEmailError,
            });
        } else if (["mobile"].includes(name)) {
            setMobile(value);
            setMobileError("");
        } else if (["other"].includes(name)) {
            regex = validateString({ allowSpaces: true });
            handleValidateRegex({
                regex,
                value,
                handleSet: setOtherChannel,
                handleSetError: setOtherChannelError(""),
            });
        }
    };

    const handleValidation = () => {
        let valid = true;

        if (password) {
            setPasswordError("");

            if (password.length < 8) {
                setPasswordError("Password must contain atleast 8 characters.");
                valid = false;
            } else if (!validPassword) {
                setPasswordError("Password is invalid");
                valid = false;
            }
        } else {
            setPasswordError("Enter password");
            valid = false;
        }

        if (confirmPassword) {
            setConfirmPasswordError("");
        } else {
            setConfirmPasswordError("Enter confirm password");
            valid = false;
        }

        if (password && confirmPassword) {
            if (password === confirmPassword) {
                setConfirmPasswordError("");
            } else {
                setConfirmPasswordError("Password doesn't match");
                valid = false;
            }
        }

        if (mobile) {
            setMobileError("");
        } else {
            setMobileError("Enter mobile number");
            valid = false;
        }

        if (email) {
            if (isValidEmail(email)) {
                setEmailError("");
            } else {
                setEmailError("Email address is already taken or invalid");
                valid = false;
            }
        } else {
            setEmailError("Enter email address");
            valid = false;
        }

        if (teleChannels.length > 0) {
            setChannelError("");

            if (teleChannels.includes("O")) {
                if (otherChannel) {
                    setOtherChannelError("");
                } else {
                    setOtherChannelError("Specify other teleconsultation channel");
                    valid = false;
                }
            }
        } else {
            setChannelError("Select teleconsultation channel");
            valid = false;
        }

        if (teleSchedules.length > 0) {
            setScheduleError("");
        } else {
            setScheduleError("Add teleconsultation schedule");
            valid = false;
        }

        if (terms) {
            setTermsError("");
        } else {
            setTermsError("Please accept terms and conditions");
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
                ...register,
                mobile_no: mobile?.replace("+63 ", ""),
                email_address: email,
                password,
                confirm_password: confirmPassword,
                teleconsultation_channel: teleChannels,
                channel_others: otherChannel,
                teleconsultation_schedule: teleSchedules.map((item) => {
                    const times = item.times?.map(({ from, to }) => {
                        return { from, to };
                    });

                    return { days: item.days, time: times };
                }),
            };
            const res = await api.doctor.PostMethod("/users/register", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    const {
                        first_name,
                        middle_name,
                        last_name,
                        suffix,
                        prc_no,
                        mobile_no,
                        email_address,
                        password,
                        confirm_password,
                        teleconsultation_channel,
                        channel_others,
                        teleconsultation_schedule,
                    } = data.errors;

                    if (first_name || middle_name || last_name || suffix || prc_no) {
                        alertMessage.showError({
                            title: "Registration Failed",
                            text: "Something went wrong. Please try again later.",
                        });
                    }

                    if (mobile_no === "Mobile already exist")
                        setMobileError("Mobile number already linked to an account.");
                    else setMobileError(mobile_no);
                    if (email_address === "Email address already exist")
                        setEmailError("Email address already linked to an account.");
                    else setEmailError(email_address);
                    if (password) setPasswordError(password);
                    if (confirm_password) setConfirmPasswordError(confirm_password);
                    if (teleconsultation_channel) setChannelError(teleconsultation_channel);
                    if (channel_others) setOtherChannelError(channel_others);
                    if (teleconsultation_schedule) setScheduleError(teleconsultation_schedule);
                } else {
                    alertMessage.showSuccess({
                        title: "An email has been sent to you for email address verification.",
                        confirmButtonText: "Confirm",
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

            setLoading(false);
        }
    };

    useEffect(() => {
        if (!register.prc_no) {
            history.push("/verify-user");
        }

        return () => {
            setTeleSchedules([]);
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="content-container">
                <BoxContainer>
                    <ImageControl
                        centered
                        size="large"
                        alt="DoctorLink"
                        source={system.logo}
                        title="Maxicare DoctorLink"
                    />
                </BoxContainer>
                <TitleControl as="h1" size="large" title="Sign up now" />
                <Form unstackable autoComplete="off">
                    <Form.Group>
                        <TextBoxControl
                            maxLength={14}
                            name="mobile"
                            value={mobile}
                            mask={[
                                "+",
                                "6",
                                "3",
                                " ",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                            ]}
                            labelSize="large"
                            error={mobileError}
                            label="Mobile Number"
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextBoxControl
                            name="email"
                            value={email}
                            maxLength={80}
                            labelSize="large"
                            error={emailError}
                            label="Email Address"
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                    </Form.Group>
                    <Form.Group>
                        <PasswordControl
                            showValidation
                            maxLength={80}
                            name="password"
                            label="Password"
                            value={password}
                            labelSize="large"
                            error={passwordError}
                            placeholder="Enter password"
                            onChange={(e) => {
                                setPasswordError("");
                                setPassword(e.target.value);
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
                        <Form.Field className="mdMarginTop-16">
                            <TitleControl as="h3" title="Teleconsultation Details" />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group className="mdMarginTop-16">
                        <Form.Field width={16} error={channelError}>
                            <LabelControl
                                size="large"
                                className="no-spacing"
                                label="Teleconsultation Channel"
                            />
                            <GridContainer columns={2}>
                                {REGISTER_TELECONSULT_CHANNELS.map((item) => (
                                    <CheckboxControl
                                        key={item.code}
                                        label={item.name}
                                        value={item.code}
                                        filterItems={teleChannels}
                                        handleChange={setTeleChannels}
                                    />
                                ))}
                            </GridContainer>
                            <ErrorControl name="channel" error={channelError} />
                        </Form.Field>
                    </Form.Group>

                    {teleChannels.includes("O") && (
                        <Form.Group>
                            <TextAreaControl
                                name="other"
                                maxLength={1000}
                                labelSize="large"
                                value={otherChannel}
                                label="Other Channel"
                                onChange={handleChange}
                                error={otherChannelError}
                                placeholder="Enter other channel"
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mdMarginTop-16">
                        <Form.Field width={16}>
                            {teleSchedules.length > 0 && (
                                <Fragment>
                                    <LabelControl size="large" label="Teleconsultation Schedule" />
                                    <TeleconsultData />
                                </Fragment>
                            )}
                            <ButtonControl
                                basic
                                fluid
                                icon="plus"
                                name="addSchedule"
                                text="Add Schedule"
                                onClick={() => setModalSchedule(true)}
                            />
                            <ErrorControl name="schedule" error={scheduleError} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group className="mdMarginTop-16">
                        <Form.Field error={termsError}>
                            <FlexContainer centered className="mdPaddingTop-16">
                                <Checkbox
                                    data-cy="mdCheckbox-terms"
                                    className="mdMarginRight-10"
                                    onChange={() => {
                                        setTerms(!terms);
                                        setTermsError("");
                                    }}
                                />
                                <p className="size-normal">
                                    I confirm that I have read and fully understood the{" "}
                                    <LinkControl
                                        text="Terms and Conditions"
                                        handleClick={() => setModalTerms(true)}
                                    />{" "}
                                    herein.
                                </p>
                            </FlexContainer>
                            <ErrorControl name="terms" error={termsError} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <ButtonControl
                                fluid
                                padded
                                name="register"
                                loading={loading}
                                disabled={!terms}
                                text="Register Account"
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

                {modalSchedule && (
                    <TeleconsultSchedule
                        visible={modalSchedule}
                        handleClose={() => setModalSchedule(false)}
                    />
                )}

                {modalTerms && (
                    <TermsAndConditions
                        visible={modalTerms}
                        handleClose={() => setModalTerms(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default withRouter(Register);

Register.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
