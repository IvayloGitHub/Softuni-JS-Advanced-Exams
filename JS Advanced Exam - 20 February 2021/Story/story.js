class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes() {
        if (this._likes.length == 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length == 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`
        }
    }

    like (username) {
        if (this._likes.includes(username)) {
            throw new Error("You can't like the same story twice!");
        }

        if(username === this.creator) {
            throw new Error("You can't like your own story!");
        }
        this._likes.push(username);

        return `${username} liked ${this.title}!`;
    }

    dislike (username) {
        if (!this._likes.includes(username)) {
            throw new Error("You can't dislike this story!");
        }

        let usernameIndex = this._likes.findIndex(u => u.username == username);
        this._likes.splice(usernameIndex, 1);
        return `${username} disliked ${this.title}`;
    }

    comment (username, content, id) {
        let curComment = this._comments.find(c => c.id == id);
        if (!curComment) {
            this._comments.push({id: this._comments.length + 1, username, content, replies: []});
            return `${username} commented on ${this.title}`;
        } else {
            curComment.replies.push({id: `${id}.${curComment.replies.length + 1}`, username, content});
            return `You replied successfully`;
        }
    }

    toString(sortingType) {

        let sorting = {
            'asc': (a,b) => a.id - b.id, 
            'desc': (a,b) => b.id - a.id, 
            'username': (a,b) => a.username.localeCompare(b.username)
        };

        let result = [
            `Title: ${this.title}`,
            `Creator: ${this.creator}`,
            `Likes: ${this._likes.length}`,
            'Comments:'
        ];

        this._comments.sort(sorting[sortingType]).forEach(c => {
            result.push(`-- ${c.id}. ${c.username}: ${c.content}`);
            c.replies.sort(sorting[sortingType]).forEach(r => {
                result.push(`--- ${r.id}. ${r.username}: ${r.content}`);
            });
        });
        return result.join('\n');
    }
}

