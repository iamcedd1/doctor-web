/// <reference types="cypress" />
describe("Verify User", () => {
    let key;
    let screenshot;
    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");
    });

    beforeEach(() => {
        cy.visit("/verify-user");
    });

    it("Enters [First Name, Middle Name, Last Name] upto 80 alphanumeric characters", () => {
        const sample =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKG";

        cy.get(`[${key.textBox}-firstName] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.textBox}-middleName] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.textBox}-lastName] > input`).type(sample).should("have.value", sample);
    });

    it("Enters [First Name, Middle Name, Last Name] more than 80 alphanumeric characters", () => {
        const sampleExpected =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKG";
        const sampleFailed =
            "AOuIrmSN582i8W55Xpu9olHeeCR FaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKGAOuIrmSN582i8";

        cy.get(`[${key.textBox}-firstName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.textBox}-middleName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.textBox}-lastName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters Suffix upto 10 alphanumeric characters", () => {
        const sample = "AOuIrm N58";

        cy.get(`[${key.textBox}-suffix] > input`).type(sample).should("have.value", sample);
    });

    it("Enters Suffix more than 10 alphanumeric characters ", () => {
        const sampleExpected = "AOuIrm N58";
        const sampleFailed = "AOuIrm N58AOuIrm N58";

        cy.get(`[${key.textBox}-suffix] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters [Name Fields] that have dot(.), comma(,), apostrophe('), quotation mark(`) and hyphen (-)", () => {
        const sample = "A.u,r-m'N\"";

        cy.get(`[${key.textBox}-firstName] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.textBox}-middleName] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.textBox}-lastName] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.textBox}-suffix] > input`).type(sample).should("have.value", sample);
    });

    it("Enters [Name Fields] that are not dot(.), comma(,), apostrophe('), quotation mark(`) and hyphen (-)", () => {
        const sampleExpected = ".,-'\"";
        const sampleFailed = "?!.@,$-#'&\"";

        cy.get(`[${key.textBox}-firstName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.textBox}-middleName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.textBox}-lastName] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.textBox}-suffix] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters PRC Number upto 20 numeric characters", () => {
        const sample = "12345678912345678912";

        cy.get(`[${key.textBox}-prc] > input`).type(sample).should("have.value", sample);
    });

    it("Enters PRC Number more than 20 numeric characters", () => {
        const sampleExpected = "12345678912345678912";
        const sampleFailed = "123456789123456789121";

        cy.get(`[${key.textBox}-prc] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Enters PRC Number that are not numeric characters", () => {
        const sampleExpected = "8901234";
        const sampleFailed = "8@9$01S2M34";

        cy.get(`[${key.textBox}-prc] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
    });

    it("Proceed with empty fields", () => {
        cy.get(`[${key.button}-proceed]`).click();
        cy.get(`[${key.errorText}-firstName]`).should("have.text", "Enter first name");
        cy.get(`[${key.errorText}-lastName]`).should("have.text", "Enter last name");
        cy.get(`[${key.errorText}-prc]`).should("have.text", "Enter PRC number");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Proceed with invalid name and prc number", () => {
        cy.fixture("register/doctor-details.json").then((data) => {
            const doctors = data?.doctors.filter(
                ({ mode_of_payment, affiliation_status }, index) =>
                    (mode_of_payment !== "I" || affiliation_status !== "A") && index < 3
            );

            let index = 0;
            for (const doctor of doctors) {
                const {
                    first_name,
                    last_name,
                    prc_no,
                    mode_of_payment,
                    affiliation_status,
                } = doctor;

                cy.get(`[${key.textBox}-firstName] > input`)
                    .clear()
                    .type(first_name)
                    .should("have.value", first_name);
                cy.get(`[${key.textBox}-lastName] > input`)
                    .clear()
                    .type(last_name)
                    .should("have.value", last_name);
                cy.get(`[${key.textBox}-prc] > input`)
                    .clear()
                    .type(prc_no)
                    .should("have.value", prc_no);

                cy.get(`[${key.button}-proceed]`).click();
                cy.get(`[${key.errorText}-prc]`).should("have.text", "Doctor is not affiliated.");

                if (screenshot) {
                    cy.screenshot(
                        `0${index} - Verify Doctor with PRC Number (${prc_no}), Affiliation Status (${affiliation_status}), and Mode of Payment (${mode_of_payment}).`
                    );
                }

                index++;
            }
        });
    });

    it("Proceed with already registered doctor", () => {
        cy.fixture("register/doctor-details.json").then(({ doctors }) => {
            const doctor = doctors?.find((item) => item.registered);
            const { first_name, last_name, prc_no } = doctor;

            cy.get(`[${key.textBox}-firstName] > input`)
                .type(first_name)
                .should("have.value", first_name);
            cy.get(`[${key.textBox}-lastName] > input`)
                .type(last_name)
                .should("have.value", last_name);
            cy.get(`[${key.textBox}-prc] > input`).type(prc_no).should("have.value", prc_no);

            cy.get(`[${key.button}-proceed]`).click();
            cy.get(`[${key.errorText}-prc]`).should("have.text", "Doctor has already registered.");

            if (screenshot) {
                cy.screenshot();
            }
        });
    });

    it("Proceed with valid information", () => {
        cy.fixture("register/doctor-details.json").then(({ doctors }) => {
            const doctor = doctors?.find(
                (item) =>
                    !item.registered &&
                    (item.mode_of_payment === "I" || item.affiliation_status === "A")
            );
            const { first_name, last_name, prc_no } = doctor;

            cy.get(`[${key.textBox}-firstName] > input`)
                .type(first_name)
                .should("have.value", first_name);
            cy.get(`[${key.textBox}-lastName] > input`)
                .type(last_name)
                .should("have.value", last_name);
            cy.get(`[${key.textBox}-prc] > input`).type(prc_no).should("have.value", prc_no);

            cy.get(`[${key.button}-proceed]`).click();
            cy.location("pathname").should("eq", "/register");

            if (screenshot) {
                cy.screenshot();
            }
        });
    });
});
