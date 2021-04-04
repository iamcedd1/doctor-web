// API
import axios from "axios";

// GRAPHQL
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

// UTILS
import system from "../config/system";

const SSO_URL = window.SSO_URL;
const DOCTOR_URL = window.DOCTOR_URL;
const NOTIFICATION_URL = window.NOTIFICATION_URL;

const httpLink = {
    doctor: createHttpLink({
        uri: DOCTOR_URL + system.apiVersion + "/graphql",
    }),
    sso: createHttpLink({
        uri: SSO_URL + "/auth/graphql",
    }),
};

const authLink = setContext(async (_, { headers }) => {
    const token = await localStorage.getItem("access_token");

    return {
        headers: {
            ...headers,
            Authorization: token,
        },
    };
});

const defaultApolloOptions = {
    watchQuery: {
        fetchPolicy: "network-only",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
    },
};

export const client = {
    doctor: new ApolloClient({
        link: authLink.concat(httpLink.doctor),
        cache: new InMemoryCache(),
        defaultOptions: defaultApolloOptions,
    }),
    sso: new ApolloClient({
        link: authLink.concat(httpLink.sso),
        cache: new InMemoryCache(),
        defaultOptions: defaultApolloOptions,
    }),
};

// API
export const api = {
    notification: {
        PostMethod: (method, body, version) => {
            let url = NOTIFICATION_URL + "api/";
            const headers = {
                Authorization: localStorage.getItem("access_token"),
            };

            if (version) {
                url += version;
            } else {
                url += system.apiVersion;
            }

            url += method;

            const object = axios
                .post(url, body, { headers })
                .then((res) => {
                    return res;
                })
                .catch((error) => {
                    return error;
                });

            return object;
        },
    },
    doctor: {
        PostMethod: (method, body, version) => {
            let url = DOCTOR_URL;
            const headers = {
                Authorization: localStorage.getItem("access_token"),
            };

            if (version) {
                url += version;
            } else {
                url += system.apiVersion;
            }

            url += method;

            const object = axios
                .post(url, body, { headers })
                .then((res) => {
                    return res;
                })
                .catch((error) => {
                    return error;
                });

            return object;
        },
    },
    sso: {
        PostMethod: (method, body, version) => {
            let url = SSO_URL;
            const headers = {
                Authorization: localStorage.getItem("access_token"),
            };

            if (version) {
                url += version;
            } else {
                url += system.apiVersion;
            }

            url += method;

            const object = axios
                .post(url, body, { headers })
                .then((res) => {
                    return res;
                })
                .catch((error) => {
                    return error;
                });

            return object;
        },
    },
};
