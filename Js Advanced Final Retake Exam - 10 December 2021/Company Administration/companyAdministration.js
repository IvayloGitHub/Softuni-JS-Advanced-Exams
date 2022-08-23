const {describe} = require('mocha');
const {assert} = require('chai');

const companyAdministration = {

    hiringEmployee(name, position, yearsExperience) {
        if (position == "Programmer") {
            if (yearsExperience >= 3) {
                return `${name} was successfully hired for the position ${position}.`;
            } else {
                return `${name} is not approved for this position.`;
            }
        }
        throw new Error(`We are not looking for workers for this position.`);
    },
    calculateSalary(hours) {

        let payPerHour = 15;
        let totalAmount = payPerHour * hours;

        if (typeof hours !== "number" || hours < 0) {
            throw new Error("Invalid hours");
        } else if (hours > 160) {
            totalAmount += 1000;
        }
        return totalAmount;
    },
    firedEmployee(employees, index) {

        let result = [];

        if (!Array.isArray(employees) || !Number.isInteger(index) || index < 0 || index >= employees.length) {
            throw new Error("Invalid input");
        }
        for (let i = 0; i < employees.length; i++) {
            if (i !== index) {
                result.push(employees[i]);
            }
        }
        return result.join(", ");
    }

};

describe("Company Administration", () => {
    it("Hiring employye", () => {
        assert.throw(() => companyAdministration.hiringEmployee('Yoan', 'Director', 1), `We are not looking for workers for this position.`);
        assert.equal(companyAdministration.hiringEmployee('Yoan', 'Programmer', 3), `Yoan was successfully hired for the position Programmer.`);
        assert.equal(companyAdministration.hiringEmployee('Yoan', 'Programmer', 4), `Yoan was successfully hired for the position Programmer.`);
        assert.equal(companyAdministration.hiringEmployee('Yoan', 'Programmer', 2), `Yoan is not approved for this position.`);
        assert.equal(companyAdministration.hiringEmployee('Yoan', 'Programmer', 0), `Yoan is not approved for this position.`);
    });

    it("Calculate salary", () => {
        assert.throw(() => companyAdministration.calculateSalary(''), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary('5'), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary({}), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary([]), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary(undefined), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary('5ab'), "Invalid hours");
        assert.throw(() => companyAdministration.calculateSalary(-1), "Invalid hours");

        assert.equal(companyAdministration.calculateSalary(40), 600);
        assert.equal(companyAdministration.calculateSalary(161), 3415);
        assert.equal(companyAdministration.calculateSalary(160), 2400);
        assert.equal(companyAdministration.calculateSalary(159), 2385);
    });

    it ("Fired employee", () => {
        assert.throw(() => companyAdministration.firedEmployee('', 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee({}, 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(undefined, 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee('abc', 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(NaN, 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(5, 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(3), "Invalid input");

        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], -1), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 3), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], ''), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], {}), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], []), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"]), "Invalid input");
        assert.throw(() => companyAdministration.firedEmployee(["Petar", "Ivan", "George"], undefined), "Invalid input");

        assert.equal(companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 0), "Ivan, George");
        assert.equal(companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 1), "Petar, George");
        assert.equal(companyAdministration.firedEmployee(["Petar", "Ivan", "George"], 2), "Petar, Ivan");
    }); 
});

