//      Show textarea
const addTaskBtn = document.querySelector('div.add-task');
const addTaskTextarea = document.querySelector('div.task-textarea');

addTaskBtn.addEventListener('click', showTextArea);
function showTextArea()
{
    addTaskTextarea.style.display = 'flex';
}

//      List container:
const listContainer = document.querySelector('section.todo-list ul');
const empty = document.querySelector('section.todo-list ul .empty');

if(listContainer.childElementCount < 2)
{
    empty.style.display = 'block';
}

//      Textarea Events:
const textarea = document.querySelector('div.task-textarea>textarea')

const textareaBtns = document.querySelectorAll('div.task-textarea>div>button');
textareaBtns.forEach(btn => {
    btn.addEventListener('click', textareaBtnsEvent)
})
function textareaBtnsEvent(e){
    if(e.target === textareaBtns[1]){
        if(textarea.value === ''){
            alert('Task cannot be empty');
            stay;
        } else {
            addNewTask();
        }
    }
    
    textarea.value = '';
    addTaskTextarea.style.display = 'none';
}

//      Todo lists saved in SessionStorage
let todoListArr;
if(sessionStorage.getItem('todolist-array') === null)
{
    todoListArr = [];
} else
{
    todoListArr = JSON.parse(sessionStorage.getItem('todolist-array'));
    todoListArr.forEach(task => {
        printTask(task.task, task.date);
    })
}


//      FUNCTIONS!!!!!


function printTask(taskName, currentDate)
{
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <div class="detail">
            <p>${taskName}</p>
            <span>${currentDate}</span>
        </div>
        <div class="icons">
            <i class='bx bxs-pencil'></i>
            <i class='bx bxs-trash-alt'></i>
        </div>
    `;
    empty.style.display = 'none';
    listContainer.appendChild(newTask);

    // List (Viewing and *Editing)
    newTask.firstElementChild.addEventListener('click', e => {
        const todoListText = newTask.firstElementChild.firstElementChild;
        textarea.value = todoListText.textContent;
        showTextArea();

        // textarea.readOnly = true;
        // textareaBtns[1].style.visibility = 'hidden';
    })
}


function addNewTask()
{
    newTaskProps = {
        task: textarea.value,
        date: DateAndTime()
    }

    todoListArr.push(newTaskProps);
    sessionStorage.setItem('todolist-array', JSON.stringify(todoListArr))

    printTask(newTaskProps.task, newTaskProps.date);
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