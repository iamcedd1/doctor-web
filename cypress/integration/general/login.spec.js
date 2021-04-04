/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe("Login", () => {
    let key;
    let screenshot;
    let users = [];
    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");

        cy.fixture("general/login.json").then((data) => (users = data?.users));
    });

    beforeEach(() => {
        cy.visit("/login");
    });

    it("Enters PRC Number upto 20 numeric characters", () => {
        const sample = "12345678912345678912";

        cy.get(`[${key.textBox}-username] > input`).type(sample).should("have.value", sample);
    });

    it("Enters PRC Number more than 20 numeric characters", () => {
        const sampleExpected = "12345678912345678912";
        const sampleFailed = "123456789123456789121";

        cy.get(`[${key.textBox}-username] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters PRC Number that are not numeric characters", () => {
        const sampleExpected = "8901234";
        const sampleFailed = "8@9$01S2M34";

        cy.get(`[${key.textBox}-username] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters Password upto 80 alphanumeric characters", () => {
        const sample =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKG";

        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);
    });

    it("Enters Password more than 80 alphanumeric characters", () => {
        const sampleExpected =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKG";
        const sampleFailed =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKGAOuIrmSN582i8";

        cy.get(`[${key.password}-password] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Mask Password by clicking show/hide", () => {
        const sample = "Kxy@Ec^now2!";
        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.password}-password] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-password] > input`).should("have.attr", "type", "text");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`[${key.password}-password] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-password] > input`).should("have.attr", "type", "password");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Should redirect to register by clicking (Sign up here)", () => {
        cy.get(`[${key.link}-register]`).click();
        cy.location("pathname").should("eq", "/verify-user");
    });

    it("Login with empty fields", () => {
        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-username]`).should("have.text", "Enter PRC number");
        cy.get(`[${key.errorText}-password]`).should("have.text", "Enter password");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with empty username", () => {
        const sample = "Kxy@Ec^now2!";
        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-username]`).should("have.text", "Enter PRC number");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with empty password", () => {
        const sample = "12345678912345678";
        cy.get(`[${key.textBox}-username] > input`).type(sample).should("have.value", sample);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-password]`).should("have.text", "Enter password");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with invalid credentials", () => {
        const user = users.find(({ status }) => status === "NYR");
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-response]`).should(
            "have.text",
            "Invalid PRC Number or Password, please try again."
        );

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with locked account", () => {
        const user = users.find(({ status }) => status === "L");
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-response]`).should(
            "have.text",
            "Your account has been locked due to excessive failed attempts."
        );

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with invalid credentials (First Attempt), should display captcha", () => {
        const user = users.find(({ status }) => status === "NYR");
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-response]`).should(
            "have.text",
            "Invalid PRC Number or Password, please try again."
        );

        cy.get(`[${key.captcha}]`).should("be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with invalid credentials and captcha not clicked", () => {
        const user = users.find(({ status }) => status === "NYR");
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-response]`).should(
            "have.text",
            "Invalid PRC Number or Password, please try again."
        );

        cy.get(`[${key.captcha}]`).should("be.visible");

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.errorText}-captcha]`).should("have.text", "Please enter captcha");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Login with valid credentials and Not Updated Terms and Conditions", () => {
        const user = users.find(({ status, terms_updated }) => status === "A" && !terms_updated);
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.modal}-terms]`).should("be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Close Terms and Conditions modal by clicking Decline Button", () => {
        const user = users.find(({ status, terms_updated }) => status === "A" && !terms_updated);
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.modal}-terms]`).should("be.visible");

        cy.get(`[${key.button}-decline]`).click();
        cy.get(`[${key.modal}-terms]`).should("not.be.visible");
    });

    it("Login after accepting Terms and Conditions", () => {
        const user = users.find(({ status, terms_updated }) => status === "A" && !terms_updated);
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();
        cy.get(`[${key.modal}-terms]`).should("be.visible");

        cy.wait(4000);

        cy.get(`[${key.button}-accept]`).click();

        cy.wait(4000);
        cy.location("pathname").should("eq", "/");
    });

    it("Login with valid credentials and bank information not updated", () => {
        const user = users.find(({ status, bank_updated }) => status === "A" && !bank_updated);
        const { username, password } = user;

        cy.get(`[${key.textBox}-username] > input`).type(username).should("have.value", username);
        cy.get(`[${key.password}-password] > input`).type(password).should("have.value", password);

        cy.get(`[${key.button}-login]`).click();

        cy.wait(2000);
        cy.location("pathname").should("eq", "/");

        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.title}`)
            .should("have.text", "Bank Setup");

        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.content}`)
            .should("have.text", "Submit your Bank Information before proceeding.");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.confirm}`)
            .should("have.text", "Okay")
            .click();

        cy.location("pathname").should("eq", "/profile/banks/add");
    });
});
