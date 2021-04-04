import React, { useState, useContext, useRef, lazy } from "react";

// COMPONENTS
import { Form } from "semantic-ui-react";
import ReCAPTCHA from "react-google-recaptcha";
import LinkControl from "../../../components/controls/link-control";
import TextControl from "../../../components/controls/text-control";
import ErrorControl from "../../../components/controls/error-control";
import ImageControl from "../../../components/controls/image-control";
import TitleControl from "../../../components/controls/title-control";
import ButtonControl from "../../../components/controls/button-control";
import TextBoxControl from "../../../components/controls/textbox-control";
import PasswordControl from "../../../components/controls/password-control";
import SuspenseControl from "../../../components/controls/suspense-control";
import BoxContainer from "../../../components/controls/container/box-container";

// CONTEXTS
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import system from "../../../config/system";
import { withRouter } from "react-router-dom";
import { validateString, handleValidateRegex, getFirstLetter } from "../../../utils/helpers";

// MODALS
const ChangePassword = lazy(() => import("../../../modals/login/change-password"));
const TermsAndConditions = lazy(() => import("../../../modals/login/terms-and-conditions"));

const Login = ({ history }) => {
    // CONTEXTS
    const { setUser, setIsLogin, expiredLink } = useContext(UserContext);

    // STATES
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(false);

    // ERROR STATES
    const [errorCount, setErrorCount] = useState(0);
    const [captchaError, setCaptchaError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [responseError, setResponseError] = useState("");
    const [errorCaptcha, setErrorCaptcha] = useState(false);

    // MODAL STATES
    const [modalData, setModalData] = useState({});
    const [modalTerms, setModalTerms] = useState(false);
    const [modalReset, setModalReset] = useState(false);

    // REFS
    const recaptcha = useRef(null);

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = validateString({ allowLetters: false });

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
        setResponseError("");

        if (username) {
            setUsernameError("");
        } else {
            setUsernameError("Enter PRC number");
            valid = false;
        }

        if (password) {
            setPasswordError("");
        } else {
            setPasswordError("Enter password");
            valid = false;
        }

        if (errorCaptcha || errorCount > 0) {
            if (captcha) {
                setCaptchaError("");
            } else {
                setCaptchaError("Please enter captcha");
                valid = false;
            }
        } else {
            setCaptchaError("");
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
                password,
            };

            const res = await api.doctor.PostMethod("/users/login", params);
            const { data, status } = res;

            if (status === 200) {
                if (data) {
                    if (data.errors) {
                        const { username, password, error, message } = data.errors;

                        if (error === "Please enter captcha") {
                            setErrorCaptcha(true);
                            setCaptchaError(error);
                            setErrorCount(errorCount + 1);
                            if (username) setResponseError(username);
                        } else if (error) {
                            setResponseError(error);
                            setErrorCount(errorCount + 1);
                        } else {
                            let _message = "";
                            if (username) {
                                _message = username;
                            } else if (password) {
                                _message = password;
                            } else {
                                _message = message;
                            }

                            setResponseError(_message);
                            setErrorCount(errorCount + 1);
                        }

                        if (errorCount > 0) {
                            if (recaptcha.current) {
                                recaptcha.current.reset();
                                setCaptcha(false);
                            }
                        }
                    } else {
                        setErrorCount(0);
                        setCaptcha(false);
                        setCaptchaError("");
                        setErrorCaptcha(false);

                        const {
                            token,
                            user_id,
                            last_name,
                            first_name,
                            is_assistant,
                            is_first_time,
                            is_bank_updated,
                            is_terms_updated,
                        } = data;

                        const name = `${first_name} ${last_name}`;
                        const initials = `${getFirstLetter(first_name)}${getFirstLetter(
                            last_name
                        )}`;
                        const user = {
                            name,
                            initials,
                            bankSetup: is_bank_updated,
                            userType: is_assistant ? "A" : "D",
                        };

                        if (token) {
                            setIsLogin(true);

                            user["token"] = token;
                            setUser(user);
                            history.push("/");
                        } else {
                            setModalData({ user, username, user_id });
                            if (!is_terms_updated) {
                                setModalTerms(true);
                            } else if (is_first_time) {
                                setModalReset(is_first_time);
                            }
                        }
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
                <BoxContainer>
                    <ImageControl
                        centered
                        size="large"
                        alt="DoctorLink"
                        source={system.logo}
                        title="Maxicare DoctorLink"
                    />
                </BoxContainer>
                <TitleControl as="h1" size="huge" title={`Log in to ${system.appName}`} />

                {expiredLink && (
                    <TextControl color="red" text="The link has expired, please try again." />
                )}

                {responseError && responseError?.includes("locked") ? (
                    <TextControl color="red">
                        Your account has been locked due to excessive tries. Please reset your
                        password{" "}
                        <LinkControl
                            text="here"
                            handleClick={() => {
                                history.push("/forgot-password");
                            }}
                        />
                        .
                    </TextControl>
                ) : (
                    <ErrorControl error={responseError} />
                )}

                <Form autoComplete="off">
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
                        <PasswordControl
                            size="large"
                            maxLength={80}
                            linkSize="large"
                            name="password"
                            label="Password"
                            value={password}
                            labelSize="large"
                            error={passwordError}
                            link="Forgot Password?"
                            placeholder="Enter password"
                            linkAction={() => history.push("/forgot-password")}
                            onChange={(e) => {
                                setPasswordError("");
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>

                    {(errorCount > 0 || errorCaptcha) && (
                        <div data-cy="mdCaptcha">
                            <ReCAPTCHA
                                tabindex={1}
                                ref={recaptcha}
                                onChange={() => setCaptcha(true)}
                                sitekey="6Lezv6UZAAAAAObfOg_2xiDtENANDEYgmD5Bi5GH"
                            />
                            {captchaError && <ErrorControl name="captcha" error={captchaError} />}
                        </div>
                    )}

                    <Form.Group>
                        <Form.Field width={16}>
                            <ButtonControl
                                fluid
                                padded
                                text="Login"
                                name="login"
                                loading={loading}
                                size="large"
                                onClick={handleSubmit}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <BoxContainer centered>
                    <p>
                        Don&apos;t have an account?{" "}
                        <LinkControl
                            name="register"
                            text="Sign up here."
                            handleClick={() => history.push("/verify-user")}
                        />
                    </p>
                </BoxContainer>

                <SuspenseControl>
                    {modalTerms && (
                        <TermsAndConditions
                            visible={modalTerms}
                            modalData={modalData}
                            handleClose={() => setModalTerms(false)}
                            handleReset={() => {
                                setModalTerms(false);
                                setModalReset(true);
                            }}
                        />
                    )}
                    {modalReset && (
                        <ChangePassword
                            visible={modalReset}
                            modalData={modalData}
                            handleClose={() => setModalReset(false)}
                        />
                    )}
                </SuspenseControl>
            </div>
        </div>
    );
};

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
