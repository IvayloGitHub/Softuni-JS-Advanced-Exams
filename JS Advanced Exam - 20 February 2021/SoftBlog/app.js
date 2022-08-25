function solve() {

   const author = document.querySelector('#creator');
   const title = document.querySelector('#title');
   const category = document.querySelector('#category');
   const content = document.querySelector('#content');
   const mainSec = document.querySelector('main section');
   const archiveSecOl = document.querySelector('.archive-section ol');
    
   const createBtn = document.querySelector('.btn.create');

    createBtn.addEventListener('click', sendInfo);

    function sendInfo(e) {
      e.preventDefault();

      let inputAuthor = author.value;
      let inputTitle = title.value;
      let inputCategory = category.value;
      let inputContent = content.value;

         const article = document.createElement('article');
         const titleH1 = document.createElement('h1');
         titleH1.textContent = inputTitle;
         const categoryP = document.createElement('p');
         categoryP.textContent = 'Category:';
         const categoryStrong = document.createElement('strong');
         categoryStrong.textContent = inputCategory;
         
         const authorP = document.createElement('p');
         authorP.textContent = 'Creator:';
         const authorStrong = document.createElement('strong');
         authorStrong.textContent = inputAuthor;
         
         const contentP = document.createElement('p');
         contentP.textContent = inputContent;

         const buttonsDiv = document.createElement('div');
         buttonsDiv.classList.add('buttons');

         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Delete';
         deleteBtn.classList.add('btn', 'delete');

         deleteBtn.addEventListener('click', () => deleteArticle(article));

         const archiveBtn = document.createElement('button');
         archiveBtn.textContent = 'Archive';
         archiveBtn.classList.add('btn', 'archive');

         archiveBtn.addEventListener('click', () => archiveInfo(article, titleH1));

         categoryP.appendChild(categoryStrong);
         authorP.appendChild(authorStrong);
         
         buttonsDiv.appendChild(deleteBtn);
         buttonsDiv.appendChild(archiveBtn);

         article.appendChild(titleH1);
         article.appendChild(categoryP);
         article.appendChild(authorP);
         article.appendChild(contentP);
         article.appendChild(buttonsDiv);

         mainSec.appendChild(article);

      author.value = '';
      title.value = '';
      category.value = '';
      content.value = '';
    }

    function archiveInfo(article, titleH1) {
      
      let archiveLis = Array.from(archiveSecOl.children);

      let newTitleLi = document.createElement('li');
      newTitleLi.textContent = titleH1.textContent;

      article.remove();

      archiveLis.push(newTitleLi);


      archiveLis.sort((a,b) => a.textContent.localeCompare(b.textContent))
      .forEach(t => archiveSecOl.appendChild(t));
    }

    function deleteArticle(article) {
      article.remove();
    }
}
