class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {'child': 150, 'student': 300, 'collegian': 500};
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!this.priceForTheCamp[condition]) {
            throw new Error('Unsuccessful registration at the camp.');
        } else if (this.listOfParticipants.some(p => p.name === name)) {
            return `The ${name} is already registered at the camp.`;
        } else if (money < this.priceForTheCamp[condition]) {
            return `The money is not enough to pay the stay at the camp.`;
        } else {
            this.listOfParticipants.push({name, condition, power: 100, wins: 0});
            return `The ${name} was successfully registered.`;
        }
    }

    unregisterParticipant (name) {
        let participantIndex = this.listOfParticipants.findIndex(p => p.name === name);
        if (participantIndex === -1) {
            throw new Error(`The ${name} is not registered in the camp.`);
        } 
        this.listOfParticipants.splice(participantIndex, 1);
        return `The ${name} removed successfully.`;
    }

    timeToPlay (typeOfGame, participant1, participant2) {
        let firstParticipant = this.listOfParticipants.find(p => p.name === participant1);
        let secondParticipant = this.listOfParticipants.find(p => p.name === participant2);
        if (typeOfGame == 'WaterBalloonFights') {
            if (!firstParticipant || !secondParticipant) {
                throw new Error(`Invalid entered name/s.`);
            } else if (firstParticipant.condition !== secondParticipant.condition) {
                throw new Error(`Choose players with equal condition.`);
            } else if (firstParticipant.power > secondParticipant.power) {
                firstParticipant.wins += 1;
                return `The ${firstParticipant.name} is winner in the game ${typeOfGame}.`;
            } else if (firstParticipant.power < secondParticipant.power) {
                secondParticipant.wins += 1;
                return `The ${secondParticipant.name} is winner in the game ${typeOfGame}.`;
            } else if (firstParticipant.power === secondParticipant.power) {
               return `There is no winner.`;
            }
        } else if (typeOfGame == 'Battleship') {
            if (!firstParticipant) {
                throw new Error(`Invalid entered name/s.`);
            }
            firstParticipant.power += 20;
            return `The ${firstParticipant.name} successfully completed the game ${typeOfGame}.`;
        }
    }

    toString () {
        let result = [];
        result.push(`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`);
        this.listOfParticipants.sort((a, b) => b.wins - a.wins).forEach(p => {
            result.push(`${p.name} - ${p.condition} - ${p.power} - ${p.wins}`);
        });
        return result.join('\n');

    }
}




