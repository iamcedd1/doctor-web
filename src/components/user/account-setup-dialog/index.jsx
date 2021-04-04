import React from "react";

// COMPONENTS
import { Item } from "semantic-ui-react";
import LinkControl from "../../controls/link-control";
import IconControl from "../../controls/icon-control";

// UTILS
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const AccountSetupDialog = ({ history }) => {
    return (
        <Item className="mdAccountSetupDialog">
            <IconControl icon="warning sign" color="red" size="small" />
            There is no bank information linked to this account. You will not be able to receive
            payment for teleconsultation until you set-up bank information{" "}
            <LinkControl
                underline
                text="here"
                name="bankSetup"
                handleClick={() => history.push("/profile/banks/add")}
            />
            .
        </Item>
    );
};

export default withRouter(AccountSetupDialog);

AccountSetupDialog.propTypes = {
    history: PropTypes.object,
};
