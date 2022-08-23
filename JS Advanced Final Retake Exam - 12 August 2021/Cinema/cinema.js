const {describe} = require('mocha');
const {assert} = require('chai');

const cinema = {
    showMovies: function(movieArr) {

        if (movieArr.length == 0) {
            return 'There are currently no movies to show.';
        } else {
            let result = movieArr.join(', ');
            return result;
        }

    },
    ticketPrice: function(projectionType) {

        const schedule = {
            "Premiere": 12.00,
            "Normal": 7.50,
            "Discount": 5.50
        }
        if (schedule.hasOwnProperty(projectionType)) {
            let price = schedule[projectionType];
            return price;
        } else {
            throw new Error('Invalid projection type.')
        }

    },
    swapSeatsInHall: function(firstPlace, secondPlace) {

        if (!Number.isInteger(firstPlace) || firstPlace <= 0 || firstPlace > 20 ||
            !Number.isInteger(secondPlace) || secondPlace <= 0 || secondPlace > 20 || firstPlace === secondPlace) {
            return "Unsuccessful change of seats in the hall.";
        } else {
            return "Successful change of seats in the hall.";
        }

    }
};

describe("Cinema", () => {
    it("Show movies", () => {
        assert.equal(cinema.showMovies([]), "There are currently no movies to show.");
        assert.equal(cinema.showMovies(['King Kong', 'The Tomorrow War', 'Joker']), 'King Kong, The Tomorrow War, Joker');
    });

    it("Ticket price", () => {
        assert.equal(cinema.ticketPrice('Premiere'), 12.00);
        assert.equal(cinema.ticketPrice('Normal'), 7.50);
        assert.equal(cinema.ticketPrice('Discount'), 5.50);

        assert.throw(() => cinema.ticketPrice('Other'), 'Invalid projection type.');
    });

    it("Swap seats", () => {
        assert.equal(cinema.swapSeatsInHall(3, 20), 'Successful change of seats in the hall.');

        assert.equal(cinema.swapSeatsInHall(2), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(2,), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(-1, 2), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(2, -1), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(-3, -1), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(1, 1), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(0, 1), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(1, 0), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(21, 2), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(2, 21), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall('', 21), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall(21, ''), 'Unsuccessful change of seats in the hall.');
        assert.equal(cinema.swapSeatsInHall('', ''), 'Unsuccessful change of seats in the hall.');
        
    });
});