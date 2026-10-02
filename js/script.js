// ===========================================================
// 1. Get HTML elements
// ===========================================================
// Form fields
let taskNameInput = document.getElementById("taskName");
let priorityLevelInput = document.getElementById("priorityLevel");
let dueDateInput = document.getElementById("dueDate");
let consultantInput = document.getElementById("consultant");

// Buttons and search elements
let btnAddNewTask = document.getElementById("btnAddNewTask");
let searchInput = document.getElementById("search");
let iconSearch = document.getElementById("iconSearch");
let message = document.getElementById("message");

// Table body where task rows will be displayed
let tasksTableBody = document.getElementById("tasksTableBody");


// ===========================================================
// 2. Add Event Listener for the Add New Task button
// ===========================================================
btnAddNewTask.addEventListener("click", function () {

    // Get values entered by the user
    let taskName = taskNameInput.value.trim();
    let priorityLevel = priorityLevelInput.value;
    let dueDate = dueDateInput.value;
    let consultant = consultantInput.value;

    // Check that all required fields have been completed
    if (!taskName || priorityLevel === "default" || !dueDate || consultant === "default") {
        // Send Alert with the warning message
        alert("Invalid input. Please complete required fields.");
        // Function will stop if any input is invalid
        return;
    }

    // Create a new task object
    let newTask = { taskName: taskName, priorityLevel: priorityLevel, dueDate: dueDate, consultant: consultant, completed: false };
    // Add the new task at the start of the tasks array
    insertNewTask(displayTasksTable, 0, newTask);

    // Clear input fields after the new task is added
    taskNameInput.value = "";
    dueDateInput.value = "";
    priorityLevelInput.value = "default";
    consultantInput.value = "default";

    // Refresh the tasks table whith additional a new task 
    updateDisplay();
});



// ==================================================================
// 3. Add Event Listener for the Search of a Task by using Task Name
// ==================================================================
iconSearch.addEventListener("click", function(){

    // Get the search value of user input and remove spaces
    let search = searchInput.value.trim();
    // Clear any previous messages
    message.innerHTML = "";
    
    // Check if the user entered search criteria
    if (!search) {
        // Create warning message
        let p = document.createElement("p");
        p.innerText = "Please specify search criteria!";

        // Display message
        message.appendChild(p);
        // Stop the function: will not continue to the next process!
        return;
    }

    // Search the tasks array by task name
    // The function returns the index of task if found, otherwise -1
    let result = searchTask(displayTasksTable, search);

    // Check if no task was found 
    if (result === -1){
        // Create error message
        let p = document.createElement("p");
        p.innerText = "Task not found.";

        // Display error message
        message.appendChild(p);
        // Stop function: will not continue to the next process!
        return;
    }
    // Display result of the function in consol
    // console.log("Task found: ", result);
    // Clear current tasks table content
    tasksTableBody.innerHTML="";

    // Display only the task that was found
    tasksTableBody.appendChild(createTaskRow(result));
});


// ===========================================================
// 4. Update Display of the Tasks Table
// ===========================================================
/**
 * Rebuilds the Tasks Table using all tasks which currently stored in displayTasksTable.
 * 
 * @returns - returns nothing if task body is not exists
 */
function updateDisplay() {
    // If the tasksTableBody is null, then function is stop
    if (!tasksTableBody) return; 

    // Clear current rows to prevent duplicates
    tasksTableBody.innerHTML = "";

    // Iterate through array of tasks and display each of task
    for (let i = 0; i < displayTasksTable.length; i++) {
       tasksTableBody.appendChild(createTaskRow(i));
    }
};


// ===========================================================
// 5. Create One Task Row
// ===========================================================
/**
 * Helper Function which generate a Single Table Row of selected Task.
 * 
 * @param {number} index - index of the task in displayTasksTable
 * @returns {table row} - generated task row
 */
function createTaskRow(index){
    // Get selected task object 
    let item = displayTasksTable[index];
    // Create a new table row
    let tr = document.createElement("tr");

    // If the task has been completed is true, then apply specified styling to the selected row
    if (item.completed === true){
        tr.style.textDecoration = "line-through";
        tr.style.color = "green";
    }


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
    // Get consultant name by calling findConsultant() function 
    // which is search for the consultant name by using consultant role
    let consultantName = findConsultant(roles, item.consultant);
    tdConsultant.innerText = consultantName;
    // Appending data to the table row
    tr.appendChild(tdConsultant);

    // ===========================================
    // Actions
    let tdActions = document.createElement("td");
    // Create Complete and Delete buttons
    let btnDelete = document.createElement("button");
    let btnComplete = document.createElement("button");

    // Delete Button
    btnDelete.innerText = "Delete";
    btnDelete.className = "badge-delete";
    btnDelete.setAttribute("data-index", index);
    // Delete the selected task when button is clicked
    btnDelete.addEventListener("click", function () {
        // Remove specified task from array of tasks
        deleteTask(displayTasksTable, index);
        // Refresh table after deletion
        updateDisplay();
    });
    // Add Delete button to the Actions cell
    tdActions.appendChild(btnDelete);

    // Complete Button
    btnComplete.innerText = "Complete";
    btnComplete.className = "badge-complete";
    btnComplete.setAttribute("data-index", index);
    // Mark selected task as completed when button is clicked
    btnComplete.addEventListener("click", function () {
        // If staus is false, change completed status to true
        if (item.completed === false){
            item.completed = true;
        }
        // Refresh the table using the new status
        updateDisplay();
    });
    // Add Complete button to the Actions cell
    tdActions.appendChild(btnComplete);

    // Add Actions cell to the row
    tr.appendChild(tdActions);
    // ================================================

    // Return completed table row
    return tr;
}


// ===========================================================
// 6. Insert New Task
// ===========================================================
/**
 * Insert Function which add a New Task into Existing Array at the selected index.
 * 
 * @param {Array} array - current array of the tasks
 * @param {number} index - position at which the new task will be added
 * @param {object} value - new task object itself
 */
function insertNewTask(array, index, value) {
// Create new array item index and shift all elements to the right
for (let i = array.length; i > index; i--) {
        array[i] = array[i - 1];
    }
    // Add new task at the selected index
    array[index] = value;
};

// ===========================================================
// 7. Delete Task
// ===========================================================
/**
 * Delete Function - delete specified task from selected index.
 * 
 * @param {Array} array - selected tasks array
 * @param {number} index - index of the item to be deleted
 */
function deleteTask(array, index) {
    // Shift elements to the left 
    for (let i = index; i < array.length-1; i++) {
        array[i] = array[i + 1];
    }
    // Remove the last element of the array
    array.length--;
};


// ===========================================================
// 8. Sequential Search
// ===========================================================
/**
 * Function to perform sequential search on the task by using task name.
 * 
 * @param {Array} array - selected tasks array
 * @param {string} query - task name selected by user
 * @returns {number} Index of matching task, or -1 if task not found
 */
function searchTask(array, query) {
    // Loop through each task in the array
    for (let i = 0; i < array.length; i++) {
        // Check if task names match with user search
        if (array[i].taskName.toLowerCase() === query.toLowerCase()) {
            return i;
        }
    }
    // Return -1 if no task match found
    return -1;
};


// ===========================================================
// 9. Binary Search for Consultant
// ===========================================================
/**
 * Perform binary search to find a Consultant Role and return consultant name.
 * 
 * @param {Array} array - sorted array of consultant roles
 * @param {string} target - consultant role to search for
 * @returns {string} - consultant name or "Consultant not found" message
 */
function findConsultant(array, target) {
    // Check if user provided role
    if (target === "") return "Consultant is not found";

    // Set the first position of the search
    let left = 0;
    // Set the last position of the search
    let right = array.length - 1;
    // Create counter
    let counter = 0;
    // Trim search value and convert to lower case
    target = target.trim().toLowerCase();

    // Continue while loop till there are elements at the left
    while (left <= right) {
        counter++;

        // Set middle pointer
        const middle = Math.floor((left + right) / 2);

        // Get the role stored at the middle position, trim spaces, convert to lower case
        const role = array[middle].role.trim().toLowerCase();
        

        // Check if the middle role matches the target role?
        if (role === target) {
            // Return consultant name
            return array[middle].name;
        }

        // If the middle role comes before the target alphabetically, search the right half of the array
        if (role < target)
            left = middle + 1;
        // Else search the left half of the array
        else
            right = middle - 1;
    }
    // Return message if no role was found
    return "Consultant is not found";
};


// ===========================================================
// 10. Consultant Roles
// ===========================================================
// This array must remain sorted alphabetically by role
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
        name: "Mia Johnson",
        role: "Call Centre Operator"
    },
    {
        name: "Abby Jones",
        role: "Cyber Security Engineer"
    },
    {
        name: "Ben Jones",
        role: "Database Development Team Leader"
    },
    {
        name: "Clara Jones",
        role: "Digital Media Coordinator"
    }
];


// ===========================================================
// 11. Prefilled Tasks
// ===========================================================
let displayTasksTable = [
    { taskName: "Meeting", priorityLevel: "High", dueDate: "2026-11-01", consultant: "Accounts Clerk (Payable)", completed: false },
    { taskName: "Draft of Requirements Report", priorityLevel: "High", dueDate: "2026-10-24", consultant: "Administration Assistant", completed: false },
    { taskName: "Update Headings style", priorityLevel: "Medium", dueDate: "2026-10-04", consultant: "Brand Coordinator", completed: false }
];

// Initial Call on the Page Load
updateDisplay();