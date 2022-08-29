const {describe} = require('mocha');
const {assert} = require('chai'); 

const flowerShop = {
    calcPriceOfFlowers(flower, price, quantity) {
        if (typeof flower != 'string' || !Number.isInteger(price) || !Number.isInteger(quantity)) {
            throw new Error('Invalid input!');
        } else {
            let result = price * quantity;
            return `You need $${result.toFixed(2)} to buy ${flower}!`;
        }
    },
    checkFlowersAvailable(flower, gardenArr) {
        if (gardenArr.indexOf(flower) >= 0) {
            return `The ${flower} are available!`;
        } else {
            return `The ${flower} are sold! You need to purchase more!`;
        }
    },
    sellFlowers(gardenArr, space) {
        let shop = [];
        let i = 0;
        if (!Array.isArray(gardenArr) || !Number.isInteger(space) || space < 0 || space >= gardenArr.length) {
            throw new Error('Invalid input!');
        } else {
            while (gardenArr.length > i) {
                if (i != space) {
                    shop.push(gardenArr[i]);
                }
                i++
            }
        }
        return shop.join(' / ');
    }
}

describe("Flower shop", () => {
    it("Calculate price of flowers", () => {

        assert.equal(flowerShop.calcPriceOfFlowers('Rose', 2, 3), "You need $6.00 to buy Rose!");

        assert.throw(() => flowerShop.calcPriceOfFlowers(1, 2, 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers([], 2, 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers({}, 2, 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(undefined, 2, 3), "Invalid input!");

        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose','' , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose',[] , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose',{} , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose',undefined , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', '5' , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', '5' , 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 1.567 , 3), "Invalid input!");

        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5, ''), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5, []), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5, {}), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5 , undefined), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5 , '3'), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('Rose', 5 , 2.476), "Invalid input!");

        assert.throw(() => flowerShop.calcPriceOfFlowers(), "Invalid input!");

    });

    it("Check for available flowers", () => {
        assert.equal(flowerShop.checkFlowersAvailable('Lotus', ["Rose", "Lily", "Orchid"]), "The Lotus are sold! You need to purchase more!");
        assert.equal(flowerShop.checkFlowersAvailable('Rose', ["Rose", "Lily", "Orchid"]), "The Rose are available!");
    });

    it("Sell flowers", () => {

        assert.equal(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 0), "Lily / Orchid");
        assert.equal(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 1), "Rose / Orchid");
        assert.equal(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 2), "Rose / Lily");

        assert.throw(() => flowerShop.calcPriceOfFlowers(5, 2), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers({}, 2), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers('', 2), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(undefined, 2), "Invalid input!");
       

        assert.throw(() => flowerShop.calcPriceOfFlowers([], 0), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], ), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], -5), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], 3), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], 3.5), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], {}), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], ''), "Invalid input!");
        assert.throw(() => flowerShop.calcPriceOfFlowers(["Rose", "Lily", "Orchid"], undefined), "Invalid input!");
    });
});
