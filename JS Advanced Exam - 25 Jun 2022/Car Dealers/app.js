window.addEventListener("load", solve);

function solve() {
  const make = document.querySelector('#make');
  const model = document.querySelector('#model');
  const year = document.querySelector('#year');
  const fuel = document.querySelector('#fuel');
  const originalCost = document.querySelector('#original-cost');
  const sellingPrice = document.querySelector('#selling-price');
  const tableBody = document.querySelector('#table-body');
  const soldCars = document.querySelector('#cars-list');
  const totalProfit = document.querySelector('#profit');

  const publishBtn = document.querySelector('#publish');
  publishBtn.addEventListener('click', sendInfo);

  function sendInfo(e) {
    e.preventDefault();

    let inputMake = make.value;
    let inputModel = model.value;
    let inputYear = year.value;
    let inputFuel = fuel.value;
    let inputOriginalCost = originalCost.value;
    let inputSellingPrice = sellingPrice.value;

    if(inputMake !== '' && inputModel !== '' && inputYear !== '' 
    && inputFuel !== '' && inputOriginalCost !== '' && inputSellingPrice !== '' 
    && (Number(inputSellingPrice) > Number(inputOriginalCost))) {

      const row = document.createElement('tr');
      row.classList.add('row');
      const makeTd = document.createElement('td');
      makeTd.textContent = inputMake;
      const modelTd = document.createElement('td');
      modelTd.textContent = inputModel;
      const yearTd = document.createElement('td');
      yearTd.textContent = inputYear;
      const fuelTd = document.createElement('td');
      fuelTd.textContent = inputFuel;
      const originalCostTd = document.createElement('td');
      originalCostTd.textContent = inputOriginalCost;
      const sellingPriceTd = document.createElement('td');
      sellingPriceTd.textContent = inputSellingPrice;

      const buttonsTd = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.classList.add('action-btn', 'edit');
      editBtn.textContent = 'Edit';

      editBtn.addEventListener('click', () => editInfo(row, inputMake, inputModel, 
        inputYear, inputFuel, inputOriginalCost, inputSellingPrice));

      const sellBtn = document.createElement('button');
      sellBtn.classList.add('action-btn', 'sell');
      sellBtn.textContent = 'Sell';

      sellBtn.addEventListener('click', () => sellCar(row, inputMake, inputModel, 
        inputYear, inputOriginalCost, inputSellingPrice));

      buttonsTd.appendChild(editBtn);
      buttonsTd.appendChild(sellBtn);

      row.appendChild(makeTd);
      row.appendChild(modelTd);
      row.appendChild(yearTd);
      row.appendChild(fuelTd);
      row.appendChild(originalCostTd);
      row.appendChild(sellingPriceTd);
      row.appendChild(buttonsTd);

      tableBody.appendChild(row);
    }

    make.value = '';
    model.value = '';
    year.value = '';
    fuel.value = '';
    originalCost.value = '';
    sellingPrice.value = '';
  }

function editInfo(row, inputMake, inputModel, 
  inputYear, inputFuel, inputOriginalCost, inputSellingPrice) {

    row.remove();
    make.value = inputMake;
    model.value = inputModel;
    year.value = inputYear;
    fuel.value = inputFuel;
    originalCost.value = inputOriginalCost;
    sellingPrice.value = inputSellingPrice;
}

function sellCar(row, inputMake, inputModel, 
  inputYear, inputOriginalCost, inputSellingPrice) {
    row.remove();

    const car = document.createElement('li');
    car.classList.add('each-list');
    const makeModelSpan = document.createElement('span');
    makeModelSpan.textContent = `${inputMake} ${inputModel}`;
    const yearSpan = document.createElement('span');
    yearSpan.textContent = inputYear;
    const profitSpan = document.createElement('span');
    profitSpan.textContent = `${Number(inputSellingPrice) - Number(inputOriginalCost)}`;

    car.appendChild(makeModelSpan);
    car.appendChild(yearSpan);
    car.appendChild(profitSpan);

    soldCars.appendChild(car);
    
    totalProfit.textContent = `${(Number(totalProfit.textContent) + Number(profitSpan.textContent)).toFixed(2)}`;
  }

}

