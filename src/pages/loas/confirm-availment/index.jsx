import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import ErrorControl from "../../../components/controls/error-control";
import ButtonControl from "../../../components/controls/button-control";
import SelectControl from "../../../components/controls/select-control";
import TextBoxControl from "../../../components/controls/textbox-control";
import BoxContainer from "../../../components/controls/container/box-container";

// CONTEXTS
import AppContext from "../../../contexts/app";

// DATA
import { DIAGNOSES } from "../../../data/generic";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../utils/alert";
import { validateString, handleValidateRegex } from "../../../utils/helpers";

const ConfirmAvailment = ({ history }) => {
    // CONTEXTS
    const { isConnected } = useContext(AppContext);

    // STATES
    const [loading, setLoading] = useState(false);
    const [diagnoses, setDiagnoses] = useState([]);
    const [fetching, setFetching] = useState(false);

    const [otp, setOtp] = useState("");
    const [loaNumber, setLoaNumber] = useState("");
    const [diagnosis, setDiagnosis] = useState("");

    // ERROR STATES
    const [otpError, setOtpError] = useState("");
    const [responseError, setResponseError] = useState("");
    const [loaNumberError, setLoaNumberError] = useState("");
    const [diagnosisError, setDiagnosisError] = useState("");

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = validateString({ allowLetters: false });

        if (["loaNumber"].includes(name)) {
            handleValidateRegex({
                regex,
                value,
                handleSet: setLoaNumber,
                handleSetError: setLoaNumberError,
            });
            setResponseError("");
        } else if (["otp"].includes(name)) {
            handleValidateRegex({
                regex,
                value,
                handleSet: setOtp,
                handleSetError: setOtpError,
            });
            setResponseError("");
        }
    };

    const handleValidation = () => {
        let valid = true;

        if (otp) {
            setOtpError("");
        } else {
            setOtpError("Enter OTP");
            valid = false;
        }

        if (loaNumber) {
            setLoaNumberError("");
        } else {
            setLoaNumberError("Enter LOA number");
            valid = false;
        }

        if (diagnosis) {
            setDiagnosisError("");
        } else {
            setDiagnosisError("Select diagnosis with ICD group code");
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
                otp,
                diagnosis,
                loa_no: loaNumber,
            };

            const res = await api.doctor.PostMethod("/loas/confirm-availment", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    let _error = "";
                    const { otp, loa_no, diagnosis, error, message } = data.errors;

                    if (otp?.includes("does not match")) {
                        setResponseError(otp);
                    } else {
                        setOtpError(otp);
                    }

                    if (loa_no?.includes("expired")) {
                        setLoaNumberError("LOA Validity (3 days) has passed. LOA has expired");
                    } else {
                        if (loa_no) setLoaNumberError(loa_no);
                    }

                    if (diagnosis) setDiagnosisError(diagnosis);
                    if (error) _error = error;
                    if (message) _error = message;

                    if (_error) {
                        alertMessage.showError({ title: "LOA Confirmation Failed", text: _error });
                    }
                } else {
                    const { message } = data;
                    alertMessage.showMessage({
                        title: message,
                        confirmButtonText: "Okay",
                        onClose: () => history.push("/"),
                    });
                }
            } else if (status === 400) {
                history.push("/error/400");
            } else {
                history.push("/error/500");
            }
            setLoading(false);
        }
    };

    const handleReset = () => {
        setOtp("");
        setLoaNumber("");
        setDiagnosis("");

        setOtpError("");
        setLoaNumberError("");
        setDiagnosisError("");
    };

    useEffect(() => {
        async function handleLoad() {
            let _error = true;
            let _diagnoses = [];
            if (isConnected) {
                setFetching(true);

                const params = {
                    excluded: ["Z00.0", "Z02.1", "Z71.1"],
                };
                const res = await api.doctor.PostMethod("/loas/dropdown/get-diagnoses", params);
                const { data, status } = res;

                if (status === 200) {
                    if (!data.errors) {
                        _diagnoses = data?.diagnoses?.map(({ code, description }) => {
                            const name = `${code} - ${description}`;
                            return { key: code, value: code, text: name };
                        });

                        _error = false;
                    }
                }
            }

            if (!isConnected || _error) {
                _diagnoses = await DIAGNOSES.map(({ code, desc }) => {
                    const name = `${code} - ${desc}`;
                    return { key: code, value: code, text: name };
                }).filter(({ code }) => !["Z00.0", "Z02.1", "Z71.1"].includes(code));
            }
            setDiagnoses(_diagnoses);
            setFetching(false);
        }

        handleLoad();
    }, []);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column computer={6} tablet={12} mobile={16}>
                    <Form unstackable>
                        {responseError && <ErrorControl name="response" error={responseError} />}
                        <Form.Group>
                            <TextBoxControl
                                maxLength={8}
                                name="loaNumber"
                                value={loaNumber}
                                labelSize="large"
                                label="LOA Number"
                                error={loaNumberError}
                                onChange={handleChange}
                                hasError={responseError}
                                placeholder="Enter LOA number"
                            />
                        </Form.Group>
                        <Form.Group>
                            <TextBoxControl
                                name="otp"
                                value={otp}
                                label="OTP"
                                maxLength={6}
                                error={otpError}
                                labelSize="large"
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                hasError={responseError}
                            />
                        </Form.Group>
                        <SelectControl
                            search
                            name="diagnosis"
                            value={diagnosis}
                            minCharacters={3}
                            loading={fetching}
                            options={diagnoses}
                            error={diagnosisError}
                            label="Diagnosis with ICD Group code"
                            placeholder="Select diagnosis with ICD group code"
                            onChange={(_, data) => {
                                setDiagnosisError("");
                                setDiagnosis(data.value);
                            }}
                        />
                        <BoxContainer padded="vertical">
                            <Form.Group className="mdMarginTop-16">
                                <Form.Field width="8">
                                    <ButtonControl
                                        fluid
                                        name="submit"
                                        text="Submit"
                                        loading={loading}
                                        onClick={handleSubmit}
                                    />
                                </Form.Field>
                                <Form.Field width="8">
                                    <ButtonControl
                                        fluid
                                        basic
                                        color="grey"
                                        name="reset"
                                        text="Reset"
                                        onClick={handleReset}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </BoxContainer>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default withRouter(ConfirmAvailment);

ConfirmAvailment.propTypes = {
    history: PropTypes.object,
};
