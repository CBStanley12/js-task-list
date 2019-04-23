// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // Add task event listener
    form.addEventListener('submit', addTask);
    // Remove task event listener
    taskList.addEventListener('click', removeTask);
}

// Add a task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class to li element
    li.className = 'collection-item';
    // Create a text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a new link element
    const link = document.createElement('a');
    // Add a class to link element
    link.className = 'delete-item secondary-content';
    // Add icon to link element
    link.innerHTML = `<i class="fa fa-remove"></li>`;
    // Append the link to li element
    li.appendChild(link);

    // Append li element to ul
    taskList.appendChild(li);

    // Clear the input value
    taskInput.value = '';

    e.preventDefault();
}

// Remove a task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // Prompt user to confirm task removal
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}