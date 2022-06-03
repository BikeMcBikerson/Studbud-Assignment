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

let task; //Task Object
let cardTitle; //Task Title
let completionStatusDisplay; //Task Completion Status
let priorityLevelDisplay; //Task Priority Level
let cardDueDate; // Task Due Date
let cardEstTime; // Task Est. Time
let cardRow; //Container with all the above info

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

    task = { //Task Object
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
    cardRow = document.createElement('div');
    cardRow.setAttribute('id', `row-${taskList.length - 1}`); //gives dynamic ID to each new task card made
    cardRow.classList.add('row', 'flex-row', 'card-row', 'justify-content-center');
    cardRow.addEventListener('click', this.remove) //Add Delete ability to all tasks

    initialRow.appendChild(cardRow);

    //Puts Title in the tasklist
    cardTitle = document.createElement('span');
    cardTitle.textContent = task.title;
    cardTitle.classList.add('h4', 'card-item', 'col-auto', 'py-2');
    cardRow.appendChild(cardTitle);

    //Puts Completion Status & Priority Level in the tasklist
    completionStatusDisplay = document.createElement('button'); //I know its not a button but it fits the theme y'know? Please don't deduct marks :C
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

    priorityLevelDisplay = document.createElement('button'); //I know its not a button but it fits the theme y'know? Please don't deduct marks :C
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
    cardDueDate = document.createElement('span');
    cardDueDate.textContent = `Due: ${task.due_date}`;
    cardDueDate.classList.add('p', 'col-auto');
    cardRow2.appendChild(cardDueDate);

    //Adds Estimated Time on a new Row within cardRow
    cardEstTime = document.createElement('span');
    let hours = (task.est_time / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    //Taken from here: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php
    
    cardEstTime.textContent = `Est. ${rhours} Hours ${rminutes} Minutes`;
    cardEstTime.classList.add('p', 'col-auto');
    cardRow2.appendChild(cardEstTime);

    createKanbanCard(); //To create identical card for Kanban purposes
};

document.getElementById('submit-button').addEventListener('click', createNewTask) //When Submit button is clicked, Task is generated.

//#####################################
//  TIMER JAVASCRIPT
//#####################################
let timerDisplay = document.getElementById('timer-display');
let hoursText = document.getElementById('hours');
let minutesText = document.getElementById('minutes');
let secondsText = document.getElementById('seconds');
let timeStateContainer = document.getElementById('pomodoro-text');
let isPaused = false;
let isPomodoro = false;
let intervalFunction;
let seconds = 0;

//Function to start the time countup once the button is clicked
function timerStart() {
    if (isPaused == false) { //if not Paused and no pomodoro, start
        intervalFunction = setInterval(timer, 1000);
        isPaused = true;
    } else if (isPaused == true && isPomodoro == false) {
        alert('Timer is Already Running, To reset timer press RESET');
    } else if (isPaused == true && isPomodoro == true) {
        alert('Pomodoro Timer is Already Running, To reset timer press RESET');
    }
}

//Function to pause the time countup once the button is clicked
function timerPause() {
    if (isPaused == true) { //if Paused, stop
        clearInterval(intervalFunction);
        isPaused = false;
    }
}

//Function to reset the time once the button is clicked
function timerReset() {

    function reset() {
        clearInterval(intervalFunction);

        hoursText.innerHTML = 0;
        minutesText.innerHTML = 0;
        secondsText.innerHTML = 0;
        seconds = 0;

        //Allows the timer to be started again
        isPaused = false;
        isPomodoro = false;
    }

    //Boolean confirmation pop-up to reset pomodoro timer, cus it can erase the user's progress
    if (isPomodoro == true) {
        let pomodoroAlert = confirm('Are you sure you want to reset Pomodoro?');
        switch (pomodoroAlert) {
            case true:
                //Set the stylign back to default
                timerDisplay.classList.remove('pomodoro-work', 'pomodoro-rest', 'pomodoro-long-rest');
                timeStateContainer.classList.remove('pomodoro-work', 'pomodoro-rest', 'pomodoro-long-rest');
                timeStateContainer.classList.add('pomodoro-no-state');
                timeStateContainer.textContent = 'No Time State';                
                reset();
                break;
            case false:
                break;
            default:
                alert('ERROR')
                break;
        };
    } else {
        reset(); //reset like normal
    }
}

//Function to start Pomodoro Counter + Start Time Logging
function timerPomodoro() {
    if (isPomodoro == false) { //if 'paused' (no timer running) and has has not activated pomodoro, then start the pomodoro timer.
        intervalFunction = setInterval(timer, 1000); //starts the count-up;
        isPaused = true;
        isPomodoro = true;
    } else if (isPomodoro == true) {
        alert('Pomodoro Timer is Already Running, To reset timer press RESET');
    }

    //Add Initial Pomodoro Time State to the Time Numbers and Text
    timerDisplay.classList.add('pomodoro-work');
    timeStateContainer.classList.replace('pomodoro-no-state', 'pomodoro-work');
    timeStateContainer.textContent = 'Work Session 1/4';
}

function timer() {
    seconds++

    //I'll be honest, for the timer I just toss around some numbers that vaguely seem like it works until somehow accidently, it sticks. I wish I can explain the math but I'm in Design Computing and not Advanced Computing for a reason :p
    //Got the idea to do the timer this way here: https://codepen.io/reynnor/pen/vmNaeM?editors=1010
    secondsText.innerHTML = seconds % 60; //finally found a usually way to use modulo
    minutesText.innerHTML = Math.floor(seconds / 60 % 60);
    hoursText.innerHTML = Math.floor(seconds / 3600 % 3600);

    //If Pomodoro Timer is on, then the timer would follow by Pomodoro Rules
    if (isPomodoro = true ) {
        switch (seconds) {
            case 1500: //25 Minutes - Start of Short Rest 1/3
                alert('Work session over, Take a Rest!')
                timerDisplay.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.textContent = 'Short Rest 1/3';
                break;
            case 1800: //30 Minutes - Start of Work Session 2/4
                alert("Rest is done, Let's get back to Work!")
                timerDisplay.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.textContent = 'Work Session 2/4';
                break;
            case 3300: //55 Minutes - Start of Short Rest 2/3
                alert('Work session over, Take a Rest!')
                timerDisplay.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.textContent = 'Short Rest 2/3';
                break;
            case 3600: //60 Minutes - Start of Work Session 3/4
                alert("Rest is done, Let's get back to Work!")
                timerDisplay.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.textContent = 'Work Session 3/4';
                break;
            case 5100: //85 Minutes - Start of Short Rest 3/3
                alert('Work session over, Take a Rest!')
                timerDisplay.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.classList.replace('pomodoro-work', 'pomodoro-rest');
                timeStateContainer.textContent = 'Short Rest 3/3';
                break;
            case 5400: //90 Minutes - Start of Work Session 3/4
                alert("Rest is done, Let's get back to Work!")
                timerDisplay.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.classList.replace('pomodoro-rest', 'pomodoro-work');
                timeStateContainer.textContent = 'Work Session 4/4';
                break;  
            case 6900: //115 Minutes - Start of Long Break
                alert('Good Job! Now You have your Long-Break!')
                timerDisplay.classList.replace('pomodoro-work', 'pomodoro-long-rest');
                timeStateContainer.classList.replace('pomodoro-work', 'pomodoro-long-rest');
                timeStateContainer.textContent = 'Long Break';
                break;    
            case 8700: //145 Minutes - End of Long Break & End of Pomodoro
                alert('Good Job! Now You have your Long-Break!')
                timerDisplay.classList.remove('pomodoro-long-rest');
                timeStateContainer.classList.replace('pomodoro-long-rest', 'pomodoro-no-state');
                timerReset();
                timeStateContainer.textContent = 'No Time State';
                break;           
        };
    };
};

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', timerStart); //When Start button is clicked, timer will start.

const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', timerPause); //When Pause button is clicked, timer will pause.

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', timerReset); //When Reset button is clicked, timer will reset.

const pomodoroButton = document.getElementById('pomodoro-button');
pomodoroButton.addEventListener('click', timerPomodoro); //When Pomodoro button is clicked, pomodoro timer will start and the time stamps will be logged.

//#####################################
//  KANBAN JAVASCRIPT
//#####################################
let kanbanCard; //this element will be our Kanban Card, we can change it however we like without affecting the tasklist
let toDo = document.getElementById('low-completion');
let inProgress = document.getElementById('med-completion');

function createKanbanCard(){
    kanbanCard = cardRow.cloneNode(true); //Copies the content of the tasklist items, pretty neat!
    kanbanCard.setAttribute('id', `kanban-${taskList.length - 1}`); //gives new ID to cloned content, allows it to be called separately from the tasklist item.
    kanbanCard.classList.add('kanban-container');
    
    switch (completionStatusDisplay.textContent) {
        case 'Not Started': //Not Started -> 'To do' section
            toDo.appendChild(kanbanCard)
            break;
        case 'Working On It': //Working on it-> 'In Progress' section, note nothing for 'Completed' section as all tasks are not done yet.
        case 'Nearly There!':
            inProgress.appendChild(kanbanCard)
            break;
        default:
            alert("ERROR");
            break;
    };
    //Drag and Drop functionality of the Card
    //Got some help from: https://www.youtube.com/watch?v=OHTudicK7nY

    for (const dragSelector of document.querySelectorAll('.kanban-container')) {
        dragSelector.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', dragSelector.id);
        });
    }

    for ( const dropZone of document.querySelectorAll('.kanban-board')) {

        //To allow drag over the element to other kanban sections
        dropZone.addEventListener( 'dragover', e => {
            e.preventDefault();
            console.log('bruh')
        });

        //To allow card to be dropped over to other kanban sections
        dropZone.addEventListener('drop', e => {
            e.preventDefault();

            const droppedID = e.dataTransfer.getData('text/plain');
            const droppedCard = document.getElementById(droppedID);
            dropZone.appendChild(droppedCard);
        })
    };
};



