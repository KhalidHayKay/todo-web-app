import { archivedListArr, createArchiveInnerHTML } from "./archive.js";

const addTaskTextarea = document.querySelector('div.task-textarea');
const textareaInput = document.querySelector('div.task-textarea>textarea');
const listContainer = document.querySelector('section.home ul');
const emptyTodoListIndicator = '<p class="empty">Todo list is empty</p>';

let isEditMode = false;

const storage = {
    set: (key, arr) => {
        sessionStorage.setItem(key, JSON.stringify(arr));
    },
    get: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
    delete: (arr, id) => {
        return arr.filter(list => list.id != id);
    },
}

const defaultTask = {
    name: 'My Task ( click to edit )',
    date: dateTime(),
    id: 11111.11111
}
let todoListArr = storage.get('listArr') === null ? [defaultTask] : storage.get('listArr');

// On page load, print previously stored tasks.
window.addEventListener('DOMContentLoaded', e => {
    createInnerHTML(todoListArr);

    checkIfTodolistIsEmpty(listContainer, emptyTodoListIndicator);
})

function checkIfTodolistIsEmpty(parent, emptyElement) {
    if(parent.innerHTML === '')
    { 
        parent.innerHTML = emptyElement;
    } else{
        return;
    }
}

function dateTime() {
    const dateFunction = new Date();

    const date = dateFunction.getDate();
    const month = dateFunction.toLocaleString('default', {month: 'short'});
    const year = dateFunction.getFullYear() - 2000;
    const hour = dateFunction.getHours().toString().padStart(2, 0);
    const minute = dateFunction.getMinutes().toString().padStart(2, 0);

    return `${hour}:${minute}. ${month} ${date}, ${year}`;
}

function buildElement(item) {
     return  `
        <li>
            <div class="detail" data-id=${item.id}>
                <p>${item.name}</p>
                <span>${item.date}</span>
            </div>
            <div class="icons">
                <i class='bx bxs-pencil' data-id=${item.id}>arc</i>
                <i class='bx bxs-trash-alt' data-id=${item.id}>del</i>
            </div>
        </li>
    `
}

function createInnerHTML(arr) {
    let element = '';

    arr.map(item => buildElement(item))
    .forEach(list => {
        element = element + list;
    });
    
    listContainer.innerHTML = element;

    Array.from(listContainer.children)
    .forEach(taskElement => {
        taskElement.addEventListener('click', e => {
            if(e.target.classList.contains('bxs-trash-alt')){
                task.delete(e);
            } else if(e.target.classList.contains('bxs-pencil'))
            {
                task.archive(e);
            } else if(e.target.classList.contains('detail'))
            {
                const id = e.target.dataset.id;
                task.edit(e, id);
            }
        });
    });
}

const textarea = {
    show: function(){
        addTaskTextarea.style.display = 'flex';
    },
    hide: function(){
        addTaskTextarea.style.display = 'none';
    },

    event: function(e, id = null)
    {
        if(e.target.textContent === 'save') {
            if(textareaInput.value === ''){
                alert('Task cannot be empty');
            } else {
                if(isEditMode) {
                    const editedTask = todoListArr.filter(item => item.id == id);
                    editedTask[0].name = textareaInput.value;

                    todoListArr = todoListArr.filter(item => {
                        if(item.id == id) {
                            item = editedTask[0];
                            
                            return item;
                        } 
                        
                        return item;
                    })

                    isEditMode = false;
                } else {
                    const id = Math.random() * 1000000;

                    const Task = {
                        name: textareaInput.value,
                        date: dateTime(),
                        id: id,
                    }
                    
                    todoListArr.push(Task);
                }

                createInnerHTML(todoListArr);
                
                storage.set('listArr', todoListArr);

                textareaInput.value = '';
                textarea.hide();
            }
        } else if(e.target.textContent === 'cancel'){
            if(isEditMode) {
                textareaInput.value = ''
                isEditMode = false;
            };
            textarea.hide();
        }
    },
}

const task = {
    delete: function(e)
    {
        const proceedToDelete = confirm('WARNING: This Task will be permanently deleted, click OK to proceed!');

        if(proceedToDelete) {
            todoListArr = storage.delete(todoListArr, e.target.dataset.id);
            storage.set('listArr', todoListArr);
    
            createInnerHTML(todoListArr);
        } else {
            return;
        }
        
        checkIfTodolistIsEmpty(listContainer, emptyTodoListIndicator);
    },

    // Editing (and viewing) a task
    edit: function(e, id)
    {
        isEditMode = true;
        
        textarea.show();
        textareaInput.focus();
        textareaInput.value = e.target.firstElementChild.textContent;
        textareaInput.dataset.id = id;

        addTaskTextarea.removeEventListener('click', textareaBtnClickEvent.newTask);
        addTaskTextarea.addEventListener('click', textareaBtnClickEvent.taskEdit);
    },

    archive: function(e)
    {
        e.stopImmediatePropagation();
        const id = e.target.dataset.id;

        const newTaskArchive = todoListArr.filter(item => item.id == id)[0];
        archivedListArr.push(newTaskArchive);
        storage.set('archiveArr', archivedListArr);
        createArchiveInnerHTML(archivedListArr);

        todoListArr = storage.delete(todoListArr, id);
        storage.set('listArr', todoListArr);
        createInnerHTML(todoListArr);
        checkIfTodolistIsEmpty(listContainer, emptyTodoListIndicator);

        alert('Your task has been archived. Click OK to continue');
    },
}

const textareaBtnClickEvent = {
    newTask: (e) => {
        e.stopImmediatePropagation();
        textarea.event(e);
    },

    taskEdit: (e) => {
        e.stopImmediatePropagation();
        textarea.event(e, textareaInput.dataset.id);
    }
}

// Textarea opener
document.querySelector('div.add-task')
.addEventListener('click', e => {
    textarea.show();
    textareaInput.focus();

    addTaskTextarea.removeEventListener('click', textareaBtnClickEvent.taskEdit);
    addTaskTextarea.addEventListener('click', textareaBtnClickEvent.newTask)
});

const noMatches = document.createElement('p');
noMatches.classList.add('empty');
noMatches.innerHTML = 'No match!'
document.querySelector('.search')
.addEventListener('click', e => {
    if(e.target.classList.contains('bx-search')){
        e.target.previousElementSibling.focus();
    }

    document.querySelector('.search>input').
    addEventListener('keyup', e => {
        const checkValue = e.target.value;

        document.querySelectorAll('section.home ul li').
        forEach(list => {
            if(!list.firstElementChild.firstElementChild.textContent.includes(checkValue))
            {
                list.style.display = 'none';
            } else {
                list.style.display = 'flex';
            }

            let numberOfMatches = 0;
            if(list.style.display === 'flex') {
                numberOfMatches++
            }

            if(numberOfMatches === 0) {
                listContainer.appendChild(noMatches);
            } else {
                if(listContainer.lastElementChild != noMatches) {
                    return;
                }
                listContainer.removeChild(noMatches);
            }
        })
    })        
})

export { storage, checkIfTodolistIsEmpty, todoListArr, createInnerHTML };