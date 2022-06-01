//Load necessary functions from the beginning
window.addEventListener("DOMContentLoaded", () => {
    completionStatus();
    priorityLevel();
});

let itemStatus = document.querySelectorAll('.completion-status-item'); //gets individual options (list items) on the dropdown menu
let containerStatus = document.querySelector('#completion-status'); //gets the container (list) that has the options
let buttonStatus = document.querySelector('#completion-button'); //gets the button for styling

//Function so dropdown menu options for the Tasklist replaces the original text for user clarity
function completionStatus() {
    for (let i = 0; i < itemStatus.length; i++) {
        itemStatus[i].addEventListener('click', () => {
            let newVal = itemStatus[i].textContent;
            containerStatus.textContent = newVal; //rewrites the text to what option the user selected.

            switch (newVal) {
                case 'Not Started':
                    buttonStatus.style.backgroundColor = "#ee4463";
                    buttonStatus.style.borderColor = "#ee4463";
                    break;
                case 'Working On It':
                    buttonStatus.style.backgroundColor = "#FED148";
                    buttonStatus.style.borderColor = "#FED148";
                    break;
                case 'Nearly There!':
                    buttonStatus.style.backgroundColor = "#33d4a4";
                    buttonStatus.style.borderColor = "#33d4a4";
                    break;
                default:
                    alert("ERROR - GUESS I WON'T BE GETTING A HD");
                    break;
            };
        });
    };
};

let itemLevel = document.querySelectorAll('.priority-level-item');
let containerLevel = document.querySelector('#priority-level'); //gets the container (list) that has the options
let buttonLevel = document.querySelector('#priority-button');

//Pretty much the same as completionStatus(), with different names for priority instead.
//Here I used Level instead of Status to differentiate both of them since it felt more fitting.
function priorityLevel() {

    for (let a = 0; a < itemLevel.length; a++) {
        itemLevel[a].addEventListener('click', () => {
            let newVal = itemLevel[a].textContent;
            containerLevel.textContent = newVal;

            switch (newVal) {
                case 'HIGH':
                    buttonLevel.style.backgroundColor = "#ee4463";
                    buttonLevel.style.borderColor = "#ee4463";
                    break;
                case 'MEDIUM':
                    buttonLevel.style.backgroundColor = "#FED148";
                    buttonLevel.style.borderColor = "#FED148";
                    break;
                case 'LOW':
                    buttonLevel.style.backgroundColor = "#33d4a4";
                    buttonLevel.style.borderColor = "#33d4a4";
                    break;
                default:
                    alert("ERROR - REALLY? AGAIN?");
                    break;
            };

        });

    };
};

//Function to Submit the Task and turn it into an Object and store it in an Array
let taskList = []; //Array with All the Task Objects

function createNewTask() {

    //if statement to determine if all fields are filled properly
    //if (
    //    document.getElementById('title').value == ''
    //    || //|| == OR
    //    document.getElementById('dueDate').value == ''
    //    ||
    //    document.getElementById('estTime').value == ''
    //    ||
    //    document.getElementById('completion-status').textContent == 'Completion Status'
    //    ||
    //    document.getElementById('priority-level').textContent == 'Priority Level'
    //) {
    //    alert('Please Enter All Inputs in the Tasklist Creator');
    //    return //stops the function from entering the tasklist form, found here: https://stackoverflow.com/questions/3330193/early-exit-from-function
    //}
    //
    ////if statement to check if Est. Time input has an actual number, nothing fancy though
    //if (isNaN(document.querySelector('#estTime').value)) {
    //    alert('Please Enter a Valid Number');
    //    return
    //}

    let task = { //Task Object
        title: document.getElementById('title').value,
        due_date: document.getElementById('dueDate').value,
        est_time: document.getElementById('estTime').value,
        completion_status: document.getElementById('completion-status').textContent,
        priority_level: document.getElementById('priority-level').textContent
    };
    taskList.push(task); //Task Object is inserted to the Array succesfully for future use

    document.querySelector('form').reset(); //Resetting the form for next input, doe buttons are still a bit messy

    //Container for all tasklist items
    let initialRow = document.getElementById('tasklist-list-item');

    //Generates a new card row everytime with dynamic id
    let cardRow = document.createElement('div');
    cardRow.setAttribute('id', `row-${taskList.length - 1}`); //gives dynamic ID to each new task card made
    cardRow.classList.add('row', 'justify-content-center', 'flex-row', 'card-row');
    initialRow.appendChild(cardRow);

    //Puts Title in the tasklist
    let cardTitle = document.createElement('span');
    cardTitle.textContent = task.title;
    cardTitle.classList.add('h4', 'card-item', 'col-auto');
    cardRow.appendChild(cardTitle);

    //Puts delete button to delete Tasks if needed
    let deleteCardContainer = document.createElement('div');
    deleteCardContainer.classList.add('h4', 'card-item', 'col');
    cardRow.appendChild(deleteCardContainer);

    let deleteCardIcon = document.createElement('i');
    deleteCardIcon.classList.add('fa-solid', 'fa-trash','trash-icon');
    deleteCardContainer.appendChild(deleteCardIcon);

    console.log(cardRow)
    //Generates a new container to include info from taskList[n]
    //let cardContainer = document.createElement('div');
    //cardContainer.setAttribute('id', `card-${taskList.length - 1}`)
    //cardContainer.classList.add('col-auto', 'container');

    //Inserts Title value into the row

    console.warn('added', { taskList });
};

document.getElementById('submit-button').addEventListener('click', createNewTask) //When Submit button is clicked, Task is generated.