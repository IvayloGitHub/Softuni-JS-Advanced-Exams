class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }


    get budget() {
       return this._budget;
    }

    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        return this._budget = value;
    }

    shopping([type, price]) {
        price = Number(price);
        if (this.budget < price) {
            throw new Error("Not enough money to buy this product");
        }

        this.budget -= price;
        this.products.push(type);
        return `You have successfully bought ${type}!`;
    }

    recipes({recipeName, productsList}) {
        if (productsList.some(p => this.products.includes(p) === false)) {
            throw new Error("We do not have this product");
        }

        this.dishes.push({ recipeName, productsList });
        return `${recipeName} has been successfully cooked!`
    }

    inviteGuests(name, dish) {
        if (this.dishes.some(d => d.recipeName === dish) === false) {
            throw new Error("We do not have this dish");
        }

        if (this.guests.hasOwnProperty(name)) {
            throw new Error("This guest has already been invited");
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let result = [];
        Object.entries(this.guests).forEach(([guestName, dish]) => {
            result.push(`${guestName} will eat ${dish}, which consists of ${this.dishes.find(r => r.recipeName == dish).productsList.join(', ')}`);
        });
        return result.join('\n');
    }
}

