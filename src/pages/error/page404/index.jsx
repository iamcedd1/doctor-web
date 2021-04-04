import React, { useContext } from "react";

// COMPONENTS
import ErrorContainer from "../../../components/error/error-container";

// UTILS
import { withRouter } from "react-router-dom";

// CONTEXTS
import AppContext from "../../../contexts/app";

const Page404 = ({ history }) => {
    // CONTEXTS
    const { setPageLoading } = useContext(AppContext);

    // FUNCTIONS
    const handleReturn = () => {
        if (history.length > 0) {
            history.goBack();
        } else {
            history.replace("/");
        }
    };

    const handleReport = async () => {
        setPageLoading(true);

        setTimeout(() => {
            setPageLoading(false);
        }, 3000);
    };

    return (
        <ErrorContainer
            code="404"
            title="Page Not Found"
            handleReturn={handleReturn}
            handleReport={handleReport}
        />
    );
};

export default withRouter(Page404);
