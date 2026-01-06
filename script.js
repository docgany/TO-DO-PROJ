const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");

window.addEventListener("DOMContentLoaded", loadTasks);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

localStorage.seItem("tasks", JSON.stringify(tasks));

function addTask() {
    const inputBox = document.getElementById("input-box");
    if (!inputBox.value) {
        alert("Enter a task");
        return;
    }

    const input = inputBox.value.trim();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        id: Math.floor(Math.random() * 10000),
        input: input,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    inputBox.value = "";
}


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listItems = document.getElementById("list-items");
    listItems.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
         <label><input type="checkbox" ${task.completed ? "checked" : ""}>
         <span>${task.input}</span></label>
         <span class="edit-btn">✏️</span>
         <span class="delete-btn>🗑️</span>
        `;

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        const taskSpan = li.querySelector("label span");

        checkbox.onchange = () => {
            checkbox.checked = true;
            li.classList.toggle("completed", task.completed);
        }


        deleteBtn.addEventListener("click", function deleteTask(id) {
            const index =  function getTaskIndex(id) {
                return tasks.findIndex(t => t.id === id);
            }
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks)) || [];
            li.remove;
            updateProgress();
            loadTasks();
        });

        editBtn.addEventListener("click", function editTask() {
            const editInput = prompt("Edit task:", task.input);
            if (editInput !== null) {
                task.input = editInput.trim();
                taskSpan.textContent = task.input;
                task.completed = false;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                updateProgress();
                loadTasks();
            }
        });
        listItems.appendChild(li);
    })
}

loadTasks();

function updateProgress() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = `${completed}/${total}`;
    barFill.style.width = total ? `${(completed / total) * 100}%` : "0%";
}
updateProgress();