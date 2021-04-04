import React, { useContext } from "react";

// COMPONENTS
import ErrorContainer from "../../../components/error/error-container";

// UTILS
import { withRouter } from "react-router-dom";

// CONTEXTS
import AppContext from "../../../contexts/app";

const Page500 = ({ history }) => {
    // CONTEXTS
    const { setPageLoading } = useContext(AppContext);

    // FUNCTIONS
    const handleReport = async () => {
        setPageLoading(true);

        setTimeout(() => {
            setPageLoading(false);
        }, 3000);
    };

    const handleReturn = () => {
        if (history.length > 0) {
            history.goBack();
        } else {
            history.replace("/");
        }
    };

    return (
        <ErrorContainer
            code="500"
            title="Internal Server Error"
            handleReturn={handleReturn}
            handleReport={handleReport}
        />
    );
};

export default withRouter(Page500);
