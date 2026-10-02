// =============================================
// 1. Assign variables for the Add New Task Form
// =============================================
let taskNameInput = document.getElementById("taskName");
let priorityLevelInput = document.getElementById("priorityLevel");
let dueDateInput = document.getElementById("dueDate");
let consultantInput = document.getElementById("consultant");
let btnAddNewTask = document.getElementById("btnAddNewTask");
let searchInput =  document.getElementById("search");
let iconSearch = document.getElementById("iconSearch");
let message = document.getElementById("message");
// Reference to the Tasks Table Body
let tasksTableBody = document.getElementById("tasksTableBody");


// ===========================================================
// 2. Add Event Listener Function for the Add New Task button
// ===========================================================
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

    // Create New Task object
    let newTask = { taskName: taskName, priorityLevel: priorityLevel, dueDate: dueDate, consultant: consultant, completed: false };
    // Insert New Task at the top of the Array at index 0
    insertAlgorithm(displayTasksTable, 0, newTask);
    // console.log(displayTasksTable);

    // Clear input fields after the New Task added to the table
    taskNameInput.value = "";
    dueDateInput.value = "";
    priorityLevelInput.value = "default";
    consultantInput.value = "default";

    // Update table whith additional New Task 
    updateDisplay();
});



// ===========================================================
// 3. Add Event Listener for the Search 
// ===========================================================
iconSearch.addEventListener("click", function(){

    // Get the text enetred into the search and trim spaces
    let search = searchInput.value.trim();
    // Clear previous messages
    message.innerHTML = "";
    
    // Check if the input text has been entered into search box
    if (!search) {
        // Create a new paragraph for the warning message
        let p = document.createElement("p");
        // Add text for the message
        p.innerText = "Please specify search criteria!";

        // Display message on the page
        message.appendChild(p);
        // Return will exit the function: will not continue to the next process!
        return;
    }

    // Call search function Tasks Table Array and task name
    // Function returns index of the matching task or -1 which means that task was not found
    let result = sequentialSearch(displayTasksTable, search);

    // Check if task was not found 
    if (result === -1){
        // Create a new paragraph for error message
        let p = document.createElement("p");
        p.innerText = "Task not found.";
        message.appendChild(p);
        // Return will exit the function: will not continue to the next process!
        return;
    }
    console.log("Task found: ", result);
    // Clear current table content
    tasksTableBody.innerHTML="";

    // Display only the task that was found
    tasksTableBody.appendChild(createTaskRow(result));

});



/**
 * Function which is updating display of the table of Tasks
 * @returns - nothing if task body is null
 */
function updateDisplay() {
    // If tasksTableBody is null, then do nothing!
    if (!tasksTableBody) return; 

    // Clear current contents to prevent duplicates
    tasksTableBody.innerHTML = "";

    // Iterate through cart array and append generated DOM elements
    for (let i = 0; i < displayTasksTable.length; i++) {
       tasksTableBody.appendChild(createTaskRow(i));
    }
};


// ======================================================
/**
 * Helper Function to Generate a Single Table Row Node
 * @param {number} index - index of the task in displayTasksTable
 * @returns {table row} - table row
 */
function createTaskRow(index){
    // Get selected task 
    let item = displayTasksTable[index];
    // Create table row
    let tr = document.createElement("tr");

    // Check if table row has status Completed
    if (item.completed === true){
        // Change style of selected row
        tr.style.textDecoration = "line-through";
        tr.style.color = "green";
    }
    console.log("Item: ", item);

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
    let consultantName = findConsultant(roles, item.consultant);
    tdConsultant.innerText = consultantName;
    // Appending data to the table row
    tr.appendChild(tdConsultant);

    // Actions Buttons
    let tdActions = document.createElement("td");
    let btnDelete = document.createElement("button");
    let btnComplete = document.createElement("button");


    // Actions Column - Delete Button
    btnDelete.innerText = "Delete";
    btnDelete.className = "badge-delete";
    btnDelete.setAttribute("data-index", index);
    // On the press of Delete button - remove task
    btnDelete.addEventListener("click", function () {
        deleteAlgorithm(displayTasksTable, index);
        // Update table
        updateDisplay();
    });
    // Adding Delete Button to the Actions cell
    tdActions.appendChild(btnDelete);
    // Appending data to the table row
    tr.appendChild(tdActions);


    // Actions Column - Mark as Complete Button
    btnComplete.innerText = "Complete";
    btnComplete.className = "badge-complete";
    btnComplete.setAttribute("data-index", index);
    // On the click of the Complete Button - add striketrough line on the selected task
    btnComplete.addEventListener("click", function () {
        // If staus is false, 
        // then switch item completed staus to true and change style
        if (item.completed === false){
            item.completed = true;
        }

        // Rebuild the table using the new status
        updateDisplay();
    });
    // Adding Complete Button to the Actions cell
    tdActions.appendChild(btnComplete);
    // Appending data to the table row
    tr.appendChild(tdActions);

    // Return table row
    return tr;
}


// ======================================================
/**
 * Function Insert New Task into Existing Array
 * @param {Array} array - the current array of the tasks
 * @param {number} index - location the new task will be added
 * @param {object} value - task value itself
 */
function insertAlgorithm(array, index, value) {
// Creating new array item index and shifting all elements to the right
for (let i = array.length; i > index; i--) {
        array[i] = array[i - 1];
    }
    // Adding new task to the array of the selected index
    array[index] = value;
};


/**
 * Function to Delete specified task
 * @param {Array} array - the selected array of the tasks
 * @param {number} index - the index of the item to be deleted
 */
function deleteAlgorithm(array, index) {
    // Shifting elements to the left 
    for (let i = index; i < array.length-1; i++) {
        array[i] = array[i + 1];
    }
    // Removing the last element of the array
    array.length--;
};


/**
 * Function to perform sequential search on the task by using task name.
 * @param {Array} array - the selected array of tasks
 * @param {string} query - task name
 * @returns 
 */
function sequentialSearch(array, query) {
    // return array.includes(query);
    for (let i = 0; i < array.length; i++) {
        if (array[i].taskName.toLowerCase() === query.toLowerCase()) {
            return i;
        }
    }
    return -1;
};


/**
 * Perform binary search on the Consultant roles array 
 * Find match of Consultant role and retrieve consultant name.
 * 
 * @param {Array} arr - sorted array of Consultant roles
 * @param {string} target - Consultant role being searched for
 * @returns {string} - name of consultant or "Consultant not found" message
 */
function findConsultant(array, target) {
    if (target === "") return "Consultant is not found";

    let left = 0;
    let right = array.length - 1;
    let counter = 0;

    while (left <= right) {
        counter++;

        // This is middle pointer element for  check
        const middle = Math.floor((left + right) / 2);
        const role = array[middle].role.trim().toLowerCase();
        target = target.trim().toLowerCase();

        console.log("Role ", role);
        console.log("Target ", target);
        

        // if middle number is equal of the target element?
        if (role === target) {
            return array[middle].name;
        }

        // If the searching number is less then target element, 
        // then we checking the middle element pointer
        if (role < target)
            left = middle + 1;
        else
            right = middle - 1;
    }
    return "Consultant is not found";
};


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


// Prefilled Array of Tasks
let displayTasksTable = [
    { taskName: "Meeting", priorityLevel: "Heigh", dueDate: "2026-11-01", consultant: "Accounts Clerk (Payable)", completed: false },
    { taskName: "Draft of Requirements Report", priorityLevel: "High", dueDate: "2026-10-24", consultant: "Administration Assistant", completed: false },
    { taskName: "Update Headings style", priorityLevel: "Medium", dueDate: "2026-10-04", consultant: "Brand Coordinator", completed: false }
];

// Initial Call on Page Load
updateDisplay();