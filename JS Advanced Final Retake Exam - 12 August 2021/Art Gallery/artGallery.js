class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture":200,"photo":50,"item":250 }
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle( articleModel, articleName, quantity ) {
        let articleM = articleModel.toLowerCase();
        if (!this.possibleArticles[articleM]) {
            throw new Error("This article model is not included in this gallery!");
        }
        let article = this.listOfArticles.find(a => a.articleName == articleName && a.articleM == articleM);
        if (article) {
            article.quantity += quantity;
        } else {
            this.listOfArticles.push({articleM, articleName, quantity});
            
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest ( guestName, personality) {
        let guest = this.guests.find(g => g.guestName == guestName);
        if (guest) {
            throw new Error(`${guestName} has already been invited.`);
        }
            
        if (personality == 'Vip') {
                this.guests.push({guestName, points: 500, purchaseArticle: 0});
            } else if (personality == 'Middle') {
                this.guests.push({guestName, points: 250, purchaseArticle: 0});
            } else {
                this.guests.push({guestName, points: 50, purchaseArticle: 0});
            }
            return `You have successfully invited ${guestName}!`;
        }
   
    buyArticle ( articleModel, articleName, guestName) {
        let articleM = articleModel.toLowerCase();
        let article = this.listOfArticles.find(a => a.articleName == articleName && a.articleM == articleM);
        let guest = this.guests.find(g => g.guestName == guestName);

        if (!article) {
            throw new Error("This article is not found.");
        }

        if (article.quantity == 0) {
            return `The ${articleName} is not available.`
        }

        if (!guest) {
            return "This guest is not invited.";
        }

        if (guest.points < this.possibleArticles[articleM]) {
            return "You need to more points to purchase the article.";
        } else {
            guest.points -= this.possibleArticles[articleM];
            article.quantity--;
            guest.purchaseArticle++;
        }

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[articleM]} points.`;
    }

    showGalleryInfo (criteria) {
        let result = [];
        if (criteria == 'article') {
            result.push("Articles information:");
            this.listOfArticles.forEach(a => {
                result.push(`${a.articleM} - ${a.articleName} - ${a.quantity}`);
            });
        } else if (criteria == 'guest') {
            result.push("Guests information:");
            this.guests.forEach(g => {
                result.push(`${g.guestName} - ${g.purchaseArticle}`);
            });
        }
        return result.join('\n');
    }
}



