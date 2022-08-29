class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook (bookName, bookAuthor) {
        if (this.books.length >= this.capacity) {
            throw new Error("Not enough space in the collection.");
        }

        this.books.push({bookName, bookAuthor, payed: false});
        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook( bookName ) {
        let book = this.books.find(b => b.bookName == bookName);

        if (book == undefined) {
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (book.payed == true) {
            throw new Error(`${bookName} has already been paid.`);
        }

        book.payed = true;
        return `${bookName} has been successfully paid.`;
    }

    removeBook(bookName) {
        let bookIndex = this.books.findIndex(b => b.bookName == bookName);

        if (bookIndex == -1) {
            throw new Error("The book, you're looking for, is not found.");
        }
        
        let book = this.books[bookIndex];

        if(book.payed == false) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        this.books.splice(bookIndex, 1);
        return `${bookName} remove from the collection.`
    }

    getStatistics(bookAuthor) {
        let result = [];
        if (!bookAuthor) {
            result.push(`The book collection has ${this.capacity - this.books.length} empty spots left.`);
            this.books.sort((a,b) => a.bookName.localeCompare(b.bookName)).forEach(b => {
                result.push(`${b.bookName} == ${b.bookAuthor} - ${b.payed == true ? 'Has Paid' : 'Not Paid'}.`);
            });
        } else {
            
            let book = this.books.find(b => b.bookAuthor == bookAuthor);
            if (book == undefined) {
                throw new Error(`${bookAuthor} is not in the collection.`);
            }

            result.push(`${book.bookName} == ${book.bookAuthor} - ${book.payed == true ? 'Has Paid' : 'Not Paid'}.`);
         
        }
        return result.join('\n');
    }
}







