window.addEventListener('load', solve);

function solve() {
    
    const genre = document.querySelector('#genre');
    const name = document.querySelector('#name');
    const author = document.querySelector('#author');
    const date = document.querySelector('#date');
    const allHits = document.querySelector('.all-hits-container');
    const saved = document.querySelector('.saved-container');
    const totalLikes = document.querySelector('.likes p');

    let likes = 0;

    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', addSong);

    function addSong(e) {
        e.preventDefault();

       let inputGenre = genre.value;
       let inputName = name.value;
       let inputAuthor = author.value;
       let inputDate = date.value;
        
        if (inputGenre != '' && inputName != '' && inputAuthor != '' && inputDate != '') {
            const infoHits = document.createElement('div');
            infoHits.classList.add('hits-info');
            const image = document.createElement('img');
            image.src ='./static/img/img.png';
            const h2Genre = document.createElement('h2');
            h2Genre.textContent = `Genre: ${inputGenre}`;
            const h2Name = document.createElement('h2');
            h2Name.textContent = `Name: ${inputName}`;
            const h2Author = document.createElement('h2');
            h2Author.textContent = `Author: ${inputAuthor}`;
            const h3Date = document.createElement('h3');
            h3Date.textContent = `Date: ${inputDate}`;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save song';
            saveBtn.classList.add('save-btn');

            saveBtn.addEventListener('click', () => saveSong(infoHits, likeBtn, saveBtn));

            const likeBtn = document.createElement('button');
            likeBtn.textContent = 'Like song';
            likeBtn.classList.add('like-btn');

            likeBtn.addEventListener('click', () => likeSong(likeBtn));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');

            deleteBtn.addEventListener('click', () => deleteSong(infoHits));

            infoHits.appendChild(image);
            infoHits.appendChild(h2Genre);
            infoHits.appendChild(h2Name);
            infoHits.appendChild(h2Author);
            infoHits.appendChild(h3Date);
            infoHits.appendChild(saveBtn);
            infoHits.appendChild(likeBtn);
            infoHits.appendChild(deleteBtn);

            allHits.appendChild(infoHits);

        }

        genre.value = '';
        name.value = '';
        author.value = '';
        date.value = '';
    }

    function saveSong(infoHits, likeBtn, saveBtn) {
        likeBtn.remove();
        saveBtn.remove();
        saved.appendChild(infoHits);
    }

    function likeSong(likeBtn) {
        totalLikes.textContent = `Total Likes: ${++likes}`;
        likeBtn.disabled = true;
    }

    function deleteSong(infoHits) {
        infoHits.remove();
    }
}