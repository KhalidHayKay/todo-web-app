import { storage, Task, DateAndTime, todoListArr } from './list.js';

const archivedTaskContainer = document.querySelector('.archive ul');
let archivedTaskArr = storage.get('archiveArr') === null ? [] : storage.get('archiveArr');

window.addEventListener('DOMContentLoaded', e => {
    archivedTaskArr.forEach(list => {
        const archive = new TaskArchive(list.name, list.taskId)
        archive.printArchive();
    });
})

class TaskArchive
{
    constructor(name, id)
    {
        this.name = name;
        this.taskId = id;
    }

    #buildElement()
    {
        const element = document.createElement('li');
        element.innerHTML =  `
            <p>${this.name}</p>
            <i class='bx bx-archive-out' data-id=${this.taskId}></i>
        `
        return element;
    }

    printArchive()
    {
        archivedTaskContainer.appendChild(this.#buildElement());
        // Unarchive events
        archivedTaskContainer.addEventListener('click', e => {
            e.stopImmediatePropagation();

            if(e.target.classList.contains('bx-archive-out')){
                const newTask = new Task(
                    e.target.previousElementSibling.textContent,
                    DateAndTime(),
                    e.target.dataset.id
                )
                newTask.print();
                todoListArr.push(newTask);
                storage.set('listArr', todoListArr);

                e.target.parentElement.remove();
                archivedTaskArr = storage.delete(archivedTaskArr, e.target.dataset.id);
                storage.set('archiveArr', archivedTaskArr);
            }
        })
    }

    autoRemoveArchive()
    {
        setTimeout(() => {
            archivedTaskContainer.removeChild();
        }, 10000)
    }
}



export { archivedTaskArr, TaskArchive};