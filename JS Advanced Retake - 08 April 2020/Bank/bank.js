class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer ({firstName, lastName, personalId}) {
        if (this.allCustomers.some(c => c.personalId == personalId) == true) {
            throw new Error(`${firstName} ${lastName} is already our customer!`);
        } 
        this.allCustomers.push({firstName, lastName, personalId});
        return {firstName, lastName, personalId};
    }

    depositMoney (personalId, amount) {
        let person = this.allCustomers.find(c => c.personalId == personalId);

        if(person == undefined) {
            throw new Error(`We have no customer with this ID!`);
        }

        if (isNaN(person.totalMoney)) {
            person.totalMoney = amount;
        } else {
            person.totalMoney += amount;
        }

        if (!Array.isArray(person.transactions)) {
            person.transactions = [];
        } 

        let message = `${person.transactions.length + 1}. ${person.firstName} ${person.lastName} made deposit of ${amount}$!`;
        person.transactions.push(message);
        return `${person.totalMoney}$`;
    }

    withdrawMoney (personalId, amount) {
        let person = this.allCustomers.find(c => c.personalId == personalId);

        if(person == undefined) {
            throw new Error(`We have no customer with this ID!`);
        }

        if (isNaN(person.totalMoney)) {
            person.totalMoney = 0;
        }

        if (!Array.isArray(person.transactions)) {
            person.transactions = [];
        }

        if (person.totalMoney < amount) {
            throw new Error(`${person.firstName} ${person.lastName} does not have enough money to withdraw that amount!`);
        }

        person.totalMoney -= amount;

        let message = `${person.transactions.length + 1}. ${person.firstName} ${person.lastName} withdrew ${amount}$!`;
        person.transactions.push(message);
        return `${person.totalMoney}$`;
    }

    customerInfo (personalId) {
        let person = this.allCustomers.find(c => c.personalId == personalId);

        if(person == undefined) {
            throw new Error(`We have no customer with this ID!`);
        }

        let result = [`Bank name: ${this._bankName}`,
                      `Customer name: ${person.firstName} ${person.lastName}`,
                      `Customer ID: ${person.personalId}`,
                      `Total Money: ${person.totalMoney}$`,
                      'Transactions:'];

        person.transactions.sort((a,b) => b.localeCompare(a)).forEach(t => {
            result.push(t);
        });
        return result.join('\n');
    }
}

