import React, { Fragment, useState, useContext, useEffect } from "react";

// COMPONENTS
import Terms from "../../../components/general/terms";
import ModalControl from "../../../components/controls/modal-control";
import ButtonControl from "../../../components/controls/button-control";

// CONTEXTS
import UserContext from "../../../contexts/user";

// UTILS
import PropTypes from "prop-types";
import { api } from "../../../utils/api";
import { withRouter } from "react-router-dom";

const TermsAndConditions = ({ visible, modalData, history, handleReset, handleClose }) => {
    // CONTEXTS
    const { setUser, setIsLogin } = useContext(UserContext);

    // STATES
    const [terms, setTerms] = useState("");
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const handleActions = () => {
        return (
            <Fragment>
                <ButtonControl
                    basic
                    color="grey"
                    name="decline"
                    text="Decline"
                    onClick={handleClose}
                />
                <ButtonControl
                    name="accept"
                    loading={loading}
                    onClick={handleAccept}
                    text="Accept & Continue"
                />
            </Fragment>
        );
    };

    const handleAccept = async () => {
        if (loading) return;

        setLoading(true);
        const params = {
            application: "DW",
            user_id: modalData.user_id,
            terms_n_condition_id: terms,
        };

        const res = await api.sso.PostMethod("/users/update-terms-and-condition", params);
        const { data, status } = res;

        if (status === 200) {
            if (!data.errors) {
                const { token, is_first_time } = data;
                if (!is_first_time) {
                    const { user } = modalData;
                    if (token) {
                        setIsLogin(true);

                        user["token"] = token;
                        setUser(user);
                        history.push("/");
                    }
                } else {
                    handleReset(is_first_time);
                }
            }
        } else if (status === 400) {
            history.push("/error/400");
        } else {
            history.push("/error/500");
        }
    };

    useEffect(() => {
        async function handleLoad() {
            const params = {
                application: "DW",
                user_id: modalData.user_id,
            };

            const res = await api.sso.PostMethod("/users/get-terms-and-condition", params);
            const { data, status } = res;

            if (status === 200) {
                if (data.errors) {
                    history.push("/error/500");
                } else {
                    const { terms_id } = data;
                    setTerms(terms_id);
                }
            } else if (status === 400) {
                history.push("/error/400");
            } else {
                history.push("/error/500");
            }
        }

        if (visible) {
            handleLoad();
        }
    }, [visible]);

    return (
        <ModalControl
            customed
            name="terms"
            scrolling={true}
            centered={false}
            visible={visible}
            withTransition={false}
            handleClose={handleClose}
            title="Terms & Conditions"
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            actionButtons={handleActions()}
            titleLabel="There's a new version of DoctorLink Terms and Conditions. Accepting the Terms and Conditions is needed to proceed."
        >
            <Terms />
        </ModalControl>
    );
};

export default withRouter(TermsAndConditions);

TermsAndConditions.propTypes = {
    visible: PropTypes.bool,
    history: PropTypes.object,
    modalData: PropTypes.object,
    handleReset: PropTypes.func,
    handleClose: PropTypes.func,
};

TermsAndConditions.defaultProps = {
    modalData: {},
    visible: false,
    handleReset: () => {},
    handleClose: () => {},
};
