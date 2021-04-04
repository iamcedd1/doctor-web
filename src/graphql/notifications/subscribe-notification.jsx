import gql from "graphql-tag";

export const SUBSCRIBE_NOTIFICATION = gql`
    subscription {
        notification {
            mutation
            notification {
                id
                title
                message
                is_read
                is_seen
                is_deleted
                recipient_id
                sender_id
                url
                type
                inserted_at
                updated_at
            }
            count
        }
    }
`;
