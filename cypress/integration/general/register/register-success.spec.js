/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe("Register Account - Positive Scenarios", () => {
    let key;
    let screenshot;
    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");
    });

    it("Register with valid information", () => {
        cy.fixture("register/user-details.json").then(({ details, valid_information }) => {
            let index = 0;
            for (const detail of details) {
                const { first_name, last_name, prc_no } = detail;
                const {
                    days,
                    email,
                    other,
                    times,
                    mobile,
                    timeTos,
                    daysName,
                    password,
                    channels,
                    timeFroms,
                } = valid_information[index];

                const _times = times?.join("");
                const _daysName = daysName?.join(", ");

                cy.visit("/verify-user");
                cy.get(`[${key.textBox}-firstName] > input`)
                    .type(first_name)
                    .should("have.value", first_name);
                cy.get(`[${key.textBox}-lastName] > input`)
                    .type(last_name)
                    .should("have.value", last_name);
                cy.get(`[${key.textBox}-prc] > input`).type(prc_no).should("have.value", prc_no);

                cy.get(`[${key.button}-proceed]`).click();
                cy.location("pathname").should("eq", "/register");

                cy.get(`[${key.button}-addSchedule]`).click();
                cy.get(`[${key.modal}-schedule]`).should("be.visible");

                days.forEach((day) => {
                    cy.get(`[${key.chip}-${day}]`).click().should("have.class", "mdSelected");
                });

                cy.get(`[${key.buttonIcon}-add]`).click();

                cy.get(`[${key.timeInput}-from] > input`).each(($item, index) => {
                    cy.wrap($item).click();
                    cy.get(".suicr-content-item").eq(timeFroms[index][0]).click();
                    cy.wrap($item).click();
                    cy.get(".suicr-content-item").eq(timeFroms[index][1]).click();
                });

                cy.get(`[${key.timeInput}-to] > input`).each(($item, index) => {
                    cy.wrap($item).click();
                    cy.get(".suicr-content-item").eq(timeTos[index][0]).click();
                    cy.wrap($item).click();
                    cy.get(".suicr-content-item").eq(timeTos[index][1]).click();
                });

                cy.get(`[${key.button}-submit]`).click();

                cy.get(`[${key.table.table}-schedules]`)
                    .find("tbody")
                    .get("tr")
                    .each(() => {
                        cy.get(`[${key.table.cell}]`).eq(0).should("have.text", _daysName);
                        cy.get(`[${key.table.cell}]`).eq(1).should("have.text", _times);
                    });

                cy.get(`[${key.button}-save]`).click();
                cy.get(`[${key.modal}-schedule]`).should("not.be.visible");

                cy.get(`[${key.card}]`).each(($item) => {
                    cy.wrap($item).find(".header").should("have.text", _daysName);
                });

                cy.get(`[${key.textBox}-mobile]`)
                    .type(mobile)
                    .should("have.value", `+63 ${mobile}`);
                cy.get(`[${key.textBox}-email] > input`).type(email).should("have.value", email);
                cy.get(`[${key.password}-password] > input`)
                    .type(password)
                    .should("have.value", password);
                cy.get(`[${key.password}-confirmPassword] > input`)
                    .type(password)
                    .should("have.value", password);

                channels.forEach((channel) => {
                    cy.get("[data-cy=mdCheckbox]").contains(channel).click();
                });

                if (other) {
                    cy.get(`[${key.textArea}-other]`)
                        .type(other)
                        .should("have.value", other);
                }

                cy.get(`[${key.checkbox}-terms]`).click();
                cy.get(`[${key.button}-register]`).click();

                // eslint-disable-next-line cypress/no-unnecessary-waiting
                cy.wait(8000);

                cy.get(`${key.alert.success}`)
                    .should("be.visible")
                    .find(`${key.alert.title}`)
                    .should(
                        "have.text",
                        "An email has been sent to you for email address verification."
                    );

                cy.get(`${key.alert.success}`)
                    .should("be.visible")
                    .find(`${key.alert.confirm}`)
                    .should("have.text", "Confirm")
                    .click();

                if (screenshot) {
                    cy.screenshot();
                }

                cy.location("pathname").should("eq", "/login");
                index++;
            }
        });
    });
});