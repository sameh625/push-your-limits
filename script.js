let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let ulEle = document.querySelector("ul");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  ulEle.innerHTML = ""; 
  tasks.forEach((task,index) => {
    let li = document.createElement("li");
    li.className = "task";
    li.dataset.index = index;
    li.innerHTML = `
      <input type="checkbox" class="task-check" ${task.done ? "checked" : ""}/>
      <span class="task-text ${task.done ? "done" : ""}">${task.title}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
    ulEle.appendChild(li);

    requestAnimationFrame(() => {
      li.classList.add("show");
    });
  });
}

renderTasks();

let add = document.querySelector(".add-button");
let taskTitle = document.querySelector(".task-title");

add.addEventListener("click", () => {
  let val = taskTitle.value.trim();
  if (val) {
    tasks.push({title:val, done: false });
    saveTasks();
    renderTasks();
    taskTitle.value = "";
  } else {
    alert("Adding nothing to the list is so silly!");
  }
});


ulEle.addEventListener("click", (e) => {
  let li = e.target.closest("li");
  if (!li) return;
  let index = li.dataset.index;

  if (e.target.classList.contains("delete")) {
    li.classList.add("remove");
    li.addEventListener("transitionend", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }, { once: true });
  }

  if (e.target.classList.contains("edit")) {
    let text = li.querySelector(".task-text");
    let content = text.textContent;
    let newText = prompt("Edit your task:", content);
    if (newText !== null) {
      newText = newText.trim();
      if (newText) {
        tasks[index].title = newText;
        saveTasks();
        renderTasks();
      } else {
        alert("Good try but it's still silly to have an empty task");
      }
    }
  }

  if(e.target.classList.contains("task-check")){
    tasks[index].done = e.target.checked;
    renderTasks();
    saveTasks();
  }


});

