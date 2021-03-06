import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// UTILS
import history from "./utils/history";
import { BrowserRouter, Router } from "react-router-dom";

// CONTEXTS
import { AppProvider } from "./contexts/app";
import { UserProvider } from "./contexts/user";

const init = async () => {
    ReactDOM.render(
        <BrowserRouter>
            <AppProvider>
                <UserProvider>
                    <Router history={history}>
                        <App />
                    </Router>
                </UserProvider>
            </AppProvider>
        </BrowserRouter>,
        document.getElementById("root")
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
};

init();
