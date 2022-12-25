const input = document.querySelector("input");
const todosList = document.querySelector(".todos_list");
let todoID = 0;

if (localStorage.getItem("todos")) {
  getTodosFromLocalStorageToDOM();
}

document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    createNewTodo();
    input.value = "";
    setTodosToLocalStorage();
  }
});

function createNewTodo() {
  const todo = document.createElement("p");
  todo.classList.add("todo");
  todo.innerHTML = input.value;
  todosList.appendChild(todo);
  disableTodo(todo);
  removeTodo(todo);
}

function disableTodo(todo) {
  todo.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
      todo.classList.toggle("disable");
    }
    setTodosToLocalStorage();
  });
}

function removeTodo(todo) {
  todo.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todo.remove();
    setTodosToLocalStorage();
  });
}

function setTodosToLocalStorage() {
  const todos = todosList.querySelectorAll(".todo");
  const todosArray = [];
  todos.forEach((todo) => {
    todosArray.push({
      content: todo.innerHTML,
      completed: todo.classList.contains("disable") ? true : false,
    });
  });
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function getTodosFromLocalStorageToDOM() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todoLS) => {
    createNewTodoFromLocalStorage(todoLS);
  });
}

function createNewTodoFromLocalStorage(todoLS) {
  const todo = document.createElement("p");
  todo.classList.add("todo");
  if (todoLS.completed === true) {
    todo.classList.add("disable");
  }
  todo.innerHTML = todoLS.content;
  todosList.appendChild(todo);
  disableTodo(todo);
  removeTodo(todo);
}
