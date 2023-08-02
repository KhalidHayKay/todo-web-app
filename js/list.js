import { archivedTaskArr, TaskArchive } from "./archive.js";

class Task
{
    constructor(taskName, date, taskId)
    {
        this.taskName = taskName;
        this.date = date;
        this.taskId = taskId;
    }

    #buildElement()
    {
        const element = document.createElement('li');
        element.innerHTML =  `
            <div class="detail">
                <p>${this.taskName}</p>
                <span>${this.date}</span>
            </div>
            <div class="icons">
                <i class='bx bxs-pencil data-id=${this.taskId}'></i>
                <i class='bx bxs-trash-alt' data-id=${this.taskId}></i>
            </div>
        `
        return element
    }

    print()
    {
        listContainer.appendChild(this.#buildElement());
        checkTodolistEmptiness();

        // list events
        listContainer.addEventListener('click', e => {
            if(e.target.classList.contains('bxs-trash-alt')){
                task.delete(e);
            } else if(e.target.classList.contains('bxs-pencil'))
            {
                task.archive(e);
            } else if(e.target.classList.contains('detail'))
            {
                task.edit(e);
            }
        })
    }
}

//Storage
const storage = {
    set: (key, arr) => {
        sessionStorage.setItem(key, JSON.stringify(arr));
    },
    get: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
    delete: (arr, id) => {
        return arr.filter(list => list.taskId != id);
    },
}

function checkTodolistEmptiness()
{
    const empty = document.querySelector('section.todo-list ul .empty');
    if(listContainer.lastElementChild === empty)
    { 
        empty.style.display = 'block';
    } else{
        empty.style.display = 'none';
    }
}

// Main todolist array
let todoListArr = storage.get('listArr') === null ? [] : storage.get('listArr');
// Get HTML elements
const addTaskBtn = document.querySelector('div.add-task');
const addTaskTextarea = document.querySelector('div.task-textarea');
const textarea = document.querySelector('div.task-textarea>textarea');
const listContainer = document.querySelector('section.todo-list ul');

// Print previous stored tasks
window.addEventListener('DOMContentLoaded', e => {
    todoListArr.forEach(task => {
        const newTask = new Task(task.taskName, task.date, task.taskId);
        newTask.print();
    })

    checkTodolistEmptiness();
})

// Textarea opener
addTaskBtn.addEventListener('click', e => {
    textArea.show();

    addTaskTextarea.addEventListener('click', e => {
        e.stopImmediatePropagation();
        textArea.textareaBtnEvents(e);
    })
});


const textArea = {
    show: function(){
        addTaskTextarea.style.display = 'flex';
    },
    hide: function(){
        addTaskTextarea.style.display = 'none';
    },

    textareaBtnEvents: function(e)
    {
        if(e.target.textContent === 'save'){
            if(textarea.value === ''){
                alert('Task cannot be empty');
            } else {
                const randomId = Math.random() * 1000000;
                let newTask = new Task(
                    textarea.value,
                    DateAndTime(),
                    randomId
                );
                newTask.print();

                todoListArr.push(newTask);
                storage.set('listArr', todoListArr);

                textarea.value = '';
                textArea.hide();
            }
        } else if(e.target.textContent === 'cancel'){
            textArea.hide();
        }
    },
}

//Task
const task = {
    delete: function(e)
    {
        e.target.parentElement.parentElement.remove();

        todoListArr = storage.delete(todoListArr, e.target.dataset.id);
        storage.set('listArr', todoListArr);

        checkTodolistEmptiness();
    },

    // Edit (and viewing)
    edit: function(e)
    {
        textarea.value = e.target.firstElementChild.textContent;
        textArea.show();

        addTaskTextarea.addEventListener('click', e => {
            e.stopImmediatePropagation();
            if(e.target.textContent === 'cancel')
            {
                textArea.hide();
                textarea.value = '';
            } else if(e.target.textContent === 'save')
            {
                textArea.hide()
                textarea.value = '';
            }
        })
    },

    archive: function(e)
    {
        e.stopImmediatePropagation();
        const name = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        const id = e.target.nextElementSibling.dataset.id;
        const newTaskArchive = new TaskArchive(name, id);
        newTaskArchive.printArchive();

        archivedTaskArr.push(newTaskArchive);
        storage.set('archiveArr', archivedTaskArr);

        todoListArr = storage.delete(todoListArr, id)
        this.delete(e);
    },
}

function DateAndTime()
{
    const dateFunction = new Date();

    const date = dateFunction.getDate();
    const month = dateFunction.toLocaleString('default', {month: 'short'});
    const year = dateFunction.getFullYear();
    const hour = dateFunction.getHours().toString().padStart(2, 0);
    const minute = dateFunction.getMinutes().toString().padStart(2, 0);

    return `${hour}:${minute} ${month} ${date}, ${year}.`;
}


export { storage, Task, DateAndTime, todoListArr };