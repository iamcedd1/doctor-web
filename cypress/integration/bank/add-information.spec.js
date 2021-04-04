/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe("Add Bank Information", () => {
    let key;
    let screenshot;

    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");

        cy.visit("/login");
        cy.fixture("general/login.json").then(({ users }) => {
            const user = users?.find(({ status, bank_updated }) => status === "A" && !bank_updated);
            cy.login(user?.username, user?.password);
        });
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.visit("/profile/banks/add");
    });

    it("Enters Bank Account Number upto 12 numeric characters", () => {
        const sample = "123456789012";

        cy.get(`[${key.textBox}-bankAccount] > input`).type(sample).should("have.value", sample);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Bank Account Number more than 12 numeric characters", () => {
        const sampleExpected = "123456789012";
        const sampleFailed = "1234567890121231241";

        cy.get(`[${key.textBox}-bankAccount] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Bank Account Number that are not numeric characters", () => {
        const sampleExpected = "123456789012";
        const sampleFailed =
            ".,/?><';\":\\}{][-+=_~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1!2@3#4$5%6^7&8*9(0)12";

        cy.get(`[${key.textBox}-bankAccount] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters TIN upto 14 numeric characters", () => {
        const sample = "12345678901234";
        const sampleExpected = "123-456-789-01234";

        cy.get(`[${key.textBox}-tin]`).type(sample).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters TIN more than 14 numeric characters", () => {
        const sample = "123456789012342321231231231";
        const sampleExpected = "123-456-789-01234";

        cy.get(`[${key.textBox}-tin]`).type(sample).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters TIN that are not numeric characters", () => {
        const sampleExpected = "123-456-789-01234";
        const sampleFailed = "ABC1DEF2GHI3JKL4MNO5PQR6STU7VWX8YZ!9@#$0%^&1*()2-=;:3'\"\\/.,<>?+`~4";

        cy.get(`[${key.textBox}-tin]`).type(sampleFailed).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Submit with empty fields", () => {
        cy.get(`[${key.button}-submit]`).click();
        cy.get(`[${key.errorText}-bank]`).should("have.text", "Select bank name");
        cy.get(`[${key.errorText}-bankAccount]`).should("have.text", "Enter bank account number");
        cy.get(`[${key.errorText}-tin]`).should("have.text", "Enter TIN");
    });

    it("Show help tooltip when hovered", () => {
        cy.get(`${key.tooltipIcon}-WI151`).trigger("mouseover");

        cy.get("[data-cy=mdHelp-WI151]")
            .should("be.visible")
            .should(
                "have.text",
                "After submitting Bank Information, doctors must submit a sworn declaration stating that your gross sales/receipts will not exceed three million pesos to %email address% for verification to reduce 10% withholding tax to 5%."
            );
    });

    it("Submit with valid information - Show Modal", () => {
        cy.fixture("profile/bank-details.json").then(({ valid_details }) => {
            const { name, tin, rate, status, account, tinExpected } = valid_details;

            cy.get(`[${key.dropdown}-bank] > .search`).type(name).should("have.value", name);
            cy.get(`[${key.textBox}-bankAccount] > input`)
                .type(account)
                .should("have.value", account);
            cy.get(`[${key.textBox}-tin]`).type(tin).should("have.value", tinExpected);

            cy.get(`[${key.button}-submit]`).click();
            cy.get(`[${key.modal}-summary]`).should("be.visible");

            cy.get(`[${key.title}-summary]`).should("have.text", "Bank Information Summary");
            cy.get(`[${key.text}-bank]`).should("have.text", name);
            cy.get(`[${key.text}-rate]`).should("have.text", rate);
            cy.get(`[${key.text}-status]`).should("have.text", status);
            cy.get(`[${key.text}-account]`).should("have.text", account);
            cy.get(`[${key.text}-tin]`).should("have.text", tinExpected);
        });
    });

    it("Close Modal Summary by clicking 'Continue Editing'", () => {
        cy.fixture("profile/bank-details.json").then(({ valid_details }) => {
            const { name, tin, account, tinExpected } = valid_details;

            cy.get(`[${key.dropdown}-bank] > .search`).type(name).should("have.value", name);
            cy.get(`[${key.textBox}-bankAccount] > input`)
                .type(account)
                .should("have.value", account);
            cy.get(`[${key.textBox}-tin]`).type(tin).should("have.value", tinExpected);

            cy.get(`[${key.button}-submit]`).click();
            cy.get(`[${key.modal}-summary]`).should("be.visible");

            cy.get(`[${key.button}-cancel]`).click();
            cy.get(`[${key.modal}-summary]`).should("not.be.visible");
        });
    });

    it("Display Confirmation Message after Successfully Submitted", () => {
        cy.fixture("profile/bank-details.json").then(({ valid_details }) => {
            const { name, tin, account, tinExpected } = valid_details;

            cy.get(`[${key.dropdown}-bank] > .search`).type(name).should("have.value", name);
            cy.get(`[${key.textBox}-bankAccount] > input`)
                .type(account)
                .should("have.value", account);
            cy.get(`[${key.textBox}-tin]`).type(tin).should("have.value", tinExpected);

            cy.get(`[${key.button}-submit]`).click();
            cy.get(`[${key.modal}-summary]`).should("be.visible");

            cy.get(`[${key.modal}-summary]`).find(`[${key.button}-submit]`).click();

            cy.get(`${key.alert.success}`)
                .should("be.visible")
                .find(`${key.alert.title}`)
                .should("have.text", "Bank information successfully submitted.");

            if (screenshot) {
                cy.screenshot();
            }

            cy.get(`${key.alert.success}`)
                .should("be.visible")
                .find(`${key.alert.confirm}`)
                .should("have.text", "Okay")
                .click();

            cy.location("pathname").should("eq", "/");
        });
    });
});
