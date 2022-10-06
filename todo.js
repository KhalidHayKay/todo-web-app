//          TO ADD TASK
const taskParent = document.querySelector('.todo-container');
const addTaskInput = document.querySelector('.add-task > input');
const addTaskButton = document.querySelector('.add-task > i');
const archivedTaskContainer = document.querySelector('.archive-sec > ul');
const clearArchives = document.querySelector('.archive-sec > button');
function addTaskFunc(){
    const newTaskName = document.createElement('p'); // Task name
    newTaskName.textContent = addTaskInput.value;
    newTaskName.classList.add('task-name');

    const deleteTask = document.createElement('i'); // Delete-task icon
    deleteTask.classList.add('delete', 'fa-solid', 'fa-trash-can');
    deleteTask.addEventListener('click', (e) => {
        const optionDialog = document.createElement('dialog'); // Delete confirmation dialog
        optionDialog.textContent = 'Are you sure you want to delete this task?'
        delBtn = document.createElement('button');
        delBtn.textContent = 'Archive instead';
        arcBtn = document.createElement('button');
        arcBtn.textContent = 'Delete';
        optionDialog.appendChild(delBtn);
        optionDialog.appendChild(arcBtn);
        document.body.appendChild(optionDialog);
        optionDialog.showModal();
        document.getElementById('hide-tasks').checked = false;  // uncheck 'archives' checkbox so as not to display archives while adding another...
        document.getElementsByClassName('archive-sec')[0].style.display = 'none';
        optionDialog.childNodes[1].addEventListener('click', (e) => {   // Dialog button-'Archive instead'
            newTask.parentNode.removeChild(newTask);
            const archivedTask = document.createElement('li');
            const restoreIcon = document.createElement('i');
            restoreIcon.classList.add('restore-icon', 'fa-solid', 'fa-arrow-up-right-from-square');
            restoreIcon.addEventListener('click', (e) => {
                newTaskName.textContent = archivedTask.textContent;
                newTask.prepend(newTaskName);
                taskParent.appendChild(newTask);
                archivedTaskContainer.removeChild(archivedTask);
                if(archivedTaskContainer.children.length < 1){  //  Removes 'CLEAR' button when there are no archived tasks
                    clearArchives.style.display = 'none';
                    document.querySelector('.archive-sec > h5').style.display = 'block';
                }
            })
            archivedTask.classList.add('archived-task');
            archivedTask.textContent = newTaskName.textContent;
            archivedTask.appendChild(restoreIcon);
            archivedTaskContainer.appendChild(archivedTask);
            clearArchives.style.display = 'block'; // shows 'Clear (archives)' button, as its initial display is 'none'
            clearArchives.addEventListener('click', (e) => {
                archivedTaskContainer.replaceChildren();
                e.target.style.display = 'none';
                document.querySelector('.archive-sec > h5').style.display = 'block';
            });
            optionDialog.close();
        })
        optionDialog.childNodes[2].addEventListener('click', (e) => {   //  Dialog button-'Delete'
            newTask.parentNode.removeChild(newTask);
            optionDialog.close();
        })
    });

    const completeTask = document.createElement('i'); // Complete-task icon
    completeTask.classList.add('fa-solid', 'completed','fa-check');
    completeTask.addEventListener('click', () => {
        taskParent.removeChild(newTask);
        const taskCompletionMessage = document.querySelector('.completation-message'); // displays a congratulatory message upon completing task
        document.querySelector('.completation-message > button').addEventListener('click', (e) => {
            taskCompletionMessage.close();
        })
        taskCompletionMessage.showModal();
    });

    const newTask = document.createElement('li');
    newTask.classList.add('todo');
    newTask.appendChild(newTaskName);
    newTask.appendChild(completeTask);
    newTask.appendChild(deleteTask);

    if(addTaskInput.value === ''){
        alert('Task cannot be empty');
    } else{                                 // line 76-81 one is to empty the text field ones the previously inputed value is entered.
        taskParent.appendChild(newTask);
        addTaskInput.value = '';
    }
}
addTaskButton.addEventListener('click', addTaskFunc);


//          EVENT LISTENER ON (SHOW ARCHIVE) CHECKBOX
document.getElementById('archive-tasks').addEventListener('change', (e) => {
    if(e.target.checked){
        document.querySelector('.archive-sec').style.display = 'grid';
        if(archivedTaskContainer.children.length < 1){
            document.querySelector('.archive-sec > h5').style.display = 'block';
        } else{
            document.querySelector('.archive-sec > h5').style.display = 'none';
        }
    } else{
        document.querySelector('.archive-sec').style.display = 'none';
    }
});


//      SEARCHING FOR ACTIVE TASKS
document.querySelector('.search-task').addEventListener('keyup', (e) => {
    for(const task of document.querySelectorAll('.todo-container > li')){
        if(task.textContent.indexOf(e.target.value) < 0){
            task.style.display = 'none';
        } else{
            task.style.display = 'grid';
        }
    }
})
