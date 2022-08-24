const {describe} = require('mocha');
const {assert} = require('chai');

const testNumbers = {
    sumNumbers: function (num1, num2) {
        let sum = 0;

        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        } else {
            sum = (num1 + num2).toFixed(2);
            return sum
        }
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input % 2 === 0) {
            return 'The number is even!';
        } else {
            return 'The number is odd!';
        }

    },
    averageSumArray: function (arr) {

        let arraySum = 0;

        for (let i = 0; i < arr.length; i++) {
            arraySum += arr[i]
        }

        return arraySum / arr.length
    }
};

describe("Test Numbers", () => {
    it("Sum number", () => {
        assert.equal(testNumbers.sumNumbers('', 1), undefined);
        assert.equal(testNumbers.sumNumbers(1, ''), undefined);
        assert.equal(testNumbers.sumNumbers('', ''), undefined);
        assert.equal(testNumbers.sumNumbers('1', '2a'), undefined);
        assert.equal(testNumbers.sumNumbers({}, 1), undefined);
        assert.equal(testNumbers.sumNumbers(1, {}), undefined);
        assert.equal(testNumbers.sumNumbers(1, []), undefined);
        assert.equal(testNumbers.sumNumbers([], 1), undefined);

        assert.equal(testNumbers.sumNumbers(2, 1), 3.00);
        assert.equal(testNumbers.sumNumbers(-2, 1), -1.00);
        assert.equal(testNumbers.sumNumbers(-2, -1), -3.00);
        assert.equal(testNumbers.sumNumbers(5.303, 1.302), 6.61);
    });

    it("Number checker", () => {
        assert.throw(() => testNumbers.numberChecker('5a'), "The input is not a number!");
        assert.throw(() => testNumbers.numberChecker({}), "The input is not a number!");
        assert.throw(() => testNumbers.numberChecker(undefined), "The input is not a number!");

        assert.equal(testNumbers.numberChecker(4), "The number is even!");
        assert.equal(testNumbers.numberChecker(-4), "The number is even!");
        assert.equal(testNumbers.numberChecker(3), "The number is odd!");
        assert.equal(testNumbers.numberChecker(-3), "The number is odd!");

    });

    it("Average sum", () => {
        assert.equal(testNumbers.averageSumArray([1, 2, 3]), 2);
        assert.equal(testNumbers.averageSumArray([1, 1]), 1);
    });
});



