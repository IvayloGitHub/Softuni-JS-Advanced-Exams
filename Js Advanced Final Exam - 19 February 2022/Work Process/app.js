function solve() {
    const firstName = document.querySelector('#fname');
    const lastName = document.querySelector('#lname');
    const email = document.querySelector('#email');
    const birth = document.querySelector('#birth');
    const position = document.querySelector('#position');
    const salary = document.querySelector('#salary');

    const tBody = document.querySelector('#tbody');
    const budget = document.querySelector('#sum');

    const hireWorkerBtn = document.querySelector('#add-worker');
    hireWorkerBtn.addEventListener('click', hireWorker);

    function hireWorker(e) {

        e.preventDefault();

        let inputFirstName = firstName.value;
        let inputLastName = lastName.value;
        let inputEmail = email.value;
        let inputBirth = birth.value;
        let inputPosition = position.value;
        let inputSalary = salary.value;

        if (inputFirstName !== '' && inputLastName !== '' && inputEmail !== ''
         && inputBirth !== '' && inputPosition !== '' && inputSalary !== '') {

            const tableRow = document.createElement('tr');
            const firstNameTd = document.createElement('td');
            firstNameTd.textContent = inputFirstName;
            const lastNameTd = document.createElement('td');
            lastNameTd.textContent = inputLastName;
            const emailTd = document.createElement('td');
            emailTd.textContent = inputEmail;
            const birthTd = document.createElement('td');
            birthTd.textContent = inputBirth;
            const positionTd = document.createElement('td');
            positionTd.textContent = inputPosition;
            const salaryTd = document.createElement('td');
            salaryTd.textContent = inputSalary;

            const buttonsTd = document.createElement('td');

            const firedBtn = document.createElement('button');
            firedBtn.classList.add('fired');
            firedBtn.textContent = 'Fired';

            firedBtn.addEventListener('click', () => firedWorker(tableRow, inputSalary))

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit');
            editBtn.textContent = 'Edit';

            editBtn.addEventListener('click', () => editInfo(tableRow, inputFirstName, 
                inputLastName, inputEmail, inputBirth, inputPosition, inputSalary));

            buttonsTd.appendChild(firedBtn);
            buttonsTd.appendChild(editBtn);

            tableRow.appendChild(firstNameTd);
            tableRow.appendChild(lastNameTd);
            tableRow.appendChild(emailTd);
            tableRow.appendChild(birthTd);
            tableRow.appendChild(positionTd);
            tableRow.appendChild(salaryTd);
            tableRow.appendChild(buttonsTd);

            tBody.appendChild(tableRow);
            let currentSalary = Number(budget.textContent);
            budget.textContent = (Number(inputSalary) + currentSalary).toFixed(2);
            
        }

        firstName.value = '';
        lastName.value = '';
        email.value = '';
        birth.value = '';
        position.value = '';
        salary.value = '';
    }

    function editInfo(tableRow, inputFirstName, 
        inputLastName, inputEmail, inputBirth, inputPosition, inputSalary) {
            tableRow.remove();

            firstName.value = inputFirstName;
            lastName.value = inputLastName;
            email.value = inputEmail;
            birth.value = inputBirth;
            position.value = inputPosition;
            salary.value = inputSalary;

            let currentBudget = Number(budget.textContent);
            budget.textContent = (currentBudget - Number(inputSalary)).toFixed(2);
    }

    function firedWorker(tableRow, inputSalary) {
        tableRow.remove();
        let currentBudget = Number(budget.textContent);
        budget.textContent = (currentBudget - Number(inputSalary)).toFixed(2);
    }
}
solve()