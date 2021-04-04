/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe("Register Account - Negative Scenarios", () => {
    let key;
    let screenshot;
    let name = {};
    before(() => {
        key = Cypress.env("key");
        screenshot = Cypress.env("screenshot");

        cy.fixture("register/user-details").then((data) => {
            const details = data?.details?.find((item) => !item.registered);

            name["first_name"] = details?.first_name;
            name["last_name"] = details?.last_name;
            name["middle_name"] = details?.middle_name;
            name["suffix"] = details?.suffix;
            name["prc_no"] = details?.prc_no;
        });
    });

    beforeEach(() => {
        cy.visit("/verify-user");

        const { first_name, middle_name, last_name, suffix, prc_no } = name;

        cy.get(`[${key.textBox}-firstName] > input`)
            .type(first_name)
            .should("have.value", first_name);
        cy.get(`[${key.textBox}-lastName] > input`).type(last_name).should("have.value", last_name);
        cy.get(`[${key.textBox}-prc] > input`).type(prc_no).should("have.value", prc_no);

        if (suffix)
            cy.get(`[${key.textBox}-suffix] > input`).type(suffix).should("have.value", suffix);

        if (middle_name)
            cy.get(`[${key.textBox}-middleName] > input`)
                .type(middle_name)
                .should("have.value", middle_name);

        cy.get(`[${key.button}-proceed]`).click();
        cy.location("pathname").should("eq", "/register");
    });

    it("Enters [Email, Password, Confirm Password, Other Channel] upto 80 alphanumeric characters", () => {
        const sample =
            "AOuIrmSN582i8W55Xpu9olHeeCRwFaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKG";

        cy.get(`[${key.textBox}-email] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.password}-confirmPassword] > input`)
            .type(sample)
            .should("have.value", sample);

        cy.get("[data-cy=mdCheckbox]").contains("Other").click();
        cy.get(`[${key.textArea}-other]`).type(sample).should("have.value", sample);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters [Email, Password, Confirm Password, Other Channel] more than 80 alphanumeric characters", () => {
        const sampleExpected =
            "AOuIrmSN582i8W55Xpu9olHeeCRFaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKGA";
        const sampleFailed =
            "AOuIrmSN582i8W55Xpu9olHeeCRFaT7i3UMgLJjgDDaNyQ6u5JWG69vV528L8X2580RCVieKL123qKGA";

        cy.get(`[${key.textBox}-email] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.password}-password] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);
        cy.get(`[${key.password}-confirmPassword] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        cy.get("[data-cy=mdCheckbox]").contains("Other").click();
        cy.get(`[${key.textArea}-other]`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Email that have dot (.), at (@), underscore (_), and hyphen (-)", () => {
        const sample = "test_user-001@gmail.com";

        cy.get(`[${key.textBox}-email] > input`).type(sample).should("have.value", sample);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Email that are not dot (.), at (@), underscore (_), and hyphen (-)", () => {
        const sampleExpected = "test_user-001@gmail.com";
        const sampleFailed = "te!st_us$er-001@gm#ai`l.co&m";

        cy.get(`[${key.textBox}-email] > input`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Mobile Number upto 10 numeric characters", () => {
        const sample = "9171432492";
        const sampleExpected = "+63 9171432492";

        cy.get(`[${key.textBox}-mobile]`).type(sample).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Mobile Number more than 10 numeric characters", () => {
        const sampleExpected = "+63 9171432492";
        const sampleFailed = "917143249252";

        cy.get(`[${key.textBox}-mobile]`).type(sampleFailed).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Mobile Number that are not numeric characters", () => {
        const sampleExpected = "+63 9171432492";
        const sampleFailed = "91@7!1A4S3(2f4E92";

        cy.get(`[${key.textBox}-mobile]`).type(sampleFailed).should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Enters Other Teleconsultation Channel that are not alphanumeric characters", () => {
        const sampleExpected = "Im the smpl3 0teR TelecnsulaT0n Ch4nn";
        const sampleFailed = "I'm the s@mpl3 0t#eR Telec()nsul&aT!0n Ch4nn^`";

        cy.get(`[${key.checkbox}]`).contains("Other").click();
        cy.get(`[${key.textArea}-other]`)
            .type(sampleFailed)
            .should("have.value", sampleExpected);

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Register with empty fields", () => {
        cy.get(`[${key.checkbox}-terms]`).click();
        cy.get(`[${key.button}-register]`).click();
        cy.get(`[${key.errorText}-mobile]`).should("have.text", "Enter mobile number");
        cy.get(`[${key.errorText}-email]`).should("have.text", "Enter email address");
        cy.get(`[${key.errorText}-password]`).should("have.text", "Enter password");
        cy.get(`[${key.errorText}-confirmPassword]`).should("have.text", "Enter confirm password");
        cy.get(`[${key.errorText}-channel]`).should("have.text", "Select teleconsultation channel");
        cy.get(`[${key.errorText}-schedule]`).should("have.text", "Add teleconsultation schedule");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Mask [Password, Confirm Password] by clicking show/hide", () => {
        const sample = "Kxy@Ec^now2!";
        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.password}-password] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-password] > input`).should("have.attr", "type", "text");

        cy.get(`[${key.password}-confirmPassword] > input`)
            .type(sample)
            .should("have.value", sample);
        cy.get(`[${key.password}-confirmPassword] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-confirmPassword] > input`).should("have.attr", "type", "text");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`[${key.password}-password] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-password] > input`).should("have.attr", "type", "password");

        cy.get(`[${key.password}-confirmPassword] > .mdHiddenContainer`).click();
        cy.get(`[${key.password}-confirmPassword] > input`).should("have.attr", "type", "password");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Validate Password requirements", () => {
        let sample = "E";
        cy.get(`[${key.password}-password] > input`).type(sample).should("have.value", sample);
        cy.get(`[${key.passwordRequirement}-uppercase]`)
            .find(".icon")
            .should("have.attr", "class", "blue check icon");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`[${key.password}-password] > input`).type("c^").should("have.value", "Ec^");
        cy.get(`[${key.passwordRequirement}-special]`)
            .find(".icon")
            .should("have.attr", "class", "blue check icon");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`[${key.password}-password] > input`).type("nu6").should("have.value", "Ec^nu6");
        cy.get(`[${key.passwordRequirement}-numeric]`)
            .find(".icon")
            .should("have.attr", "class", "blue check icon");

        if (screenshot) {
            cy.screenshot();
        }

        cy.get(`[${key.password}-password] > input`).type("q!").should("have.value", "Ec^nu6q!");
        cy.get(`[${key.passwordRequirement}-length]`)
            .find(".icon")
            .should("have.attr", "class", "blue check icon");
        cy.get(`[${key.passwordRequirement}-strength]`)
            .find(".icon")
            .should("have.attr", "class", "blue check icon");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Select teleconsult channels", () => {
        cy.fixture("register/register.json").then(({ channels }) => {
            channels.forEach((channel) => {
                cy.get("[data-cy=mdCheckbox]").contains(channel).click();
            });

            if (screenshot) {
                cy.screenshot();
            }
        });
    });

    it("Show other channel field", () => {
        cy.get(`[${key.checkbox}]`).contains("Other").click();
        cy.get(`[${key.textArea}-other]`).should("be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Show Teleconsult Modal", () => {
        cy.get(`[${key.button}-addSchedule]`).should("have.text", "Add Schedule").click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Show warning by pressing escape button", () => {
        cy.get(`[${key.button}-addSchedule]`).should("have.text", "Add Schedule").click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get("body").type("{esc}");
        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.title}`)
            .should("have.text", "Discard Changes?");

        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.confirm}`)
            .should("have.text", "Yes, discard changes");

        cy.get(`${key.alert.info}`)
            .find(`${key.alert.cancel}`)
            .should("have.text", "No, continue editing");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Show warning by clicking cancel button", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get(`[${key.button}-cancel]`).click();
        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.title}`)
            .should("have.text", "Discard Changes?");

        cy.get(`${key.alert.info}`)
            .should("be.visible")
            .find(`${key.alert.confirm}`)
            .should("have.text", "Yes, discard changes");

        cy.get(`${key.alert.info}`)
            .find(`${key.alert.cancel}`)
            .should("have.text", "No, continue editing");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Close Schedule Modal by clicking [Yes, Discard Changes] button", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get("body").type("{esc}");
        cy.get(`${key.alert.confirm}`).click();
        cy.get(`[${key.modal}-schedule]`).should("not.be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Should not Close Schedule Modal by clicking [No, continue editing]  button", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get("body").type("{esc}");
        cy.get(`${key.alert.cancel}`).click();
        cy.get(`${key.alert.info}`).should("not.be.visible");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Select/Deselect Schedule Day(s)", () => {
        cy.fixture("register/register.json").then(({ days }) => {
            cy.get(`[${key.button}-addSchedule]`).click();
            cy.get(`[${key.modal}-schedule]`).should("be.visible");

            days.forEach((day) => {
                cy.get(`[${key.chip}-${day}]`).click().should("have.class", "mdSelected");
            });

            if (screenshot) {
                cy.screenshot();
            }

            days.forEach((day) => {
                cy.get(`[${key.chip}-${day}]`).click().should("not.have.class", "mdSelected");
            });

            if (screenshot) {
                cy.screenshot();
            }
        });
    });

    it("Add Schedule with empty fields", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get(`[${key.button}-submit]`).click();
        cy.get(`[${key.errorText}-day]`).should("have.text", "Select day(s)");
        cy.get(`[${key.errorText}-from]`).should("have.text", "Select time from");

        cy.get(`[${key.errorText}-to]`).should("have.text", "Select time to");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Add Schedule with multiple time empty fields", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get(`[${key.chip}-M]`).click().should("have.class", "mdSelected");

        for (let i = 0; i < 4; i++) {
            cy.get(`[${key.buttonIcon}-add]`).click();
        }

        cy.get(`[${key.button}-submit]`).click();

        cy.get(`[${key.errorText}-from]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                expect(text).to.be.equal("Select time from");
            }
        });

        cy.get(`[${key.errorText}-to]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                expect(text).to.be.equal("Select time to");
            }
        });

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Add Schedule with Invalid Time Selection", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get(`[${key.chip}-T]`).click().should("have.class", "mdSelected");

        cy.get(`[${key.timeInput}-from] > input`).click();
        cy.get(".suicr-content-item").eq(10).click();

        // eslint-disable-next-line cypress/no-force
        cy.get(`[${key.timeInput}-to] > input`).click({ force: true });
        // eslint-disable-next-line cypress/no-force
        cy.get(".suicr-content-item").eq(5).click({ force: true });

        cy.get(`[${key.button}-submit]`).click();

        cy.get(`[${key.errorText}-from]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                expect(text).to.be.equal("Invalid time selection");
            }
        });

        cy.get(`[${key.errorText}-to]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                expect(text).to.be.equal("Invalid time selection");
            }
        });

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Add Schedule with Overlapping Time", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        cy.get(`[${key.chip}-T]`).click().should("have.class", "mdSelected");

        for (let i = 0; i < 2; i++) {
            cy.get(`[${key.buttonIcon}-add]`).click();
        }

        const timeFroms = [
            [10, 6],
            [2, 6],
            [13, 1],
        ];

        const timeTos = [
            [12, 4],
            [10, 9],
            [17, 6],
        ];

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

        cy.get(`[${key.errorText}-from]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                if (text) {
                    expect(text).to.be.equal("Overlapping schedules");
                }
            }
        });

        cy.get(`[${key.errorText}-to]`).should(($item) => {
            for (const item of $item) {
                const text = item.textContent;
                if (text) {
                    expect(text).to.be.equal("Overlapping schedules");
                }
            }
        });

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Add Schedule with valid information", () => {
        cy.get(`[${key.button}-addSchedule]`).click();
        cy.get(`[${key.modal}-schedule]`).should("be.visible");

        const days = ["S", "M", "T", "W", "TH", "F", "SA"];

        days.forEach((day) => {
            cy.get(`[${key.chip}-${day}]`).click().should("have.class", "mdSelected");
        });

        cy.get(`[${key.buttonIcon}-add]`).click();

        const timeFroms = [
            [9, 6],
            [13, 8],
        ];

        const timeTos = [
            [12, 6],
            [17, 6],
        ];

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
                cy.get(`[${key.table.cell}]`)
                    .eq(0)
                    .should(
                        "have.text",
                        "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday"
                    );
                cy.get(`[${key.table.cell}]`)
                    .eq(1)
                    .should("have.text", "09:30 - 12:3013:40 - 17:30");
            });

        cy.get(`[${key.button}-save]`).click();
        cy.get(`[${key.modal}-schedule]`).should("not.be.visible");

        cy.get(`[${key.card}]`).each(($item) => {
            cy.wrap($item)
                .find(".header")
                .should(
                    "have.text",
                    "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday"
                );
        });

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Register with password doesn't match", () => {
        const sampleExpected = "Ec^nu6q!";
        const sampleFailed = "Ec^nu6q!2020";
        cy.get(`[${key.password}-password] > input`)
            .type(sampleExpected)
            .should("have.value", sampleExpected);
        cy.get(`[${key.password}-confirmPassword] > input`)
            .type(sampleFailed)
            .should("have.value", sampleFailed);

        cy.get(`[${key.checkbox}-terms]`).click();
        cy.get(`[${key.button}-register]`).click();

        cy.get(`[${key.errorText}-confirmPassword]`).should("have.text", "Password doesn't match");

        if (screenshot) {
            cy.screenshot();
        }
    });

    it("Register with already taken Email Address and Mobile Number", () => {
        cy.fixture("register/user-details").then(({ invalid_information }) => {
            const {
                days,
                email,
                times,
                mobile,
                timeTos,
                daysName,
                password,
                channels,
                timeFroms,
            } = invalid_information;

            const _times = times?.join("");
            const _daysName = daysName?.join(", ");

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

            cy.get(`[${key.textBox}-mobile]`).type(mobile).should("have.value", `+63 ${mobile}`);
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

            cy.get(`[${key.checkbox}-terms]`).click();
            cy.get(`[${key.button}-register]`).click();

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(4000);

            cy.get(`[${key.errorText}-mobile]`).should(
                "have.text",
                "Mobile number already linked to an account."
            );
            cy.get(`[${key.errorText}-email]`).should(
                "have.text",
                "Email address already linked to an account."
            );

            if (screenshot) {
                cy.screenshot();
            }
        });
    });
});
