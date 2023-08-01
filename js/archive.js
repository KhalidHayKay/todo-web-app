import { storage } from './list.js';

const archivedTaskContainer = document.querySelector('.archives ul');
let archivedTaskArr = storage.get('archiveArr') === null ? [] : storage.get('archiveArr');

class TaskArchive
{
    constructor(name, id)
    {
        this.name = name;
        this.id = id;
    }
}

function printArchive()
{
    const archiveElementArr = archivedTaskArr.map(list => {
        return `
            <li>
                <p>${list.name}</p>
                <i class='bx bx-archive-out' data-id=${list.id}></i>
            </li>
        `
    })

    archivedTaskContainer.innerHTML = archiveElementArr.join('');

    setTimeout( () => {
        archivedTaskContainer.innerHTML = '';
    }, 10000)
}

export { archivedTaskArr, TaskArchive, printArchive };