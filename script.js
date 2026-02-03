/*Add a new function to your ToDos app that initially loads ToDos data from an API.
    Workflow for upgraded To-Do APP
    - Loads tasks from localStorage on page load
    - If empty/missing, fetches 5 todos from JSONPlaceholder using Axios.
    - Saves them to localStorage.
    - Renders them in UI
    - Let's users add new tasks.*/



const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");
let tasks = [];


function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = `${completed}/${total}`;
    barFill.style.width = total ? `${(completed / total) * 100}%` : "0%";
}

async function loadTasks() {
    let stored = JSON.parse(localStorage.getItem("tasks")) || [];
    //If nothing in storage, fetch from API
    if (stored.length === 0) {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            const firstFive = response.data.slice(0, 5).map(todo => ({
                id: todo.id,
                input: todo.title,
                completed: todo.completed
            }));
            localStorage.setItem("tasks", JSON.stringify(firstFive));
            stored = firstFive; //update stored after saving.
            console.log("Fetched from API:", firstFive);
        } catch (error) {
            console.error("Something went wrong:", error);
        }  
    } else {
        console.log("Loaded from localStorage:", stored);
    }
    //Always update global tasks
    tasks = stored;

    //Now render
    renderTasks();
}


function renderTasks() {
    const listItems = document.getElementById("list-items");
    listItems.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
         <label><input type="checkbox" ${task.completed ? "checked" : ""}>
         <span>${task.input}</span></label>
         <div class="btn-grp">
         <button class="edit-btn">✏️</button>
         <button class="delete-btn">🗑️</button>
         </div>
       
        `;

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        const taskSpan = li.querySelector("label span");

        taskSpan.textContent = task.input;
        if (task.completed) {
            taskSpan.classList.add("completed");
        }
       

        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        deleteBtn.onclick = () => {
            /*const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);*/
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        };

        editBtn.onclick = () => {
            const editInput = prompt("Edit task:", task.input);
            if (editInput !== null) {
                task.input = editInput.trim();
                task.completed = false;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
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

    const newTask = {
        id: Math.floor(Math.random() * 10000),
        input: inputBox.value.trim(),
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    inputBox.value = "";
}

const inputBox = document.getElementById("input-box");

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

window.addEventListener("DOMContentLoaded", loadTasks);