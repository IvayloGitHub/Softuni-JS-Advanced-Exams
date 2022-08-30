const {describe} = require('mocha');
const {assert} = require('chai');

const carService = {
  isItExpensive(issue) {
    if (issue === "Engine" || issue === "Transmission") {
      return `The issue with the car is more severe and it will cost more money`;
    } else {
      return `The overall price will be a bit cheaper`;
    }
  },
  discount(numberOfParts, totalPrice) {
    if (typeof numberOfParts !== "number" || typeof totalPrice !== "number") {
      throw new Error("Invalid input");
    }

    let discountPercentage = 0;

    if (numberOfParts > 2 && numberOfParts <= 7) {
      discountPercentage = 15;
    } else if (numberOfParts > 7) {
      discountPercentage = 30;
    }

    let result = (discountPercentage / 100) * totalPrice;

    if (numberOfParts <= 2) {
      return "You cannot apply a discount";
    } else {
      return `Discount applied! You saved ${result}$`;
    }
  },
  partsToBuy(partsCatalog, neededParts) {
    let totalSum = 0;

    if (!Array.isArray(partsCatalog) || !Array.isArray(neededParts)) {
      throw new Error("Invalid input");
    }
    neededParts.forEach((neededPart) => {
      partsCatalog.map((obj) => {
        if (obj.part === neededPart) {
          totalSum += obj.price;
        }
      });
    });

    return totalSum;
  },
};

describe("Car Service", () => {
    it("Is it expensive", () => {
        assert.equal(carService.isItExpensive("Engine"), "The issue with the car is more severe and it will cost more money");
        assert.equal(carService.isItExpensive("Transmission"), "The issue with the car is more severe and it will cost more money");
        assert.equal(carService.isItExpensive("Inspection"), "The overall price will be a bit cheaper");
    });

    it("Discount", () => {
        assert.equal(carService.discount(3, 300), "Discount applied! You saved 45$");
        assert.equal(carService.discount(7, 300), "Discount applied! You saved 45$");
        assert.equal(carService.discount(8, 300), "Discount applied! You saved 90$");
        assert.equal(carService.discount(2, 300), "You cannot apply a discount");
        assert.equal(carService.discount(1, 300), "You cannot apply a discount");
        assert.equal(carService.discount(0, 300), "You cannot apply a discount");
        
        assert.throw(() => carService.discount('', 300), "Invalid input");
        assert.throw(() => carService.discount([], 300), "Invalid input");
        assert.throw(() => carService.discount({}, 300), "Invalid input");
        assert.throw(() => carService.discount(undefined, 300), "Invalid input");
        assert.throw(() => carService.discount('3', 300), "Invalid input");

        assert.throw(() => carService.discount(3, ''), "Invalid input");
        assert.throw(() => carService.discount(3, []), "Invalid input");
        assert.throw(() => carService.discount(3, {}), "Invalid input");
        assert.throw(() => carService.discount(3, undefined), "Invalid input");
        assert.throw(() => carService.discount(3, '300'), "Invalid input");
    });

    it("Parts to buy", () => {
        assert.equal(carService.partsToBuy([], ["blowoff valve", "injectors"]), 0);
        assert.equal(carService.partsToBuy([{ part: "blowoff valve", price: 145 }], []), 0);
        assert.equal(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "coil springs"]), 375);
        assert.equal(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "injectors"]), 145);

        assert.throw(() => carService.partsToBuy('', ["blowoff valve", "injectors"]), "Invalid input");
        assert.throw(() => carService.partsToBuy({}, ["blowoff valve", "injectors"]), "Invalid input");
        assert.throw(() => carService.partsToBuy(undefined, ["blowoff valve", "injectors"]), "Invalid input");
        assert.throw(() => carService.partsToBuy(4, ["blowoff valve", "injectors"]), "Invalid input");

        assert.throw(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }], ), "Invalid input");
        assert.throw(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }], 4), "Invalid input");
        assert.throw(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }], ''), "Invalid input");
        assert.throw(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }], {}), "Invalid input");
        assert.throw(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }], undefined), "Invalid input");
    });
});
