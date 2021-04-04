import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import { Grid } from "semantic-ui-react";
import ModalControl from "../../../components/controls/modal-control";
import DimmerControl from "../../../components/controls/dimmer-control";
import VerificationItem from "../../../components/general/forgot-password/verification-item";

// CONTEXTS
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { withRouter } from "react-router-dom";
import { alertMessage } from "../../../utils/alert";

const VerificationMethod = ({ visible, history, modalData, handleClose }) => {
    // CONTEXTS
    const { setForgotOtp } = useContext(UserContext);

    // STATES
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const handleSelect = async (method) => {
        if (loading) return;
        setLoading(true);
        const params = {
            send_via: method,
            application: "DW",
            user_id: modalData?.user_id,
        };

        const { data, status } = await api.sso.PostMethod(
            "/users/doctorlink/forgot-password/send-verification",
            params
        );

        if (status === 200) {
            if (!data.errors) {
                const { message } = data;
                setLoading(false);

                if (method === "e") {
                    alertMessage.showSuccess({
                        text: message,
                        title: "Forgot Password",
                        onClose: () => history.push("/login"),
                    });
                } else if (method === "m") {
                    setForgotOtp(data);
                    history.push("/verify-otp");
                }
            }
        } else {
            history.push(`/error/${status}`);
        }
    };

    useEffect(() => {
        if (visible) {
            const { email, mobile } = modalData;
            setEmail(email);
            setMobile(mobile);
        }
    }, [visible]);

    return (
        <ModalControl
            customed
            size="mini"
            titleLabel="How do you want to get the verification to reset your password?"
            visible={visible}
            title="Reset Your Password"
            handleClose={handleClose}
        >
            <Grid>
                <Grid.Row columns={1}>
                    {loading && <DimmerControl />}
                    {email && (
                        <Grid.Column>
                            <VerificationItem
                                name="email"
                                text={email}
                                icon="envelope"
                                title="Send link via email"
                                handleClick={() => handleSelect("e")}
                            />
                        </Grid.Column>
                    )}
                    {mobile && (
                        <Grid.Column>
                            <VerificationItem
                                name="mobile"
                                icon="mobile"
                                text={mobile}
                                title="Send code via mobile"
                                handleClick={() => handleSelect("m")}
                            />
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
        </ModalControl>
    );
};

export default withRouter(VerificationMethod);

VerificationMethod.propTypes = {
    visible: PropTypes.bool,
    history: PropTypes.object,
    modalData: PropTypes.object,
    handleClose: PropTypes.func,
};

VerificationMethod.defaultProps = {
    visible: false,
    handleClose: () => {},
};
