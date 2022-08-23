window.addEventListener('load', solve);

function solve() {
    const model = document.querySelector('#model');
    const year = document.querySelector('#year');
    const description = document.querySelector('#description');
    const price = document.querySelector('#price');

    const furnitureList = document.querySelector('#furniture-list');
    const totalPrice = document.querySelector('.total-price');

    const addBtn = document.querySelector('#add');
    addBtn.addEventListener('click', addFurniture);

    function addFurniture(e) {
        e.preventDefault();

        let inputModel = model.value;
        let inputYear = Number(year.value);
        let inputDescription = description.value;
        let inputPrice = Number(price.value);

        if (inputModel !== '' && inputDescription !== '' && inputYear > 0 && inputPrice > 0) {

            const infoTr = document.createElement('tr');
            infoTr.classList.add('info');
            const modelTd = document.createElement('td');
            modelTd.textContent = `${inputModel}`
            const priceTd = document.createElement('td');
            priceTd.textContent = `${inputPrice.toFixed(2)}`
            const buttonsTd = document.createElement('td');
            const moreBtn = document.createElement('button');
            moreBtn.classList.add('moreBtn');
            moreBtn.textContent = 'More Info';

            moreBtn.addEventListener('click', () => moreInfo(moreBtn, hideTr));

            const buyBtn = document.createElement('button');
            buyBtn.classList.add('buyBtn');
            buyBtn.textContent = 'Buy it';

            buyBtn.addEventListener('click', () => buyFurniture(priceTd, infoTr));

            const hideTr = document.createElement('tr');
            hideTr.classList.add('hide');
            const yearTd = document.createElement('td');
            yearTd.textContent = `Year: ${inputYear}`;
            const descriptionTd = document.createElement('td');
            descriptionTd.colSpan = '3';
            descriptionTd.textContent = `Description: ${inputDescription}`;

            buttonsTd.appendChild(moreBtn);
            buttonsTd.appendChild(buyBtn);

            infoTr.appendChild(modelTd);
            infoTr.appendChild(priceTd);
            infoTr.appendChild(buttonsTd);

            hideTr.appendChild(yearTd);
            hideTr.appendChild(descriptionTd);

            furnitureList.appendChild(infoTr);
            furnitureList.appendChild(hideTr);
        }

        model.value = '';
        year.value = '';
        description.value = '';
        price.value = '';
    }

    function moreInfo(moreBtn, hideTr) {
        if (moreBtn.textContent == 'More Info') {
            moreBtn.textContent = 'Less Info';
            hideTr.style.display = 'contents';
        } else {
            moreBtn.textContent = 'More Info';
            hideTr.style.display = 'none';
        }
    }

    function buyFurniture(priceTd, infoTr) {
        totalPrice.textContent = (Number(totalPrice.textContent) + Number(priceTd.textContent)).toFixed(2);
        infoTr.remove();
    }
}
