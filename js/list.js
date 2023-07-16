const addTaskBtn = document.querySelector('div.add-task');
const addTaskTextarea = document.querySelector('div.task-textarea');

addTaskBtn.addEventListener('click', e => {
    addTaskTextarea.style.display = 'flex';
})



//      List and list container:

const listContainer = document.querySelector('section.todo-list ul');
const empty = document.querySelector('section.todo-list ul .empty');

if(listContainer.childElementCount < 2){
    empty.style.display = 'block';
}

//      Textarea Events:

const textarea = document.querySelector('div.task-textarea>textarea')

const textareaBtns = document.querySelectorAll('div.task-textarea>div>button');
textareaBtns.forEach(btn => {
    btn.addEventListener('click', e => {

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
    })
})

//      List (Viewing and Editing)

// const todoLists = document.querySelectorAll('section.todo-list ul li');
// todoLists.forEach(todoList => {
//     todoList.a;ddEventListener('click', e => {
//         const self = e.target.parentNode;
//         console.log(self);
//     })
// })




//      FUNCTIONS!!!!!      

function addNewTask(){
    const taskName = textarea.value;
    const currentDate = '31 Dec, 23. 23:00';

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
}