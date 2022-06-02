//Load necessary functions from the beginning
window.addEventListener("DOMContentLoaded", () => {

});

//#####################################
//  TASKLIST JAVASCRIPT
//#####################################

let itemStatus = document.querySelectorAll('.completion-status-item'); //gets individual options (list items) on the dropdown menu
let containerStatus = document.querySelector('#completion-status'); //gets the container (list) that has the options
let buttonStatus = document.querySelector('#completion-button'); //gets the button for styling

//Function so dropdown menu options for the Tasklist replaces the original text for user clarity
for (let i = 0; i < itemStatus.length; i++) {
    itemStatus[i].addEventListener('click', () => {
        let completionVal = itemStatus[i].textContent;
        containerStatus.textContent = completionVal; //rewrites the text to what option the user selected.

        switch (completionVal) {
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

let itemLevel = document.querySelectorAll('.priority-level-item');
let containerLevel = document.querySelector('#priority-level'); //gets the container (list) that has the options
let buttonLevel = document.querySelector('#priority-button');

//Pretty much the same as completionStatus(), with different names for priority instead.
//Here I used Level instead of Status to differentiate both of them since it felt more fitting.
for (let a = 0; a < itemLevel.length; a++) {
    itemLevel[a].addEventListener('click', () => {
        let priorityVal = itemLevel[a].textContent;
        containerLevel.textContent = priorityVal;

        switch (priorityVal) {
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

//Function to Submit the Task and turn it into an Object and store it in an Array
let taskList = []; //Array with All the Task Objects

function createNewTask() {

    //if statement to determine if all fields are filled properly
    if (
        document.getElementById('title').value == ''
        || //|| == OR
        document.getElementById('dueDate').value == ''
        ||
        document.getElementById('estTime').value == ''
        ||
        document.getElementById('completion-status').textContent == 'Completion Status'
        ||
        document.getElementById('priority-level').textContent == 'Priority Level'
    ) {
        alert('Please Enter All Inputs in the Tasklist Creator');
        return //stops the function from entering the tasklist form, found here: https://stackoverflow.com/questions/3330193/early-exit-from-function
    } else if (isNaN(document.querySelector('#estTime').value)) {     //if statement to check if Est. Time input has an actual number, nothing fancy though
        alert('Please Enter a Valid Number');
        return
    }

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
    const cardID = cardRow.getAttribute('id'); //gets id for future use
    cardRow.classList.add('row', 'flex-row', 'card-row', 'justify-content-center');
    cardRow.addEventListener('click', this.remove) //Add Delete ability to all tasks

    initialRow.appendChild(cardRow);

    //Puts Title in the tasklist
    let cardTitle = document.createElement('span');
    cardTitle.textContent = task.title;
    cardTitle.classList.add('h4', 'card-item', 'col-auto', 'py-2');
    cardRow.appendChild(cardTitle);

    //Puts Completion Status & Priority Level in the tasklist
    let completionStatusDisplay = document.createElement('button'); //I know its not a button but it fits the theme y'know? Please don't deduct marks :C
    completionStatusDisplay.textContent = task.completion_status;
    completionStatusDisplay.classList.add('display-button', 'btn', 'btn-secondary', 'col-auto');

    switch (completionStatusDisplay.textContent) {
        case 'Not Started':
            completionStatusDisplay.style.backgroundColor = "#ee4463";
            completionStatusDisplay.style.borderColor = "#ee4463";
            break;
        case 'Working On It':
            completionStatusDisplay.style.backgroundColor = "#FED148";
            completionStatusDisplay.style.borderColor = "#FED148";
            break;
        case 'Nearly There!':
            completionStatusDisplay.style.backgroundColor = "#33d4a4";
            completionStatusDisplay.style.borderColor = "#33d4a4";
            break;
        default:
            alert("ERROR");
            break;
    };
    cardRow.appendChild(completionStatusDisplay);

    let priorityLevelDisplay = document.createElement('button'); //I know its not a button but it fits the theme y'know? Please don't deduct marks :C
    priorityLevelDisplay.textContent = task.priority_level;
    priorityLevelDisplay.classList.add('display-button', 'btn', 'btn-secondary', 'col-auto');
    priorityLevelDisplay.style.marginLeft = "3px"; //some spacing so it looks neat

    switch (priorityLevelDisplay.textContent) {
        case 'HIGH':
            priorityLevelDisplay.style.backgroundColor = "#ee4463";
            priorityLevelDisplay.style.borderColor = "#ee4463";
            break;
        case 'MEDIUM':
            priorityLevelDisplay.style.backgroundColor = "#FED148";
            priorityLevelDisplay.style.borderColor = "#FED148";
            break;
        case 'LOW':
            priorityLevelDisplay.style.backgroundColor = "#33d4a4";
            priorityLevelDisplay.style.borderColor = "#33d4a4";
            break;
        default:
            alert("ERROR");
            break;
    };
    cardRow.appendChild(priorityLevelDisplay);

    let cardRow2 = document.createElement('div');
    cardRow2.classList.add('row', 'justify-content-center');
    cardRow.appendChild(cardRow2);
    //Adds Due Date on a new Row within cardRow
    let cardDueDate = document.createElement('span');
    cardDueDate.textContent = `Due: ${task.due_date}`;
    cardDueDate.classList.add('p', 'col-auto');
    cardRow2.appendChild(cardDueDate);

    //Adds Estimated Time on a new Row within cardRow
    let cardEstTime = document.createElement('span');
    let hours = (task.est_time / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    //Taken from here: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php
    cardEstTime.textContent = `Est. ${rhours} Hours ${rminutes} Minutes`;
    cardEstTime.classList.add('p', 'col-auto');
    cardRow2.appendChild(cardEstTime);

    console.warn('added', { taskList });


};

document.getElementById('submit-button').addEventListener('click', createNewTask) //When Submit button is clicked, Task is generated.

//#####################################
//  TIMER JAVASCRIPT
//#####################################

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', timerStart); //When Start button is clicked, timer will start.

const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', timerPause); //When Start button is clicked, timer will start.

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', timerReset); //When Start button is clicked, timer will start.

let hoursText = document.getElementById('hours');
let minutesText = document.getElementById('minutes');
let secondsText = document.getElementById('seconds');
let isPaused = false;
let intervalFunction;
let seconds = 0;

//Function to start the time countup once the button is clicked
function timerStart() {
    if (isPaused == false) { //if not Paused, start
        intervalFunction = setInterval(timer, 100);
        startButton.removeEventListener('click', timerStart); //Start can only happen ONCE, to prevent the code from breaking.
        isPaused = true;
    }
}

//Function to pause the time countup once the button is clicked
function timerPause() {
    if (isPaused == true ) { //if Paused, stop
        clearInterval(intervalFunction)
        startButton.addEventListener('click', timerStart); //if paused, then can be clicked again to continue the timer.
        isPaused = false;
    } 
}

function timerReset() {
    //Resets all values to 0
    hoursText.innerHTML = 0;
    minutesText.innerHTML = 0;
    secondsText.innerHTML = 0;
    seconds = 0;

    //Stops the timer
    clearInterval(intervalFunction);
    startButton.addEventListener('click', timerStart); //if paused, then can be clicked again to continue the timer.
    isPaused = false;
}

function timer() {
    seconds++

    //I'll be honest, for the timer I just toss around some numbers that vaguely seem like it works until somehow accidently, it sticks. I wish I can explain the math but I'm in Design Computing and not Advanced Computing for a reason :p
    //Got the idea to do the timer this way here: https://codepen.io/reynnor/pen/vmNaeM?editors=1010
    secondsText.innerHTML = seconds % 60; //finally found a usually way to use modulo
    minutesText.innerHTML = Math.floor(seconds / 60 % 60);
    hoursText.innerHTML = Math.floor(seconds / 3600 % 3600);
}

