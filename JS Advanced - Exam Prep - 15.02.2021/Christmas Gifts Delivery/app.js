function solution() {
    const name = document.querySelector('input');
    const[gifts, sent, discarded] = document.querySelectorAll('section ul');
    const addBtn = document.querySelector('div button');

    addBtn.addEventListener('click', addGift);

    function addGift() {
        let inputName = name.value;
        name.value = '';

        const giftLi = document.createElement('li');
        giftLi.classList.add('gift');
        giftLi.textContent = inputName;

        const sendBtn = document.createElement('button');
        sendBtn.classList.add('sendButton');
        sendBtn.textContent = 'Send';

        sendBtn.addEventListener('click', () => sendGift(inputName, giftLi));

        const discardBtn = document.createElement('button');
        discardBtn.classList.add('discardButton');
        discardBtn.textContent = 'Discard';

        discardBtn.addEventListener('click', () => discardGift(inputName, giftLi));

        giftLi.appendChild(sendBtn);
        giftLi.appendChild(discardBtn);

        gifts.appendChild(giftLi);

        sortGifts();

    }

    function sortGifts() {
        Array.from(gifts.children).sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(g => gifts.appendChild(g));
    }

    function sendGift(inputName, giftLi) {
        giftLi.remove();
        const elementLi = document.createElement('li');
        elementLi.classList.add('gift');
        elementLi.textContent = inputName;
        sent.appendChild(elementLi);
    }

    function discardGift(inputName, giftLi) {
        giftLi.remove();
        const elementLi = document.createElement('li');
        elementLi.classList.add('gift');
        elementLi.textContent = inputName;
        discarded.appendChild(elementLi);
    }
}