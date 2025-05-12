const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-button');

// Add event listeners
addButton.onclick = addTask;

inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Add task function
function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('You must write something!');
        return;
    }

    // Check for duplicate task
    const isDuplicate = [...listContainer.getElementsByTagName('li')]
        .some(item => item.textContent.replace('×', '').trim() === taskText);
    if (isDuplicate) {
        alert('Task already exists!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the delete button
    const span = document.createElement('span');
    span.innerHTML = '&times;';
    span.onclick = function (e) {
        e.stopPropagation(); // Prevent toggling checked on delete
        li.remove();
        saveData();
    };

    // Toggle the 'checked' class on task click
    li.onclick = function () {
        li.classList.toggle('checked');
        saveData();
    };

    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = '';

    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

// Load data from localStorage
function showList() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    addEventListenersToListItems();
}

// Add event listeners to list items
function addEventListenersToListItems() {
    const items = listContainer.querySelectorAll('li');
    items.forEach(item => {
        item.onclick = function () {
            item.classList.toggle('checked');
            saveData();
        };
        const span = item.querySelector('span');
        if (span) {
            span.onclick = function (e) {
                e.stopPropagation();
                item.remove();
                saveData();
            };
        }
    });
}

// Show the tasks on page load
showList();
