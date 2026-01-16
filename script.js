/*Add a new function to your ToDos app that initially loads ToDos data from an API.*/



const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function updateProgress() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = `${completed}/${total}`;
    barFill.style.width = total ? `${(completed / total) * 100}%` : "0%";
}

function loadTasks() {
    const listItems = document.getElementById("list-items");
    listItems.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
         <label><input type="checkbox" ${task.completed ? "checked" : ""}>
         <span>${task.input}</span></label>
         <span class="edit-btn btn">✏️</span>
         <span class="delete-btn btn">🗑️</span>
        `;

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        const taskSpan = li.querySelector("label span");

        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.classList.toggle("completed", task.completed);
            updateProgress();
        };


        deleteBtn.onclick = () => {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        };

        editBtn.onclick = () => {
            const editInput = prompt("Edit task:", task.input);
            if (editInput !== null) {
                task.input = editInput.trim();
                task.completed = false;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                loadTasks();
            }
        };
        listItems.appendChild(li);
    });
    updateProgress();
}

function addTask() {
    const inputBox = document.getElementById("input-box");
    if (!inputBox.value) {
        alert("Enter a task");
        return;
    }

    const input = inputBox.value.trim();

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

window.addEventListener("DOMContentLoaded", loadTasks);