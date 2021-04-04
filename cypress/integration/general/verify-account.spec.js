/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe("Verify Account", () => {
    let key;
    let screenshot;
    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");
    });

    beforeEach(() => {
        cy.visit(
            "/verify-account?token=3grLAN5NECrwGcWGDWPDWtbrR2HCv4TjJJM4tT%2BYowAAxvMvyAUcQPyGx0B4kpmSFLTX3MBCeJmlmJ%2BSLKK0rwuFK9mcR4Y2yrG%2FbfJO%2BdM%3D%7C50esmoIVQkPt5KTI%2FbPRoA%3D%3D%7CYTY5ZG9fRnd4bUxlQjROa3lqZUhnQU9EUWFXUEtJNlk%3D"
        );
    });

    it("Enters OTP Number upto 6 numeric characters", () => {
        const sample = [1, 2, 3, 4, 5, 6];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", sample[i]);
        });
    });

    it("Enters OTP Number more than 6 numeric characters", () => {
        const sample = [1, 2, 3, 4, 5, 6, 7];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", sample[i]);
        });
    });

    it("Enters OTP Number that are not numeric characters", () => {
        const sample = ["k", "A", "B", "@", "?", "w"];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", "");
        });
    });

    it("Validate with incorrect OTP", () => {
        const sample = [1, 2, 3, 4, 5, 6, 7];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", sample[i]);
        });

        cy.get(`[${key.button}-validate]`).click();
        cy.get(`[${key.errorText}-otp]`).should(
            "have.text",
            "Entered code is incorrect, please try again."
        );

        cy.screenshot();
    });

    it("Validate with expired OTP", () => {
        const sample = [1,5,9,1,3,6];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", sample[i]);
        });

        cy.get(`[${key.button}-validate]`).click();
        cy.get(`[${key.errorText}-otp]`).should(
            "have.text",
            "Your OTP is expired. Please request for a new OTP."
        );

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Validate with 3 or more incorrent attempts", () => {
        const sample = [9, 2, 3, 4, 5, 6, 7];

        cy.get(".mdInputOtp input").each(($el, index) => {
            cy.wrap($el).clear().type(sample[index]).should("have.value", sample[index]);
        });

        for (let i = 0; i < 3; i++) {
            cy.get(`[${key.button}-validate]`).click();
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(4000);
        }

        cy.get(`[${key.errorText}-otp]`).should(
            "have.text",
            "Your attempts failed three (3) times. Try resending the code."
        );

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Should enable resend link after 60 seconds", () => {
        cy.get(`[${key.link}-resend]`).click().should("have.class", "mdDisabled");

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10000);
        if (screenshot) {
            cy.screenshot();
        }

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(50000);
        cy.get(`[${key.link}-resend]`).should("not.have.class", "mdDisabled");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Validate with correct OTP", () => {
        const sample = [9, 2, 3, 4, 5, 6, 7];

        cy.get(".mdInputOtp input").each(($el, i) => {
            cy.wrap($el).type(sample[i]).should("have.value", sample[i]);
        });

        cy.get(`[${key.button}-validate]`).click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(4000);

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`${key.alert.success}`)
            .should("be.visible")
            .find(`${key.alert.title}`)
            .should("have.text", "Verification Successful!");

        cy.get(`${key.alert.content}`)
            .should("be.visible")
            .find(`${key.alert.title}`)
            .should("have.text", "You may now log-in using your registered information.");

        cy.get(`${key.alert.success}`)
            .should("be.visible")
            .find(`${key.alert.confirm}`)
            .should("have.text", "Confirm")
            .click();
    });
});
