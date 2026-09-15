// ===================================
// Assign variables for the form input
// ===================================
let taskNameInput = document.getElementById("taskName");
let priorityLevelInput = document.getElementById("priorityLevel");
let dueDateInput = document.getElementById("dueDate");
let consultantInput = document.getElementById("consultant");
let btnAddNewTask = document.getElementById("btnAddNewTask");
let tasksTableBody = document.getElementById("tasksTableBody");


// =======================================================
// Add Event Listener Function for the Add New Task button
// =======================================================
btnAddNewTask.addEventListener("click", function () {

    // Assign input values to the variables
    let taskCounter;
    let taskName = taskNameInput.value.trim();
    let priorityLevel = priorityLevelInput.value;
    let dueDate = dueDateInput.value;
    let consultant = consultantInput.value;

    // Checking if all the input fields have required information
    if (!taskName || priorityLevel === "default" || !dueDate || consultant === "default") {
        alert("Invalid input. Please complete required fields.");
        // Return will exit the function: will not continue to the next process!
        return;
    }

    // 
    let newTask = { taskCounter: taskCounter, taskName: taskName, priorityLevel: priorityLevel, dueDate: dueDate, consultant: consultant };
    insertFunction(displayTasksTable, 0, newTask);
    console.log(displayTasksTable);

    // Clear form input
    taskCounter = 0;
    taskNameInput.value = "";
    dueDateInput.value = "";
    priorityLevelInput = "default";
    consultantInput = "default";

    // updateDisplay();
});


// ====================================
// Function Update Display of the Table
// ====================================
function updateDisplay() {
    if (!tasksTableBody) return; // If tasksTableBody is null, then do nothing!

    tasksTableBody.innerHTML = "";

    // Updates Table with New Task
    for (let i = 0; i < displayTasksTable.length; i++) {
        let item = displayTasksTable[i];
        let tr = document.createElement("tr");


        // Task Counter
        let tdTaskCounter = document.createElement("td");
        // tdTaskCounter.innerText = item.taskCounter;
        tr.appendChild(tdTaskCounter);

        // Task Name
        let tdTaskName = document.createElement("td");
        tdTaskName.innerText = item.taskName;
        // Appending data to the table row
        tr.appendChild(tdTaskName);

        // Priority Level
        let tdPriorityLevel = document.createElement("td");
        tdPriorityLevel.innerText = item.priorityLevel;
        // Appending data to the table row
        tr.appendChild(tdPriorityLevel);

        // Due Date
        let tdDueDate = document.createElement("td");
        tdDueDate.innerText = item.dueDate;
        // Appending data to the table row
        tr.appendChild(tdDueDate);

        // Consultant
        let tdConsultant = document.createElement("td");
        tdConsultant.innerText = item.consultant;
        // Appending data to the table row
        tr.appendChild(tdConsultant);

        // Actions Buttons
        let tdActions = document.createElement("td");
        let btnDelete = document.createElement("button");
        let btnComplete = document.createElement("button");


        // Delete button
        btnDelete.innerText = "Delete";
        btnDelete.className = "badge-delete";
        btnDelete.setAttribute("data-index", i);
        btnDelete.addEventListener("click", function () {
            deleteAlgoritm(displayTasksTable, i);
            updateDisplay();
        });
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);


        // Mark as Completed Button
        btnComplete.innerText = "Complete";
        btnComplete.className = "badge-complete";
        btnComplete.setAttribute("data-index", i);
        btnComplete.addEventListener("click", function (){
            markCompleteAlgoritm(displayTasksTable, i);
            updateDisplay();
        });
        tdActions.appendChild(btnComplete);
        tr.appendChild(tdActions);


        // Appending row to the table
        tasksTableBody.appendChild(tr);
    }
};


// ============================================================
// Function Insert New Task into Existing Array
// ============================================================
function insertFunction(array, index, value) {
    console.log("insert");
    // Creating new array item index and shifting all elements to the right
    for (let i = array.length; i > index; i--) {
        array[i] = array[i - 1];
        // Adding new value to the array
        array[index] = value;
    }
};



// ============================================================
// Function Insert New Task into Existing Array
// ============================================================
function markCompleteAlgoritm(){
    
}



// Array of Roles
let roles = [
    {
        name: "Alice Johnson",
        role: "Accounts Clerk (Payable)"
    },
    {
        name: "Frank Johnson",
        role: "Administration Assistant"
    },
    {
        name: "Ivy Johnson",
        role: "Brand Coordinator"
    },
    {
        name: "Liam Johnson",
        role: "Call Centre Manager"
    },
    {
        name: "Abby Jones",
        role: "Cyber Security Engineer"
    }
];
console.log(roles);

// Array of the Tasks
let displayTasksTable = [
    {taskName: "Meetting", priorityLevel: "Heigh", dueDate: "18/09/2026", consultant: "Alice Jonhson"},
    {taskName: "Draft of Requirements Report", priorityLevel: "Heigh", dueDate: "28/09/2026", consultant: "Alice Jonhson"},
    {taskName: "Update Headings style", priorityLevel: "Medium", dueDate: "30/09/2026", consultant: "Alice Jonhson"}
];

// Calling Function to display the table
updateDisplay();