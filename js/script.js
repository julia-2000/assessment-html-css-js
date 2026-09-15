// =============================================
// 1. Assign variables for the Add New Task Form
// =============================================
let taskNameInput = document.getElementById("taskName");
let priorityLevelInput = document.getElementById("priorityLevel");
let dueDateInput = document.getElementById("dueDate");
let consultantInput = document.getElementById("consultant");
let btnAddNewTask = document.getElementById("btnAddNewTask");
// Reference to the Tasks Table Body
let tasksTableBody = document.getElementById("tasksTableBody");


// =======================================================
// 2. Add Event Listener Function for the Add New Task button
// =======================================================
btnAddNewTask.addEventListener("click", function () {

    // Assign input values to the variables
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
    let newTask = { taskName: taskName, priorityLevel: priorityLevel, dueDate: dueDate, consultant: consultant };
    insertAlgorithm(displayTasksTable, 0, newTask);
    console.log(displayTasksTable);

    // Clear form input
    taskNameInput.value = "";
    dueDateInput.value = "";
    priorityLevelInput = "default";
    consultantInput = "default";

    updateDisplay();
});



/**
 * 3. Function Update Display of the Tasks Table
 * @returns - nothing if task body is null
 */
function updateDisplay() {
    if (!tasksTableBody) return; // If tasksTableBody is null, then do nothing!

    tasksTableBody.innerHTML = "";

    // Updates Table Body with the New Task
    for (let i = 0; i < displayTasksTable.length; i++) {
        let item = displayTasksTable[i];

        // Create table row
        let tr = document.createElement("tr");

        // 1. Task Name
        let tdTaskName = document.createElement("td");
        tdTaskName.innerText = item.taskName;
        // Appending data to the table row
        tr.appendChild(tdTaskName);

        // 2. Priority Level
        let tdPriorityLevel = document.createElement("td");
        tdPriorityLevel.innerText = item.priorityLevel;
        // Appending data to the table row
        tr.appendChild(tdPriorityLevel);

        // 3. Due Date
        let tdDueDate = document.createElement("td");
        tdDueDate.innerText = item.dueDate;
        // Appending data to the table row
        tr.appendChild(tdDueDate);

        // 4. Consultant
        let tdConsultant = document.createElement("td");
        tdConsultant.innerText = item.consultant;
        // Appending data to the table row
        tr.appendChild(tdConsultant);

        // Actions Buttons
        let tdActions = document.createElement("td");
        let btnDelete = document.createElement("button");
        let btnComplete = document.createElement("button");


        // Actions Column - Delete Button
        btnDelete.innerText = "Delete";
        btnDelete.className = "badge-delete";
        btnDelete.setAttribute("data-index", i);
        btnDelete.addEventListener("click", function () {
            deleteAlgorithm(displayTasksTable, i);
            updateDisplay();
        });
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);


        // Actions Column - Mark as Complete Button
        btnComplete.innerText = "Complete";
        btnComplete.className = "badge-complete";
        btnComplete.setAttribute("data-index", i);
        btnComplete.addEventListener("click", function () {
            markCompleteAlgorithm(displayTasksTable, i);

            updateDisplay();
        });
        tdActions.appendChild(btnComplete);
        tr.appendChild(tdActions);


        // Appending row to the table
        tasksTableBody.appendChild(tr);
    }
};


/**
 * 4. Function Insert New Task into Existing Array
 * @param {Array} array - the current array of the tasks
 * @param {number} index - location the new task will be added
 * @param {object} value - task value itself
 */
function insertAlgorithm(array, index, value) {
    // Creating new array item index and shifting all elements to the right
    for (let i = array.length; i > index; i--) {
        array[i] = array[i - 1];
        // Adding new value to the array
        array[index] = value;
    }
};


/**
 * 
 * @param {Array} array - the selected array of the tasks
 * @param {number} index - the index of the item to be deleted
 */
function deleteAlgorithm(array, index) {
    // Shifting elements to the left 
    for (let i = index; i < array.length; i++) {
        array[i] = array[i + 1];
    }
    array.length--;
};


// Query - what looking for
/**
 * 
 * @param {*} array 
 * @param {*} query 
 * @returns 
 */
function sequentialSearch(array, query) {
    // return array.includes(query);
    for (let i = 0; i < array.length; i++) {
        if (array[i] === query) {
            return query;
        }
    }
};


// ============================================================
// Function Insert New Task into Existing Array
// ============================================================
function markCompleteAlgorithm() {

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

// Prefilled Array of Tasks
let displayTasksTable = [
    { taskName: "Meetting", priorityLevel: "Heigh", dueDate: "18/09/2026", consultant: "Alice Jonhson" },
    { taskName: "Draft of Requirements Report", priorityLevel: "Heigh", dueDate: "28/09/2026", consultant: "Alice Jonhson" },
    { taskName: "Update Headings style", priorityLevel: "Medium", dueDate: "30/09/2026", consultant: "Alice Jonhson" }
];

// Initial Call on Page Load
updateDisplay();