import React from "react";

// COMPONENTS
import { Placeholder } from "semantic-ui-react";

const PlaceholderControl = () => {
    return (
        <Placeholder>
            <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>
        </Placeholder>
    );
};

export default PlaceholderControl;
