const {describe} = require('mocha');
const {assert} = require('chai');

const bookSelection = {
  isGenreSuitable(genre, age) {
    if (age <= 12 && (genre === "Thriller" || genre === "Horror")) {
      return `Books with ${genre} genre are not suitable for kids at ${age} age`;
    } else {
      return `Those books are suitable`;
    }
  },
  isItAffordable(price, budget) {
    if (typeof price !== "number" || typeof budget !== "number") {
      throw new Error("Invalid input");
    }

    let result = budget - price;

    if (result < 0) {
      return "You don't have enough money";
    } else {
      return `Book bought. You have ${result}$ left`;
    }
  },
  suitableTitles(array, wantedGenre) {
    let resultArr = [];

    if (!Array.isArray(array) || typeof wantedGenre !== "string") {
      throw new Error("Invalid input");
    }
    array.map((obj) => {
      if (obj.genre === wantedGenre) {
        resultArr.push(obj.title);
      }
    });
    return resultArr;
  },
};

describe("Book selection", () => {
    it("Is genre suitable", () => {
        assert.equal(bookSelection.isGenreSuitable("Thriller", 12), "Books with Thriller genre are not suitable for kids at 12 age");
        assert.equal(bookSelection.isGenreSuitable("Thriller", 11), "Books with Thriller genre are not suitable for kids at 11 age");
        assert.equal(bookSelection.isGenreSuitable("Horror", 11), "Books with Horror genre are not suitable for kids at 11 age");

        assert.equal(bookSelection.isGenreSuitable("Thriller", 13), "Those books are suitable");
        assert.equal(bookSelection.isGenreSuitable("Horror", 13), "Those books are suitable");
    });

    it("Is it affordable", () => {
        assert.equal(bookSelection.isItAffordable(10, 20), "Book bought. You have 10$ left");
        assert.equal(bookSelection.isItAffordable(10, 5), "You don't have enough money");

        assert.throw(() => bookSelection.isItAffordable('', 20), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable({}, 20), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable([], 20), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable(undefined, 20), "Invalid input");

        assert.throw(() => bookSelection.isItAffordable(10, ), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable(10, ''), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable(10, {}), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable(10, []), "Invalid input");
        assert.throw(() => bookSelection.isItAffordable(10, undefined), "Invalid input");
    });

    it("Suitable titles", () => {
        assert.deepEqual(bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}, {title: "Fire", genre: "Thriller"}], "Thriller"), ["The Da Vinci Code", "Fire"]);
        assert.deepEqual(bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}, {title: "Fire", genre: "Comedy"}], "Comedy"), ["Fire"]);
        assert.deepEqual(bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}, {title: "Fire", genre: "Comedy"}], "Horror"), []);

        assert.throw(() => bookSelection.suitableTitles({}, "Comedy"), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles('', "Comedy"), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles(undefined, "Comedy"), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles(2, "Comedy"), "Invalid input");

        assert.throw(() => bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}], 2), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}], {}), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}], undefined), "Invalid input");
        assert.throw(() => bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"}], []), "Invalid input");
    });
});
