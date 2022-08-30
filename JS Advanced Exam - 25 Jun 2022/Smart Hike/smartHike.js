class SmartHike {
    constructor(username) {
        this.username = username;
        this.goals = {};
        this.listOfHikes = [];
        this.resources = 100;
    }


    addGoal (peak, altitude) {
        if (this.goals[peak]) {
            return `${peak} has already been added to your goals`;
        } else {
            this.goals[peak] = Number(altitude);
            return `You have successfully added a new goal - ${peak}`;
        }
    }

    hike (peak, time, difficultyLevel) {
        if (!this.goals[peak]) {
            throw new Error(`${peak} is not in your current goals`);
        }

        if (this.resources == 0) {
            throw new Error("You don't have enough resources to start the hike");
        }

        let difference = this.resources - (time * 10);
        if (difference < 0) {
            return "You don't have enough resources to complete the hike";
        } else {
            this.resources = difference;
            this.listOfHikes.push({peak, time, difficultyLevel});
            return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
        }
    }

    rest (time) {
        this.resources += time * 10;

        if (this.resources >= 100) {
            this.resources = 100;
            return `Your resources are fully recharged. Time for hiking!`;
        } else {
            return `You have rested for ${time} hours and gained ${time*10}% resources`;
        }
    }

    showRecord (criteria) {
        if (this.listOfHikes.length == 0) {
           return `${this.username} has not done any hiking yet`;
        }

        if (criteria == 'hard' || criteria == 'easy') {
            let filteredHikes = this.listOfHikes.filter(h => h.difficultyLevel == criteria);
            filteredHikes.sort((a,b) => a.time - b.time);
            let bestHike = filteredHikes[0];

            if (!bestHike) {
                return `${this.username} has not done any ${criteria} hiking yet`;
            } else {
                return `${this.username}'s best ${criteria} hike is ${bestHike.peak} peak, for ${bestHike.time} hours`;
            }
        } else if (criteria == 'all') {
            let result = [
                "All hiking records:"
            ];
            this.listOfHikes.forEach(h => {
                result.push(`${this.username} hiked ${h.peak} for ${h.time} hours`);
            });
            return result.join('\n');
        }
    }
}






