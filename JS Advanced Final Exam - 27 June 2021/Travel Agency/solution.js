window.addEventListener('load', solution);

function solution() {
   const fullName = document.querySelector('#fname');
   const email = document.querySelector('#email');
   const phoneNumber = document.querySelector('#phone');
   const address = document.querySelector('#address');
   const postalCode = document.querySelector('#code');
   const infoPreview = document.querySelector('#infoPreview');
   const blockDiv = document.querySelector('#block');

   const submitBtn = document.querySelector('#submitBTN');

   submitBtn.addEventListener('click', sendInfo);

   const editBtn = document.querySelector('#editBTN');
   const continueBtn = document.querySelector('#continueBTN');

   function sendInfo() {

     let inputFullName = fullName.value;
     let inputEmail = email.value;
     let inputPhoneNumber = phoneNumber.value;
     let inputAddress = address.value;
     let inputPostalCode = postalCode.value;
     
     if (inputFullName !== '' && inputEmail !== '') {

        const fullNameLi = document.createElement('li');
        fullNameLi.textContent = `Full Name: ${inputFullName}`;
        const emailLi = document.createElement('li');
        emailLi.textContent = `Email: ${inputEmail}`;
        const phoneNumberLi = document.createElement('li');
        phoneNumberLi.textContent = `Phone Number: ${inputPhoneNumber}`
        const addressLi = document.createElement('li');
        addressLi.textContent = `Address: ${inputAddress}`;
        const postalCodeLi = document.createElement('li');
        postalCodeLi.textContent = `Postal Code: ${inputPostalCode}`;

        infoPreview.appendChild(fullNameLi);
        infoPreview.appendChild(emailLi);
        infoPreview.appendChild(phoneNumberLi);
        infoPreview.appendChild(addressLi);
        infoPreview.appendChild(postalCodeLi);

        submitBtn.disabled = true;
        editBtn.disabled = false;
        continueBtn.disabled = false;

        editBtn.addEventListener('click', () => editInfo(inputFullName, inputEmail, 
          inputPhoneNumber, inputAddress, inputPostalCode));

        continueBtn.addEventListener('click', deleteInfo);
     }

     fullName.value = '';
     email.value = '';
     phoneNumber.value = '';
     address.value = '';
     postalCode.value = '';
   }

   function editInfo(inputFullName, inputEmail, 
    inputPhoneNumber, inputAddress, inputPostalCode) {
    
      fullName.value = inputFullName;
      email.value = inputEmail;
      phoneNumber.value = inputPhoneNumber;
      address.value = inputAddress;
      postalCode.value = inputPostalCode;

      submitBtn.disabled = false;
      editBtn.disabled = true;
      continueBtn.disabled = true;

      Array.from(document.querySelectorAll('#infoPreview li')).forEach(li => li.remove());
   }

   function deleteInfo() {
      const greetingH3 = document.createElement('h3');
      greetingH3.textContent = 'Thank you for your reservation!';

      while(blockDiv.firstChild) {
        blockDiv.firstChild.remove();
      }

      blockDiv.appendChild(greetingH3);
   }
}
