class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = Number(budgetMoney);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        products.forEach(p => {
            let[productName, productQuantity, productTotalPrice] = p.split(' ');

            productQuantity = Number(productQuantity);
            productTotalPrice = Number(productTotalPrice);

            if (productTotalPrice <= this.budgetMoney) {
                if (this.stockProducts.hasOwnProperty(productName)) {
                    this.stockProducts[productName] += productQuantity;
                } else {
                    this.stockProducts[productName] = productQuantity;
                }

                this.budgetMoney -= productTotalPrice;
                this.history.push(`Successfully loaded ${productQuantity} ${productName}`);
            } else {
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        });
        return this.history.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu[meal]) {
        
            this.menu[meal] = {
                products: {},
                price: price
            }

            neededProducts.forEach(p => {
            let[productName, productQuantity] = p.split(' ');
            productQuantity = Number(productQuantity);
            this.menu[meal].products[productName] = productQuantity;
            });

            if (Object.keys(this.menu).length == 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`;
            } else {
                return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
            }
        } else {
            return`The ${meal} is already in the our menu, try something different.`;
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length > 0) {
            let result = [];
            for (let meal in this.menu) {
                result.push(`${meal} - $ ${this.menu[meal].price}`);
            }
            return result.join('\n');
        } else {
            return "Our menu is not ready yet, please come later...";
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        } else {
            const neededProducts = {};
            for (let product in this.menu[meal].products) {
                if (!this.stockProducts[product] || this.stockProducts[product] < this.menu[meal].products[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                } else {
                    neededProducts[product] = this.menu[meal].products[product];
                }
            }

            for (let neededProduct in neededProducts) {
                this.stockProducts[neededProduct] -= neededProducts[neededProduct];
            }

            this.budgetMoney += this.menu[meal].price;
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
        }
    }
}





