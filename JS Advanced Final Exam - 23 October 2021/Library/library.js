const {describe} = require('mocha');
const {assert} = require('chai');

const library = {
    calcPriceOfBook(nameOfBook, year) {

        let price = 20;
        if (typeof nameOfBook != "string" || !Number.isInteger(year)) {
            throw new Error("Invalid input");
        } else if (year <= 1980) {
            let total = price - (price * 0.5);
            return `Price of ${nameOfBook} is ${total.toFixed(2)}`;
        }
        return `Price of ${nameOfBook} is ${price.toFixed(2)}`;
    },

    findBook: function(booksArr, desiredBook) {
        if (booksArr.length == 0) {
            throw new Error("No books currently available");
        } else if (booksArr.find(e => e == desiredBook)) {
            return "We found the book you want.";
        } else {
            return "The book you are looking for is not here!";
        }

    },
    arrangeTheBooks(countBooks) {
        const countShelves = 5;
        const availableSpace = countShelves * 8;

        if (!Number.isInteger(countBooks) || countBooks < 0) {
            throw new Error("Invalid input");
        } else if (availableSpace >= countBooks) {
            return "Great job, the books are arranged.";
        } else {
            return "Insufficient space, more shelves need to be purchased.";
        }
    }

};

describe("Library", () => {
    it("Calculation of the price", () => {
        assert.throw(() => library.calcPriceOfBook(5, 2), "Invalid input");
        assert.throw(() => library.calcPriceOfBook(undefined, 2), "Invalid input");
        assert.throw(() => library.calcPriceOfBook([], 2), "Invalid input");
        assert.throw(() => library.calcPriceOfBook({}, 2), "Invalid input");

        assert.throw(() => library.calcPriceOfBook('Programming Fundamentals', '6a'), "Invalid input");
        assert.throw(() => library.calcPriceOfBook('Programming Fundamentals', []), "Invalid input");
        assert.throw(() => library.calcPriceOfBook('Programming Fundamentals', {}), "Invalid input");
        assert.throw(() => library.calcPriceOfBook('Programming Fundamentals', undefined), "Invalid input");
        assert.throw(() => library.calcPriceOfBook('Programming Fundamentals', ''), "Invalid input");

        assert.equal(library.calcPriceOfBook('Programming Fundamentals', 1980), `Price of Programming Fundamentals is 10.00`);
        assert.equal(library.calcPriceOfBook('Programming Fundamentals', 1979), `Price of Programming Fundamentals is 10.00`);
        assert.equal(library.calcPriceOfBook('Programming Fundamentals', 1981), `Price of Programming Fundamentals is 20.00`);
        assert.equal(library.calcPriceOfBook('Programming Fundamentals', 0), `Price of Programming Fundamentals is 10.00`);
        assert.equal(library.calcPriceOfBook('Programming Fundamentals', -1980), `Price of Programming Fundamentals is 10.00`);
        assert.equal(library.calcPriceOfBook('', -1), `Price of  is 10.00`);
    });

    it("Find book", () => {
        assert.throw(() => library.findBook([], 'Troy'), "No books currently available");
        assert.equal(library.findBook(['Troy', 'Life Style', 'Torronto'], 'Programming Fundamentals'), "The book you are looking for is not here!");
        assert.equal(library.findBook(['Troy', 'Life Style', 'Torronto'], 'Troy'), "We found the book you want.");
    });

    it("Count of books", () => {
        assert.throw(() => library.arrangeTheBooks('6a'), "Invalid input");
        assert.throw(() => library.arrangeTheBooks(-5), "Invalid input");
        assert.throw(() => library.arrangeTheBooks({}), "Invalid input");
        assert.throw(() => library.arrangeTheBooks([]), "Invalid input");
        assert.throw(() => library.arrangeTheBooks(undefined), "Invalid input");
        assert.throw(() => library.arrangeTheBooks(''), "Invalid input");

        assert.equal(library.arrangeTheBooks(40), "Great job, the books are arranged.");
        assert.equal(library.arrangeTheBooks(39), "Great job, the books are arranged.");
        assert.equal(library.arrangeTheBooks(0), "Great job, the books are arranged.");
        assert.equal(library.arrangeTheBooks(41), "Insufficient space, more shelves need to be purchased.");
    });
});