window.addEventListener("load", solve);

function solve() {
   const title = document.querySelector('#post-title');
   const category = document.querySelector('#post-category');
   const content = document.querySelector('#post-content');
   const post = document.querySelector('#review-list');
   const upload = document.querySelector('#published-list');

   const publishBtn = document.querySelector('#publish-btn');
   publishBtn.addEventListener('click', sendPost);

   const clearBtn = document.querySelector('#clear-btn');
   clearBtn.addEventListener('click', clearPosts);

   function sendPost(e) {
    e.preventDefault();

    let inputTitle = title.value;
    let inputCategory = category.value;
    let inputContent = content.value;
  
    if(inputTitle !== '' && inputCategory !== '' && inputContent) {

      const postLi = document.createElement('li');
      postLi.classList.add('rpost');
      const postArticle = document.createElement('article');
      const titleH4 = document.createElement('h4');
      titleH4.textContent = inputTitle;
      const categoryP = document.createElement('p');
      categoryP.textContent = `Category: ${inputCategory}`;
      const contentP = document.createElement('p');
      contentP.textContent = `Content: ${inputContent}`;

      const editBtn = document.createElement('button');
      editBtn.classList.add('action-btn', 'edit');
      editBtn.textContent = 'Edit';

      editBtn.addEventListener('click', () => editInfo(postLi, inputTitle, inputCategory, inputContent))

      const approveBtn = document.createElement('button');
      approveBtn.classList.add('action-btn', 'approve');
      approveBtn.textContent = 'Approve';

      approveBtn.addEventListener('click', () => approveInfo(postLi, approveBtn, editBtn))

      postArticle.appendChild(titleH4);
      postArticle.appendChild(categoryP);
      postArticle.appendChild(contentP);

      postLi.appendChild(postArticle);
      postLi.appendChild(approveBtn);
      postLi.appendChild(editBtn);

      post.appendChild(postLi);
    }

    title.value = '';
    category.value = '';
    content.value = '';
   }
   
   function editInfo(postLi, inputTitle, inputCategory, inputContent) {

    postLi.remove();

    title.value = inputTitle;
    category.value = inputCategory;
    content.value = inputContent;
   }

   function approveInfo(postLi, approveBtn, editBtn) {
      approveBtn.remove();
      editBtn.remove();
      upload.appendChild(postLi);
   }

   function clearPosts() {
      while(upload.firstChild) {
        upload.firstChild.remove();
      }
   }

}
