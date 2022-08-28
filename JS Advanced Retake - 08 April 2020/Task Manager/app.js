function solve() {
    const task = document.querySelector('#task');
    const description = document.querySelector('#description');
    const date = document.querySelector('#date');

    const section = document.querySelectorAll('section');
    const open = section[1].querySelectorAll('div')[1];
    const progress = section[2].querySelectorAll('div')[1];
    const complete = section[3].querySelectorAll('div')[1];

    const addBtn = document.querySelector('#add');
    
    addBtn.addEventListener('click', addTask);

    function addTask(e) {
        e.preventDefault();

        let inputTask = task.value;
        let inputDescription = description.value;
        let inputDate = date.value;

        task.value = '';
        description.value = '';
        date.value = '';

        if (inputTask !== '' && inputDescription !== '' && inputDate !== '') {

            const article = document.createElement('article');
            const taskH3 = document.createElement('h3');
            taskH3.textContent = inputTask;
            const descriptionP = document.createElement('p');
            descriptionP.textContent = `Description: ${inputDescription}`;
            const dateP = document.createElement('p');
            dateP.textContent = `Due Date: ${inputDate}`;
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('flex');

            const startBtn = document.createElement('button');
            startBtn.classList.add('green');
            startBtn.textContent = 'Start';

            startBtn.addEventListener('click', () => moveToProgress(article, startBtn, buttonsDiv));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('red');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', () => deleteTask(article));

            buttonsDiv.appendChild(startBtn);
            buttonsDiv.appendChild(deleteBtn);

            article.appendChild(taskH3);
            article.appendChild(descriptionP);
            article.appendChild(dateP);
            article.appendChild(buttonsDiv);

            open.appendChild(article);
        } 
    }

    function moveToProgress(article, startBtn, buttonsDiv) {
        startBtn.remove();
        const finishBtn = document.createElement('button');
        finishBtn.classList.add('orange');
        finishBtn.textContent = 'Finish';

        finishBtn.addEventListener('click', () => moveToComplete(article, buttonsDiv));

        buttonsDiv.appendChild(finishBtn);
        progress.appendChild(article);
    }

    function deleteTask(article) {
        article.remove();
    }

    function moveToComplete(article, buttonsDiv) {
        buttonsDiv.remove();

        complete.appendChild(article);
    }
}