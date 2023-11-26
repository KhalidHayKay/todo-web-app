import { archivedListArr, createArchiveInnerHTML } from "./archive.js";

const addTaskTextarea = document.querySelector('div.task-textarea');
const textarea = document.querySelector('div.task-textarea>textarea');
const listContainer = document.querySelector('section.home ul');
const emptyTodoListIndicator = '<p class="empty">Todo list is empty</p>';

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

let todoListArr = storage.get('listArr') === null ? [] : storage.get('listArr');

// On page load, print previously stored tasks.
window.addEventListener('DOMContentLoaded', e => {
    const element = createInnerHTML(todoListArr);

    checkIfTodolistIsEmpty(listContainer, emptyTodoListIndicator);
})

class Task
{
    constructor(name, date, id)
    {
        this.name = name;
        this.date = date;
        this.id = id;
    }

    addToListArr() {
        todoListArr.push(this);
    }
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
    const lists = arr.map((item) => {
        return buildElement(item)
    })

    let element = '';
    lists.forEach(list => {
        element = element + list;
    });
    
    listContainer.innerHTML = element;

    Array.from(listContainer.children).forEach(taskElement => {
        taskElement.addEventListener('click', e => {
            if(e.target.classList.contains('bxs-trash-alt')){
                task.delete(e);
            } else if(e.target.classList.contains('bxs-pencil'))
            {
                task.archive(e);
            } else if(e.target.classList.contains('detail'))
            {
                // console.log(e.target.firstElementChild.textContent + ' will be edited');
                const id = e.target.dataset.id;
                // console.log(id);
                task.edit(e, id);
            }
        });
    });
}

let isEditMode = false;

const textArea = {
    show: function(){
        addTaskTextarea.style.display = 'flex';
    },
    hide: function(){
        addTaskTextarea.style.display = 'none';
    },

    event: function(e, id = null)
    {
        if(e.target.textContent === 'save') {
            if(textarea.value === ''){
                alert('Task cannot be empty');
            } else {
                if(isEditMode) {
                    // let id = firstEventPropagator.target.dataset.id;
                    // console.log(id);

                    // const editedTask = todoListArr.filter(item => item.id == id);

                    // editedTask[0].name = textarea.value;

                    // todoListArr = todoListArr.filter(item => {
                    //     if(item.id == id) {
                    //         item = editedTask[0];
                            
                    //         return item;
                    //     } 
                        
                    //     return item;
                    // })

                    // createInnerHTML(todoListArr);

                    isEditMode = false;
                } else {
                    const id = Math.random() * 1000000;

                    let newTask = new Task(
                        textarea.value,
                        dateTime(),
                        id
                    ).addToListArr();
                }

                createInnerHTML(todoListArr);
                
                storage.set('listArr', todoListArr);

                textarea.value = '';
                textArea.hide();
            }
        } else if(e.target.textContent === 'cancel'){
            textArea.hide();
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
        console.log(id);
        isEditMode = true;
        
        textArea.show();

        const event = (e, id) => {
            e.stopImmediatePropagation();
            console.log(id);
            textArea.event(e, id);
        }

        const ev = (e) => {
            // e.stopImmediatePropagation();
            event(e, id)
        }

        addTaskTextarea.addEventListener('click', ev);

        // addTaskTextarea.removeEventListener('click', ev)

        textarea.value = e.target.firstElementChild.textContent;

        // addTaskTextarea.addEventListener('click', e => {
        //     e.stopImmediatePropagation();
        //     if(e.target.textContent === 'cancel')
        //     {
        //         textArea.hide();
        //         textarea.value = '';
        //     } else if(e.target.textContent === 'save')
        //     {
        //         textArea.hide()
        //         textarea.value = '';
        //     }
        // })
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
    },
}

// Textarea opener
document.querySelector('div.add-task')
.addEventListener('click', e => {
    textArea.show();
    textarea.focus();

    addTaskTextarea.addEventListener('click', e => {
        e.stopImmediatePropagation();
        textArea.event(e);
    })
});


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
        })
    })        
})

export { storage, checkIfTodolistIsEmpty, todoListArr, createInnerHTML };