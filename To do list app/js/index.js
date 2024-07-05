const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Add event listener for form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim(); // Remove leading/trailing whitespace
    if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = ''; // Clear input after adding task
    }
});

// Function to add a new todo item
function addTodoItem(todoText) {
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `
        <span>${todoText}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);

    // Add event listener for delete button
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        todoItem.remove();
    });

    // Toggle completion status on click
    todoItem.addEventListener('click', function() {
        todoItem.classList.toggle('complete');
    });
}
