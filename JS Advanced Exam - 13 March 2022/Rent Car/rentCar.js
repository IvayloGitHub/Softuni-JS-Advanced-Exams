const {describe} = require('mocha');
const {assert} = require('chai'); 

const rentCar = {
    searchCar(shop, model) {
        let findModel = [];
        if (Array.isArray(shop) && typeof model == 'string') {
            for (let i = 0; i < shop.length; i++) {
                if (model == shop[i]) {
                    findModel.push(shop[i]);
                }
            }
            if (findModel.length !== 0) {
                return `There is ${findModel.length} car of model ${model} in the catalog!`;
            } else {
                throw new Error('There are no such models in the catalog!')
            }
        } else {
            throw new Error('Invalid input!')
        }
    },
    calculatePriceOfCar(model, days) {
        let catalogue = {
            Volkswagen: 20,
            Audi: 36,
            Toyota: 40,
            BMW: 45,
            Mercedes: 50
        };

        if (typeof model == 'string' && Number.isInteger(days)) {
            if (catalogue.hasOwnProperty(model)) {
                let cost = catalogue[model] * days;
                return `You choose ${model} and it will cost $${cost}!`
            } else {
                throw new Error('No such model in the catalog!')
            }
        } else {
            throw new Error('Invalid input!')
        }
    },
    checkBudget(costPerDay, days, budget) {
        if (!Number.isInteger(costPerDay) || !Number.isInteger(days) || !Number.isInteger(budget)) {
            throw new Error('Invalid input!');
        } else {
            let cost = costPerDay * days;
            if (cost <= budget) {
                return `You rent a car!`
            } else {
                return 'You need a bigger budget!'
            }
        }
    }
}

describe("Rent car", () => {

    it("Search car", () => {
        assert.equal(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], "Audi"), "There is 1 car of model Audi in the catalog!");
        assert.equal(rentCar.searchCar(["Audi","Volkswagen", "BMW", "Audi"], "Audi"), "There is 2 car of model Audi in the catalog!");

        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], "Toyota"), "There are no such models in the catalog!");
        assert.throw(() => rentCar.searchCar([], "Toyota"), "There are no such models in the catalog!");
        
        assert.throw(() => rentCar.searchCar(5, "Toyota"), "Invalid input!");
        assert.throw(() => rentCar.searchCar('', "Toyota"), "Invalid input!");
        assert.throw(() => rentCar.searchCar(undefined, "Toyota"), "Invalid input!");
        assert.throw(() => rentCar.searchCar({}, "Toyota"), "Invalid input!");

        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 5), "Invalid input!");
        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], {}), "Invalid input!");
        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], []), "Invalid input!");
        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], undefined), "Invalid input!");
        assert.throw(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], ), "Invalid input!");
    });

    it("Calculate price of car", () => {
        assert.equal(rentCar.calculatePriceOfCar("Volkswagen", 5), "You choose Volkswagen and it will cost $100!");
        assert.equal(rentCar.calculatePriceOfCar("Audi", 5), "You choose Audi and it will cost $180!");
        assert.equal(rentCar.calculatePriceOfCar("Toyota", 5), "You choose Toyota and it will cost $200!");
        assert.equal(rentCar.calculatePriceOfCar("BMW", 5), "You choose BMW and it will cost $225!");
        assert.equal(rentCar.calculatePriceOfCar("Mercedes", 5), "You choose Mercedes and it will cost $250!");

        assert.throw(() => rentCar.calculatePriceOfCar("Opel", 5), "No such model in the catalog!");

        assert.throw(() => rentCar.calculatePriceOfCar(5, 5), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar([], 5), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar({}, 5), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar(undefined, 5), "Invalid input!");

        assert.throw(() => rentCar.calculatePriceOfCar("Toyota", 5.4), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar("Toyota", ''), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar("Toyota", []), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar("Toyota", {}), "Invalid input!");
        assert.throw(() => rentCar.calculatePriceOfCar("Toyota", undefined), "Invalid input!");
    });

    it("Check budget", () => {
        assert.equal(rentCar.checkBudget(40, 5, 200), "You rent a car!");
        assert.equal(rentCar.checkBudget(40, 5, 201), "You rent a car!");
        assert.equal(rentCar.checkBudget(40, 5, 199), "You need a bigger budget!");

        assert.throw(() => rentCar.checkBudget(40.2, 5, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget('', 5, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget([], 5, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget({}, 5, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(undefined, 5, 200), "Invalid input!");

        assert.throw(() => rentCar.checkBudget(40, 5.2, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, '', 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, [], 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, {}, 200), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, undefined, 200), "Invalid input!");

        assert.throw(() => rentCar.checkBudget(40, 5, 200.2), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, 5, ''), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, 5, []), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, 5, {}), "Invalid input!");
        assert.throw(() => rentCar.checkBudget(40, 5, undefined), "Invalid input!");
    });

});