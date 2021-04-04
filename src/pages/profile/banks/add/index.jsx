import React, { useState, useEffect, useContext } from "react";

// COMPONENTS
import { Grid, Form } from "semantic-ui-react";
import TitleControl from "../../../../components/controls/title-control";
import ButtonControl from "../../../../components/controls/button-control";
import SelectControl from "../../../../components/controls/select-control";
import TextBoxControl from "../../../../components/controls/textbox-control";
import CheckboxControl from "../../../../components/controls/checkbox-control";
import BoxContainer from "../../../../components/controls/container/box-container";
import RadioGroupControl from "../../../../components/controls/radio-group-control";

// CONTEXTS
import UserContext from "../../../../contexts/user";

// DATA
import { BANK_VAT_STATUSES, BANK_WTAX_TYPES, BANKS } from "../../../../data/account";

// MODALS
import BankSummary from "../../../../modals/profile/bank-summary";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../../utils/api";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../../utils/alert";
import { handleValidateRegex, validateString } from "../../../../utils/helpers";

const AddInformation = ({ history }) => {
    // CONTEXTS
    const { bankSetup, setBankSetup } = useContext(UserContext);

    // STATES
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [tin, setTin] = useState("");
    const [bank, setBank] = useState("");
    const [isWTax, setIsWTax] = useState(true);
    const [account, setAccount] = useState("");
    const [vatStatus, setVatStatus] = useState("NV");
    const [wTaxType, setWTaxType] = useState("WI150");

    // ERROR STATES
    const [tinError, setTinError] = useState("");
    const [bankError, setBankError] = useState("");
    const [accountError, setAccountError] = useState("");
    const [wTaxTypeError, setWTaxTypeError] = useState("");
    const [vatStatusError, setVatStatusError] = useState("");

    // MODAL STATES
    const [modalData, setModalData] = useState({});
    const [modalSummary, setModalSummary] = useState(false);

    // FUNCTIONS
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = validateString({ allowLetters: false });

        if (["bankAccount"].includes(name)) {
            handleValidateRegex({
                regex,
                value,
                handleSet: setAccount,
                handleSetError: setAccountError,
            });
        }
    };

    const handleValidation = () => {
        let valid = true;

        if (bank) {
            setBankError("");
        } else {
            setBankError("Select bank name");
            valid = false;
        }

        if (account) {
            setAccountError("");
        } else {
            setAccountError("Enter bank account number");
            valid = false;
        }

        if (tin) {
            if (tin.replace(/-/g, "").length < 12) {
                setTinError("Invalid TIN");
                valid = false;
            } else {
                setTinError("");
            }
        } else {
            setTinError("Enter TIN");
            valid = false;
        }

        if (isWTax) {
            if (wTaxType) {
                setWTaxTypeError("");
            } else {
                setWTaxTypeError("Select tax code");
                valid = false;
            }
        }

        if (vatStatus) {
            setVatStatusError("");
        } else {
            setVatStatusError("Select VAT status");
            valid = false;
        }

        return valid;
    };

    const handleSubmit = () => {
        if (loading) return;
        const isValid = handleValidation();

        if (isValid) {
            setModalData({
                tin,
                bank,
                account,
                tip: BANK_WTAX_TYPES.find((item) => item.value === "WI151")?.tip,
                rate: BANK_WTAX_TYPES.find((item) => item.value === wTaxType)?.rate,
                status: BANK_VAT_STATUSES.find((item) => item.value === vatStatus)?.name,
            });
            setModalSummary(true);
        }
    };

    const handleSuccess = async () => {
        setLoading(true);
        const params = {
            tin,
            bank_name: bank,
            tax_code: wTaxType,
            vat_status: vatStatus,
            bank_account_number: account,
            is_subject_to_wtax: isWTax ? true : false,
        };

        const res = await api.doctor.PostMethod("/banks/create", params);
        const { data, status } = res;

        if (status === 200) {
            if (data.errors) {
                const {
                    tin,
                    error,
                    tax_code,
                    bank_name,
                    vat_status,
                    practitioner_code,
                    bank_account_number,
                } = data.errors;

                if (practitioner_code) {
                    history.push("/error/500");
                    return;
                }

                if (tin) setTinError(tin);
                if (bank_name) setBankError(bank_name);
                if (tax_code) setWTaxTypeError(tax_code);
                if (vat_status) setVatStatusError(vat_status);
                if (bank_account_number) setAccountError(bank_account_number);

                if (error)
                    alertMessage.showError({ title: "Bank Registration Failed", text: error });
                setModalSummary(false);
            } else {
                setSubmitted(true);
                alertMessage.showSuccess({
                    confirmButtonText: "Okay",
                    title: "Bank information successfully submitted.",
                    onClose: () => {
                        setBankSetup(true);
                        history.push("/");
                    },
                });
                return;
            }
        } else if (status === 400) {
            history.push("/error/400");
            return;
        } else {
            history.push("/error/500");
            return;
        }
        setLoading(false);
    };

    useEffect(() => {
        setBanks(BANKS);
    }, []);

    useEffect(() => {
        if (bankSetup && !submitted) {
            alertMessage.showError({
                title: "Bank Setup",
                text: "This account has existing bank information.",
                onClose: () => history.push("/"),
            });
        }
    }, [bankSetup, submitted]);

    return (
        <Grid padded="vertically">
            <Grid.Row>
                <Grid.Column width={16} className="mdMarginBottom-16">
                    <TitleControl as="h3" title="Bank Information Details" />
                </Grid.Column>
                <Grid.Column computer={6} tablet={12} mobile={16}>
                    <Form unstackable>
                        <SelectControl
                            search
                            name="bank"
                            value={bank}
                            error={bankError}
                            label="Bank Name"
                            placeholder="Select bank name"
                            options={banks
                                .sort((a, b) => a.name?.localeCompare(b.name))
                                .map(({ code, name }) => {
                                    return { key: code, value: name, text: name };
                                })}
                            onChange={(_, data) => {
                                setBankError("");
                                setBank(data.value);
                            }}
                        />
                        <Form.Group>
                            <TextBoxControl
                                maxLength={12}
                                value={account}
                                labelSize="large"
                                name="bankAccount"
                                error={accountError}
                                onChange={handleChange}
                                label="Bank Account Number"
                                placeholder="Enter bank account number"
                            />
                        </Form.Group>
                        <Form.Group>
                            <TextBoxControl
                                width={8}
                                label="TIN"
                                mask={[
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    "-",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    "-",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    "-",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                name="tin"
                                value={tin}
                                error={tinError}
                                onChange={(e) => {
                                    setTinError("");
                                    setTin(e.target.value);
                                }}
                                placeholder="Enter TIN"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Field>
                                <CheckboxControl
                                    value="SFF"
                                    disabled
                                    multiple={false}
                                    checked={isWTax}
                                    label="Subject to Withholding Tax?"
                                    handleChange={() => setIsWTax(!isWTax)}
                                />
                            </Form.Field>
                        </Form.Group>
                        {isWTax && (
                            <RadioGroupControl
                                indented
                                name="taxRate"
                                value={wTaxType}
                                error={wTaxTypeError}
                                label="Select Tax Rate"
                                items={BANK_WTAX_TYPES}
                                handleChange={setWTaxType}
                            />
                        )}

                        <RadioGroupControl
                            name="vatStatus"
                            value={vatStatus}
                            label="VAT Status"
                            error={vatStatusError}
                            items={BANK_VAT_STATUSES}
                            handleChange={setVatStatus}
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
                            </Form.Group>
                        </BoxContainer>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            {modalSummary && (
                <BankSummary
                    data={modalData}
                    loading={loading}
                    visible={modalSummary}
                    handleSubmit={handleSuccess}
                    handleClose={() => setModalSummary(false)}
                />
            )}
        </Grid>
    );
};

export default withRouter(AddInformation);

AddInformation.propTypes = {
    history: PropTypes.object,
};

AddInformation.defaultProps = {};
