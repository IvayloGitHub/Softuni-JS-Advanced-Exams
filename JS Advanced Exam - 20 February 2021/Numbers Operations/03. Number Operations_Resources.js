const {describe} = require('mocha');
const {assert} = require('chai');

const numberOperations = {
    powNumber: function (num) {
        return num * num;
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input < 100) {
            return 'The number is lower than 100!';
        } else {
            return 'The number is greater or equal to 100!';
        }
    },
    sumArrays: function (array1, array2) {

        const longerArr = array1.length > array2.length ? array1 : array2;
        const rounds = array1.length < array2.length ? array1.length : array2.length;

        const resultArr = [];

        for (let i = 0; i < rounds; i++) {
            resultArr.push(array1[i] + array2[i]);
        }

        resultArr.push(...longerArr.slice(rounds));

        return resultArr
    }
};

describe("Number Operations", () => {

    it("Pow number", () => {
        assert.equal(numberOperations.powNumber(2), 4);
        assert.equal(numberOperations.powNumber(4), 16);
    });

    it("Number checker", () => {
        assert.throw(() => numberOperations.numberChecker('5a'), 'The input is not a number!');
        assert.throw(() => numberOperations.numberChecker(undefined), 'The input is not a number!');
        assert.throw(() => numberOperations.numberChecker(), 'The input is not a number!');
        assert.throw(() => numberOperations.numberChecker({}), 'The input is not a number!');
        
        assert.equal(numberOperations.numberChecker(1), "The number is lower than 100!");
        assert.equal(numberOperations.numberChecker(-1), "The number is lower than 100!");
        assert.equal(numberOperations.numberChecker(0), "The number is lower than 100!");
        assert.equal(numberOperations.numberChecker(99), "The number is lower than 100!");

        assert.equal(numberOperations.numberChecker(100), 'The number is greater or equal to 100!');
        assert.equal(numberOperations.numberChecker(101), 'The number is greater or equal to 100!');
    });

    it("Sum array", () => {
        assert.deepEqual(numberOperations.sumArrays([1,2],[3,4]), [4,6]);
        assert.deepEqual(numberOperations.sumArrays([],[3,4]), [3,4]);
        assert.deepEqual(numberOperations.sumArrays([1],[]), [1]);
        assert.deepEqual(numberOperations.sumArrays([],[]), []);
    });
});