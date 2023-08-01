import { archivedTaskArr, TaskArchive, printArchive } from "./archive.js";

class Task
{
    constructor(taskName, date, taskId)
    {
        this.taskName = taskName;
        this.date = date;
        this.taskId = taskId;
    }
}

// Print previous stored tasks
window.addEventListener('DOMContentLoaded', e => {
    task.print();
    printArchive();
})

// Get HTML elements
const addTaskBtn = document.querySelector('div.add-task');
const addTaskTextarea = document.querySelector('div.task-textarea');
const textarea = document.querySelector('div.task-textarea>textarea');
const listContainer = document.querySelector('section.todo-list ul');

addTaskBtn.addEventListener('click', e => {
    textArea.show();

    addTaskTextarea.addEventListener('click', e => {
        e.stopImmediatePropagation();
        textArea.textareaBtnsEvent(e);
    })
});



//Textarea
const textArea = {
    textareaBtnsEvent: function(e)
    {
        if(e.target.textContent === 'save'){
            if(textarea.value === ''){
                alert('Task cannot be empty');
            } else {
                const randomId = Math.random() * 1000000;
                let newTask = new Task(
                    textarea.value,
                    task.DateAndTime(),
                    randomId
                );
                todoListArr.push(newTask);
                storage.set('listArr', todoListArr);
        
                task.print();

                textarea.value = '';
                textArea.hide();
            }
        } else if(e.target.textContent === 'cancel'){
            textArea.hide();
        }
    },

    show: function(){
        addTaskTextarea.style.display = 'flex';
    },
    hide: function(){
        addTaskTextarea.style.display = 'none';
    }
}

//Task
const task = {
    print: function()
    {
        
        const elementArr = todoListArr.map(list => {
            return `
                <li>
                    <div class="detail">
                        <p>${list.taskName}</p>
                        <span>${list.date}</span>
                    </div>
                    <div class="icons">
                        <i class='bx bxs-pencil'></i>
                        <i class='bx bxs-trash-alt' data-id=${list.taskId}></i>
                    </div>
                </li>
            `
        }) 
        listContainer.innerHTML = elementArr.join('');
        // delete task
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
    },

    delete: function(e)
    {
        e.target.parentElement.parentElement.remove();

        todoListArr = todoListArr.filter(list => list.taskId != e.target.dataset.id);
        storage.set('listArr', todoListArr);
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

    //archive
    archive: function(e)
    {
        const name = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        const id = e.target.nextElementSibling.dataset.id;
        const newTaskArchive = new TaskArchive(name, id);
        archivedTaskArr.push(newTaskArchive);
        storage.set('archiveArr', archivedTaskArr);

        // const archivedTaskContainer = document.querySelector('.archives ul');
        printArchive();
    },

    DateAndTime: function()
    {
        const dateFunction = new Date();

        const date = dateFunction.getDate();
        const month = dateFunction.toLocaleString('default', {month: 'short'});
        const year = dateFunction.getFullYear();
        const hour = dateFunction.getHours().toString().padStart(2, 0);
        const minute = dateFunction.getMinutes().toString().padStart(2, 0);

        return `${hour}:${minute} ${month} ${date}, ${year}.`;
    }
}

// UI (task list)
// const ui = {
//     checkTodolistEmptiness: function()
//     {
//         const empty = document.querySelector('section.todo-list ul .empty');
//         console.log(empty)
//         if(listContainer.childElementCount < 6)
//         {
//             // empty.style.display = 'block';
//             listContainer.innerHTML = empty;
//         }
//         console.log(listContainer.childElementCount)
//         console.log('a')
//     },
// }
// ui.checkTodolistEmptiness();

//Storage
const storage = {
    set: function(key, arr){
        sessionStorage.setItem(key, JSON.stringify(arr));
    },
    get: function(key){
        return JSON.parse(sessionStorage.getItem(key));
    }
}

let todoListArr = storage.get('listArr') === null ? [] : storage.get('listArr');


export { storage };