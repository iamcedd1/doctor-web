# MediLink Boilerplate

## Table of Contents
<a href="#getting-started">Getting Started</a> <br />
I. <a href="#i-introduction">Introduction</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. <a href="#installation">Installation</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. <a href="#routing">Routing</a> <br />
II. <a href="#ii-medilink-boilerplate-structure">MediLink Boilerplate Structure</a> <br />
III. <a href="#iii-project-setup">Project Setup</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. <a href="#system-config">System Config</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. <a href="#system-roles">System Roles</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. <a href="#routing-1">Routing</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. <a href="#branding-colors-and-styles">Branding Colors and Styles</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* <a href="#scss">SCSS</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* <a href="#less-semantic-ui-theming">LESS Semantic UI Theming</a> <br />
IV. <a href="#iv-usage">Usage</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. <a href="#rest-api">REST API</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. <a href="#graphql">GRAPHQL</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. <a href="#creating-new-page">Creating New Page</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. <a href="#creating-new-component">Creating New Component</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. <a href="#helper-functions">Helper Functions</a> <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f. <a href="#alert">Alert</a> <br />
V. <a href="#v-testing">Testing</a> <br />
VI. <a href="#vi-practices-and-code-review">Practices and Code Review</a> <br />
VII. <a href="#vii-components">Components</a> <br />
VIII. <a href="#viii-build">Build</a> <br />
    

## Getting Started

### I. Introduction

To start using the MediLink Boilerplate, you will need to start from scratch using our template.

#### `Installation`

``` bash
git clone https://gitlab.medilink.com.ph/open-source-team/react-web-boiler-plate.git
cd react-web-boiler-plate
npm install
```

#### `Routing`

MediLink Boilerplate uses react-router-config for routing configuration.

`React Router Config` is a static route configuration helpers for React Router. With the introduction of React Router v4, there is no longer a centralized route configuration.

``` http
https://www.npmjs.com/package/react-router-config
```

``` javascript
const routes = [
    {
        component: Root,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: "/child/:id",
                component: Child,
                routes: [
                    {
                        path: "/child/:id/grand-child",
                        component: GrandChild
                    }
                ]
            }
        ]
    }
];
```

### II. MediLink Boilerplate Structure

Once you have downloaded the archive and opened it, you will find the following file structure:

``` html
├── README.md
├── public/
|   ├── images/
|   |   ├── error/
|   |   ├── templates/
|   ├── icons/
|   |   ├── navigation/
|   ├── js/
|   |   ├── env/
|   |   |   ├── env.js
|   └── index.js
├── src/
|   ├── components/
|   |   ├── controls
|   |   |   ├── CButton
|   |   |   |   ├── interface.ts
|   |   |   |   └── index.tsx
|   |   |   ├── CInput
|   |   |   |   ├── interface.ts
|   |   |   |   └── index.tsx
|   |   |   ├── CSnackbar
|   |   |   |   ├── interface.ts
|   |   |   |   └── index.tsx
|   |   |   ├── CTitle
|   |   |   |   ├── interface.ts
|   |   |   |   └── index.tsx
|   |   └── modals/
|   ├── contexts/
|   |   ├── app.jsx
|   |   └── user.jsx
|   ├── data/
|   ├── pages/
|   |   ├── error/
|   |   ├── general/
|   |   ├── module/
|   |   |   ├── search-user
|   |   |   |   ├── interface.ts
|   |   |   |   └── index.tsx
|   ├── semantic-ui/
|   ├── styles/
|   |   ├── components
|   |   |   ├── controls
|   |   |   └── general
|   |   ├── globals
|   |   └── index.scss
|   ├── utils/
|   |   ├── alert.ts
|   |   ├── api.ts
|   |   ├── debounce.ts
|   |   ├── helpers.ts
|   |   ├── history.ts
|   |   └── pusher.ts
|   ├── app.js
|   └── index.js
├── .gitignore
├── craco.config.js
├── cypress.json
├── package.json
└── README.md˛
```

### III. Project Setup

Learn how to use MediLink Boilerplate using routes, changing brand-colors, project defaults, and more.

#### `System Config`

Main system configuration file that defines the default system settings. You will find all the system config inside `src/config/system.jsx`.

``` javascript
{
    appCode: "PR",
    appName: "AdminLink",
    apiVersion: "v1",

    defaultColor: "red",
}
```

``` html
1. appCode: application code. (e.g. PL, PR, DL, ML, MVP, ADL)
2. appName: application name. (e.g. PayorLink, ProviderLink, DoctorLink, MarketLink, MemberViewPoint, AdminLink)
3. apiVersion: API Version. (Current Version: V1)
4. defaultColor: system's default or primary color.
```

#### `System Roles`

System roles configuration that defines the page access. You will find all the system config inside `src/config/roles.jsx`.

``` javascript
{
    viewOnly: ["vo"],
    fullAccess: ["fa"],
    generalAccess: ["gl"]
}
```

#### `Routing`

System routes configuration that manages the page routing. You will find all the system config inside `src/config/routes.jsx`.

``` javascript
import React from "react";

// UTILS
import helpers from "../utils/helpers";

// CONFIGS
import PageConfig from "../pages/sample/login/config";

const routeConfigs = [
    PageConfig
];

const userRoutes = [
    ...helpers.generateRoutesFromConfigs(routeConfigs),
    {
        component: () => <Redirect to="/error/404" />
    }
];

export default userRoutes;
```

#### `Branding Colors and Styles`

MediLink Boilerplate uses Semantic UI as CSS Framework. Combination of LESS and SCSS for styling. Semantic UI theming is applied for custom styles.
https://react.semantic-ui.com/theming/

##### `SCSS`

The variables should be aligned with the Semantic UI custom theming.

``` html
| src/
|   ├── styles/
|   |   ├── scss/
|   |   |   ├── components/
|   |   |   |   ├── layout-control/
|   |   |   |   |   ├── index.scss
|   |   |   |   └── index.scss
|   |   |   ├── globals/
|   |   |   |   ├── documentation.scss
|   |   |   |   ├── general.scss
|   |   |   |   ├── mixins.scss
|   |   |   |   └── variables.scss
|   |   |   └── index.scss
```

##### `LESS Semantic UI Theming`

Theming sets by overriding site variables.

``` html
| src/
|   ├── semantic-ui/
|   |   ├── scss/
|   |   |   ├── site/
|   |   |   |   ├── collections/
|   |   |   |   ├── elements/
|   |   |   |   ├── globals/
|   |   |   |   ├── modules/
|   |   |   |   └── views/
|   |   |   └── theme.config
```

### IV. Usage

Guidelines on how to use the MediLink Boilerplate.

#### `REST API`

MediLink Boilerplate uses <a href="https://alligator.io/react/axios-react/">`Axios React`</a> for API Request.

``` javascript
// UTILS
import { api } from "../utils/api";

// USAGE
const res = await api.sso.PostMethod("/users/sign-in", params);
const { data, status } = res;

if (status === 200) {
    // ACTION HERE
} else if (status === 404) {
    history.push("/error/404");
} else {
    history.push("/error/500");
}
```

Note: We recommend using `res` as variable name to handle API request result.

#### `GRAPHQL`

MediLink Boilerplate uses <a href="https://www.apollographql.com/docs/react/">`Apollo Client`</a> for GraphQL Request.
It also uses <a href="https://www.npmjs.com/package/graphql.macro">`graphql.macro`</a> npm package.

``` javascript
// GRAPHQL
import { loader } from "graphql.macro";

const handleSearch = async () => {
    const query = loader("../../../graphql/users/search-users.graphql");
    await client.sso
        .query({
            query,
            variables: {
                sortBy,
                orderBy,
                // OTHER VARIABLES
            }
        })
        .then(( { data} ) => {
            // ACTION HERE
        })
        .catch(() => {
            // ACTION HERE
        });
}
```

GraphQL File Sample:

``` graphql
#import "../fragment.graphql"

query(
    $searchValue: String
    $displayPerPage: Int!
    $pageNumber: Int!
    $application: String
    $sortBy: String!
    $orderBy: String!
    $filterUser: [FilterUsers]
) {
    users(
        displayPerPage: $displayPerPage
        application: $application
        pageNumber: $pageNumber
        orderBy: $orderBy
        sortBy: $sortBy
        searchValue: $searchValue
        filterUser: $filterUser
    ) {
        users {
            ...User
        }

        totalNumber
    }
}
```

Fragment File Sample:

``` graphql
fragment User on User {
    name
    username
    department
    designation
    roles
    payors
    status
    updated_at
    updated_by
}
```

#### `Creating New Page`

When creating new pages, you have to setup 2 files: the `index.jsx` which is the main page file and the `config.jsx` which is the page configuration file.

``` html
| src/
|   ├── pages/
|   |   ├── module/
|   |   |   ├── page-name/
|   |   |   |   ├── index.jsx
|   |   |   |   └── config.jsx
```

1. Pages should be created in `src/pages` folder. 
2. `module`: pages should be categorized by module. This is for the file structure to be easily maintained.
3. `page-name`: page names should describe the function of the page itself. (ex. `search-users`, `search-batch-users`, `search-authorizations`).
4. `index.jsx`: contains the main component page. `File naming convention is strictly observed.`
5. `config.jsx`: contains the page configuration file. Should be included in the same folder with the main component page. `File naming convention is strictly observed.` 

``` javascript
// index.jsx (Main Page File)

import React, { Fragment } from "react";

// COMPONENTS

const PageComponent = () => {
    return (
        <Fragment />
    )
}

export default PageComponent;
```

1. `PageComponent` must use PascalCase for naming convention.
    * `PascalCase` is a naming convention in which the first letter of each word in a compound word is capitalized.
2. Page must use the `Functional Stateless Component` for React Hooks integration.
3. Unused variables and packages should be removed. 

``` javascript
// config.jsx (Page Configuration File)

import PageComponent from "./index";

// UTILS
import roles from "../../../config/roles";

const PageConfig = {
    name: "",
    settings: {
        layout: {
            style: "main"
        },
        title: "",
        "breadcrumbs": [
            {
                "key": "Home",
                "content": "HOMEPAGE",
                "link": true,
                "active": true,
                "as": Link,
                "to": "/"
            },
            {
                "key": "",
                "content": "",
                "link": true,
                "active": true,
                "as": Link,
                "to": "/"
            },
        ]
    },
    auth: roles.fullAccess,
    routes: [
        {
            exact: true,
            path: "/",
            component: PageComponent
        },
    ]
};

export default PageConfig;
```

1. `PageComponent`: name of the main page component.
2. `PageConfig`: page configuration component name. Naming convention `PageComponentConfig`.
3. `name`: page configuration name. (ex. `Search Users`, `Search Batch Users`, `Search Authorizations`);
4. Settings
    * `layout` > `style`: layout name that the page will follow. `Required`
    * `title`: page title. If value is set, it will be automatically set as the H1 of the page. `Optional`
    * `breadcrumbs`: page breadcrumbs navigation located at the upper left corner of the page, above the Page Title. `Optional`
    * `auth`: page access authentication. (ex. `fullAccess`, `viewOnly`, `generalAccess`) `Required`
    * `routes`: route configuration setup.

#### `Creating New Component`

When creating new component, it should be categorized by its function/ module.

``` html
| src/
|   ├── components/
|   |   ├── controls/  
|   |   ├── module/
|   |   |   ├── component-name/
|   |   |   |   └── index.jsx
```

1. Components should be created inside `src/components` folder.
2. Components should be categorized by module/ function. This is for the file structure to be easily maintained.
3. `component-name`: should follow kebab-case. 
    * kebab-case combines words by replacing each space with a dash (-)
4. Unused variables and packages should be removed.

``` javascript
// index.jsx

import React, { Fragment } from "react";

const ComponentName = () => {
    return (
        <Fragment />
    )
}

export default ComponentName;
```

#### `Helper Functions`

MediLink Boilerplate has pre-defined functions that can be use throughout the system. You will find all the functions inside the `src/utils/helpers.jsx`.

#### `Alert`

MediLink Boilerplate uses <a href="https://sweetalert2.github.io/">`SweetAlert2`</a> for displaying messages in the application.

``` jsx
import { alertMessage } from "../../../utils/alert";

// PARAMS
alertMessage.showMessage(title, text, action);
alertMessage.showError(title, text, action);
alertMessage.showSuccess(title, text, action);
alertMessage.toastMessage(title, action);
alertMessage.toastError(title, action);
alertMessage.toastSuccess(title, action);

/** USAGE **/

// SHOW INFO MESSAGE
alertMessage.showMessage("Login", "Hello, User!", () => {
    history.push("/");
});

// SHOW ERROR MESSAGE
alertMessage.showError("Access Denied", "You don't have an access to this module", () => {
    history.goBack();
});

// SHOW SUCCESS MESSAGE
alertMessage.showSuccess("Request Successful", "Your LOA has been successfully approved.", () => {
    history.push("/");
});

// TOAST ALERT INFO MESSAGE
alertMessage.toastMessage("Login Info", () => {
    history.push("/");
});

// TOAST ALERT ERROR MESSAGE
alertMessage.toastError("Access Denied", () => {
    history.goBack();
});

// TOAST ALERT SUCCESS MESSAGE
alertMessage.toastSuccess("LOA Approved!", () => {
    history.push("/");
});
```

### V. Testing

MediLink Boilerplate uses Cypress for Test Driven Development and Automation Testing.

### VI. Practices and Code Review

1. Use `JSX`, a syntax extension to JavaScript. JSX produces React “elements”.

``` html
sample-file/index.jsx
```

2. Avoid Obvious Comments
3. Use `DRY(Don't Repeat Yourself)` Principle and also known as `DIE: Duplication is Evil`.
4. Use `reusable` and `dynamic` components.
5. Uses `customized components` for `MediLink Automation Testing with Cypress` that follows Best Practices.

``` javascript
<TextBoxControl name="username" placeholder="Enter Username" label="Username" />
```

6. Import Components Grouping Structure

``` javascript
import React, { Fragment } from "react";

// COMPONENTS
/** Semantic Components and Customized Components **/

// CONTEXTS
/** React Application Contexts **/

// DATA
/** Constant Variables and Data **/

// GRAPHQL
/** GraphQL Query Files **/

// UTILS
/** Utility and Helper Functions **/

const Component = () => {
    return <Fragment />
};

export default Component;
```

7. `Page responsiveness` is a must. (`Desktop`, `Tablet`, `Mobile Views`) will be checked. Using `ResponsiveControl` component will save your time.
8. `Variable Naming and Declaration`. Use `camelCase` naming style. Avoid using `let` if not necessary.

``` javascript
const [orderBy, setOrderBy] = useState("desc");
const orderBy = "desc";
```

9. `Function Naming and Declaration`. Use `camelCase` naming style. We recommend use `handle` keyword followed by an action word.

``` javascript
const handleLoad = () => {
    // CODE HERE
};
```

10. Use Pure JavaScript instead of Lodash.
    * The first and most important thing is speed. Because performance really matters for a good user experience, and lodash is an outsider here.

### VII. Components

### VIII. Build Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
