function solve() {
    const recipient = document.querySelector('#recipientName');
    const title = document.querySelector('#title');
    const message = document.querySelector('#message');
    const list = document.querySelector('#list');
    const sent = document.querySelector('.sent-list');
    const deleted = document.querySelector('.delete-list');

    const addBtn = document.querySelector('#add');

    addBtn.addEventListener('click', addToList);

    const resetBtn = document.querySelector('#reset');

    resetBtn.addEventListener('click', resetFields);

    function addToList(e) {
        e.preventDefault();

        let inputRecipient = recipient.value;
        let inputTitle = title.value;
        let inputMessage = message.value;

        if (inputRecipient !== '' && inputTitle !== '' && inputMessage !== '') {

            const mail = document.createElement('li');
            const titleH4 = document.createElement('h4');
            titleH4.textContent = `Title: ${inputTitle}`;
            const recepientH4 = document.createElement('h4');
            recepientH4.textContent = `Recipient Name: ${inputRecipient}`;
            messageSpan = document.createElement('span');
            messageSpan.textContent = inputMessage;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('list-action');

            const sendBtn = document.createElement('button');
            sendBtn.type = 'submit';
            sendBtn.id = 'send';
            sendBtn.textContent = 'Send';

            sendBtn.addEventListener('click', () => sendMail(mail, inputTitle, inputRecipient));

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'submit';
            deleteBtn.id = 'delete';
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', () => deleteMail(mail, inputTitle, inputRecipient))

            buttonsDiv.appendChild(sendBtn);
            buttonsDiv.appendChild(deleteBtn);

            mail.appendChild(titleH4);
            mail.appendChild(recepientH4);
            mail.appendChild(messageSpan);
            mail.appendChild(buttonsDiv);
            
            list.appendChild(mail);
        }

        recipient.value = '';
        title.value = '';
        message.value = '';
    }

    function resetFields(e) {
        e.preventDefault();

        recipient.value = '';
        title.value = '';
        message.value = '';
    }

    function sendMail(mail, inputTitle, inputRecipient) {
        mail.remove();

        const mailLi = createMailLi(inputTitle, inputRecipient);
        const divForButton = document.createElement('div');

        divForButton.classList.add('btn');
        const delBtn = document.createElement('button');

        delBtn.type = 'submit';
        delBtn.classList.add('delete');
        delBtn.textContent = 'Delete';
        
        delBtn.addEventListener('click', () => deleteMail(sent, inputTitle, inputRecipient));

        divForButton.appendChild(delBtn);

        mailLi.appendChild(divForButton);

        sent.appendChild(mailLi);
    }

    function deleteMail(section, inputTitle, inputRecipient) {
        section.remove();
        
        const mail = createMailLi(inputTitle, inputRecipient);
        deleted.appendChild(mail);
    }

    function createMailLi(inputTitle, inputRecipient) {
        const mail = document.createElement('li');
        const recepientSpan = document.createElement('span');
        recepientSpan.textContent = `To: ${inputRecipient}`;
        const titleSpan = document.createElement('span');
        titleSpan.textContent = `Title: ${inputTitle}`;

        mail.appendChild(recepientSpan);
        mail.appendChild(titleSpan);
        return mail;
    }

}
solve()