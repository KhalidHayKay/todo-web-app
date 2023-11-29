import { storage, checkIfTodolistIsEmpty, todoListArr, createInnerHTML } from './list.js';

const archivedTaskContainer = document.querySelector('.archive ul');
const clearAll = document.querySelector('section.archive div button');
const emptyArchivedListIndicator = '<p class="empty">There are no archives</p>';

let archivedListArr = storage.get('archiveArr') === null ? [] : storage.get('archiveArr');

window.addEventListener('DOMContentLoaded', e => {
    const element = createArchiveInnerHTML(archivedListArr);

    checkIfTodolistIsEmpty(archivedTaskContainer, emptyArchivedListIndicator);
})

function buildElement(item) {
    return  `
        <li>
            <p>${item.name}</p>
            <i class='bx bx-archive-out' data-id=${item.id}>res</i>
        </li>
   `
}

function createArchiveInnerHTML(arr) {
   let element = '';

    arr.map(item =>  buildElement(item))
    .forEach(list => {
       element = element + list;
   });
   
   archivedTaskContainer.innerHTML = element;

   Array.from(archivedTaskContainer.children)
   .forEach(element => {
       element.addEventListener('click', e => {
           if(e.target.classList.contains('bx-archive-out')){
               restore(e);
           }
       });
   });
}

function removeArchiveById(id) {
    archivedListArr = storage.delete(archivedListArr, id);
    storage.set('archiveArr', archivedListArr);
    createArchiveInnerHTML(archivedListArr);
    checkIfTodolistIsEmpty(archivedTaskContainer, emptyArchivedListIndicator);
}

function restore(e) {
    e.stopImmediatePropagation();
    const id = e.target.dataset.id;

    const todoListToBeRestored = archivedListArr.filter(item => item.id == id)[0];
    todoListArr.push(todoListToBeRestored);
    storage.set('listArr', todoListArr);
    createInnerHTML(todoListArr);

    removeArchiveById(id);
}

function autoRemoveArchive(id)
{
    setTimeout(() => {
        removeArchiveById(id);
    }, 60 * 60 * 1000)
}

clearAll.addEventListener('click', e => {
    if(archivedTaskContainer.innerHTML === emptyArchivedListIndicator)
    {
        return;
    }

    const proceedToClearArchive = confirm('WARNING: You are about to clear all your archives, click OK to proceed!');
    if(proceedToClearArchive) {
       archivedTaskContainer.innerHTML = emptyArchivedListIndicator;

        archivedListArr = [];
        storage.set('archiveArr', archivedListArr); 
    } else {
        return;
    }
})

export { archivedListArr, createArchiveInnerHTML, autoRemoveArchive };