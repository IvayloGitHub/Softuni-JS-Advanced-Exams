class Garden {
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant (plantName, spaceRequired) {
        if (spaceRequired > this.spaceAvailable) {
            throw new Error("Not enough space in the garden.");
        }

        this.plants.push({plantName, spaceRequired, ripe: false, quantity: 0});
        this.spaceAvailable -= spaceRequired;
        return `The ${plantName} has been successfully planted in the garden.`
    }

    ripenPlant (plantName, quantity) {
        let plant = this.plants.find(p => p.plantName == plantName);

        if (plant == undefined) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }

        if (plant.ripe == true) {
            throw new Error(`The ${plantName} is already ripe.`);
        }

        if (quantity <= 0) {
            throw new Error(`The quantity cannot be zero or negative.`);
        }

        plant.ripe = true;
        plant.quantity += quantity;

        if (quantity == 1) {
            return `${quantity} ${plantName} has successfully ripened.`;
        } else {
            return `${quantity} ${plantName}s have successfully ripened.`;
        }
    }

    harvestPlant(plantName) {
        let plantIndex = this.plants.findIndex(p => p.plantName == plantName);

        if (plantIndex == -1) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }

        let plant = this.plants[plantIndex];

        if (plant.ripe == false) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
        }

        this.plants.splice(plantIndex, 1);
        this.storage.push({plantName: plant.plantName, quantity: plant.quantity});
        this.spaceAvailable += plant.spaceRequired;

        return `The ${plantName} has been successfully harvested.`;
    }

    generateReport() {
        const sortedPlants = this.plants.sort((a,b) => a.plantName.localeCompare(b.plantName)).map(p => `${p.plantName}`).join(', ');

        let message;

        if (this.storage.length == 0) {

            message = 'Plants in storage: The storage is empty.';

        } else {

            message = this.storage.map(p => `${p.plantName} (${p.quantity})`).join(', ');
        }

        let result = [
            `The garden has ${this.spaceAvailable} free space left.`,
            `Plants in the garden: ${sortedPlants}`,
            `Plants in storage: ${message}`
        ];

        return result.join('\n');
    }
}






