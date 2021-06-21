const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = todos.length;

fillLocal();

class Todo {
    constructor() {
        this.text = this.getText();
        this.check = false;
        this.id = id++;
    }
    getText() {
        return prompt("Enter task to do:");
    }
}
//<li>
//<input type="checkbox">
//<button> delete </button>
//<span> Text </span>
//</li>

function newTodo() {
    //get text
    //create Todo()
    const todo = new Todo();
    todos.push(todo);
    render();
}

function render() {
    list.innerHTML = '';
    todos.map(renderTodo).forEach(todo => list.appendChild(todo));
    //update counters
    itemCountSpan.textContent = todos.length;
    uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
    saveLocal();
}

function deleteTodo(id) {
    //find the right todo to delete
    //delete
    todos = todos.filter(todo => todo.id !== id);
    render();
}

function renderTodo(todo) {
    //create li
    //create input checkbox
    //create button
    //create span
    //console.log('todo', todo);
    const li = document.createElement('li');
    li.innerHTML = ` 
    <input type="checkbox" onchange="changeTodo(${todo.id}) " ${todo.check ? "checked" : ""}>
    <button class="deletebutton" onclick="deleteTodo(${todo.id})"> del</button>
    <span class="todo-text">${todo.text} </span>
    `;

    return li;
}

function changeTodo(id) {
    //variant 1  for (let i = 0; i < todos.length; i++) {
    //     if (todos[i].id === id) {
    //         todos[i].check = !todos[i].check;
    //         break;
    //     }
    // }
    // variant 2  todos = todos.map(todo => todo.id == id ? { id: todo.id, text: todo.text, check: !todo.check } : todo);
    todos = todos.map(todo => todo.id == id ? {...todo, check: !todo.check } : todo);
    // console.log("todos", todos);
    uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
    saveLocal();
}

function saveLocal() {
    localStorage.clear();
    localStorage.List = JSON.stringify(todos);
    //Convert a JavaScript object into a string 
}

function fillLocal() {
    if (localStorage.length > 0) {
        todos = JSON.parse(localStorage.List);
        //data becomes a JavaScript object
        render();
    }
}