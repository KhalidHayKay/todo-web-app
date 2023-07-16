const addTaskBtn = document.querySelector('div.add-task');
const addTaskTextarea = document.querySelector('div.task-textarea');

addTaskBtn.addEventListener('click', showTextArea);
function showTextArea(){
    addTaskTextarea.style.display = 'flex';
}

//      List container:
const listContainer = document.querySelector('section.todo-list ul');
const empty = document.querySelector('section.todo-list ul .empty');

if(listContainer.childElementCount < 2){
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

/*        List (Viewing and Editing)

const todoLists = document.querySelectorAll('section.todo-list ul li .detail');

todoLists.forEach(todoList => {
    todoList.addEventListener('click', e => {
        const todoListText = Array.from(todoList.children)[0];
        textarea.value = todoListText.textContent;
        showTextArea();
    })
}) */




//      FUNCTIONS!!!!!

let todoListArr = [];

function addNewTask(){
    const taskName = textarea.value;
    const currentDate = DateAndTime();

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
    todoListArr.push(newTask);

    console.log(newTask);
    listContainer.appendChild(newTask);
    
    /* List (Viewing and Editing)

    newTask.firstElementChild.addEventListener('click', e => {
        const todoListText = newTask.firstElementChild.firstElementChild;
        textarea.value = todoListText.textContent;
        showTextArea();

        textareaBtns[0].style.visibility = 'hidden';
        textareaBtns.forEach(btn => {
            btn.removeEventListener('click', textareaBtnsEvent);
        })
        textareaBtns[1].addEventListener('click', e => {
            todoListText.textContent = textarea.value;

            textarea.value = '';
            addTaskTextarea.style.display = 'none';
        })

    }) */
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