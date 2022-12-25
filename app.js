const input = document.querySelector("input");
const todosList = document.querySelector(".todos_list");

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

input.addEventListener("blur", () => {
  if (input.value != "") {
    createNewTodo();
    input.value = "";
    setTodosToLocalStorage();
  }
});

function createNewTodo() {
  const todo = document.createElement("div");
  todo.classList.add("todo");
  const todoContent = document.createElement("p");
  todoContent.innerHTML = input.value;
  const closeIcone = document.createElement("i");
  closeIcone.classList.add("fa-solid");
  closeIcone.classList.add("fa-xmark");
  closeIcone.classList.add("close");
  todo.append(todoContent);
  todo.append(closeIcone);
  todosList.appendChild(todo);
  disableTodo(todo);
  removeTodo(todo);
  deleteTodoWithCloseIcone(closeIcone);
}

function disableTodo(todo) {
  todo.addEventListener("mouseup", (e) => {
    if (e.target.classList.contains("close")) {
      e.target.closest(".todo").remove();
    } else {
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

function deleteTodoWithCloseIcone(closeIcone) {
  closeIcone.addEventListener("click", () => {
    closeIcone.closest(".todo").remove();
  });
}

function setTodosToLocalStorage() {
  const todos = document.querySelectorAll(".todo p");
  const todosArray = [];
  todos.forEach((todo) => {
    todosArray.push({
      content: todo.innerHTML,
      completed: todo.parentElement.classList.contains("disable")
        ? true
        : false,
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
  const todo = document.createElement("div");
  todo.classList.add("todo");
  const todoContent = document.createElement("p");
  todoContent.innerHTML = todoLS.content;
  const closeIcone = document.createElement("i");
  closeIcone.classList.add("fa-solid");
  closeIcone.classList.add("fa-xmark");
  closeIcone.classList.add("close");
  todo.append(todoContent);
  todo.append(closeIcone);
  if (todoLS.completed === true) {
    todo.classList.add("disable");
  }
  todosList.appendChild(todo);
  disableTodo(todo);
  removeTodo(todo);
}
