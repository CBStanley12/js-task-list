// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event listener
    form.addEventListener('submit', addTask);
    // Remove task event listener
    taskList.addEventListener('click', removeTask);
}

// Get tasks from localStorage
function getTasks(){
    let tasks;

    // Retrieve tasks from localStorage or declare as an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add a class to li element
        li.className = 'collection-item';
        // Create a text node and append it to li
        li.appendChild(document.createTextNode(task));
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
    })
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

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input value
    taskInput.value = '';

    e.preventDefault();
}

// Add task to localStorage
function storeTaskInLocalStorage(task){
    let tasks;

    // Retrieve tasks from localStorage or declare as an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Push new task to localStorage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // Prompt user to confirm task removal
        if(confirm('Are you sure?')){
            // Remove from task list
            e.target.parentElement.parentElement.remove();
            
            // Remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;

    // Retrieve tasks from localStorage or declare as an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}