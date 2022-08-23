window.addEventListener('load', solve);

function solve() {
    const productType = document.querySelector('#type-product');
    const description = document.querySelector('#description');
    const clientName = document.querySelector('#client-name');
    const clientPhone = document.querySelector('#client-phone');

    const receivedOrders = document.querySelector('#received-orders');
    const completedOrders = document.querySelector('#completed-orders');

    const sendBtn = document.querySelector('form button');
    sendBtn.addEventListener('click', sendInfo);

    function sendInfo(e) {
        e.preventDefault();

        let inputDescription = description.value;
        let inputClientName = clientName.value;
        let inputClientPhone = clientPhone.value;

        if (inputDescription !== '' && inputClientName !== '' && inputClientPhone !== '') {
            const receivedOrdersDiv = document.createElement('div');
            receivedOrdersDiv.classList.add('container');
            const productTypeH2 = document.createElement('h2');
            productTypeH2.textContent = `Product type for repair: ${productType.value}`
            const clientInformationH3 = document.createElement('h3');
            clientInformationH3.textContent = `Client information: ${inputClientName}, ${inputClientPhone}`;
            const descriptionH4 = document.createElement('h4');
            descriptionH4.textContent = `Description of the problem: ${inputDescription}`;

            const startBtn = document.createElement('button');
            startBtn.classList.add('start-btn');
            startBtn.textContent = 'Start repair';

            startBtn.addEventListener('click', () => startRepair(startBtn, finishBtn));

            const finishBtn = document.createElement('button');
            finishBtn.classList.add('finish-btn');
            finishBtn.textContent = 'Finish repair';
            finishBtn.disabled = true;
            finishBtn.addEventListener('click',() => finishRepair(receivedOrdersDiv, startBtn, finishBtn));

            receivedOrdersDiv.appendChild(productTypeH2);
            receivedOrdersDiv.appendChild(clientInformationH3);
            receivedOrdersDiv.appendChild(descriptionH4);
            receivedOrdersDiv.appendChild(startBtn);
            receivedOrdersDiv.appendChild(finishBtn);

            receivedOrders.appendChild(receivedOrdersDiv);

            const clearBtn = document.querySelector('.clear-btn');
            clearBtn.addEventListener('click', clearOrders);
            
        
        }
        description.value = '';
        clientName.value = '';
        clientPhone.value = '';
    }

    function startRepair(startBtn, finishBtn) {
        startBtn.disabled = true;
        finishBtn.disabled = false;
    }

    function finishRepair(receivedOrdersDiv, startBtn, finishBtn) {
        
        startBtn.remove();
        finishBtn.remove();
        completedOrders.appendChild(receivedOrdersDiv);
    }

    function clearOrders() {
        Array.from(document.querySelectorAll('#completed-orders .container')).forEach(e => e.remove());
    }
}