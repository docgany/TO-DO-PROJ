/*Add a new function to your ToDos app that initially loads ToDos data from an API.
✅ Step - by - step logic
* On page load:
•	Read todos from localStorage.
•	If it’s empty or missing:
o	Fetch 5 todos from JSONPlaceholder using Axios.
    o	Store them in localStorage.
•	Render whatever is in localStorage.

Two possible sources of data, which are:
1. localStorage → your saved tasks
2. Axios GET request → tasks from the API ()

✔ Clear separation of responsibilities
Each function does one thing: 
•	Load
•	Save
•	Fetch
•	Render
•	Add
*/

//Global variables
const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");
const listItems = document.getElementById("list-items");


//Saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Save tasks to localStorage
function saveToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Render tasks to the page/UI
function renderTasks() {
    listItems.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);

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

        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            saveToLocalStorage(tasks);
            updateProgress();
            renderTasks();
        };

        taskSpan.textContent = task.title;
        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        deleteBtn.onclick = () => {
            /*const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);*/
            tasks = tasks.filter(t => t.id !== task.id);
            saveToLocalStorage(tasks);
            renderTasks();
        };

        editBtn.onclick = () => {
            const editInput = prompt("Edit task:", task.title);
            if (editInput !== null) {
                task.title = editInput.trim();
                task.completed = false;
                saveToLocalStorage(tasks);
                renderTasks();
            }
        };
        listItems.appendChild(li);
    });
    updateProgress();
}

//Fetch 5 tasks from API using Axios
async function fetchInitialTasks() {
    if (tasks.length === 0) {
        console.log("localStorage empty- fetching initial tasks...");
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            const firstFive = response.data.slice(0, 5).map(todo => ({
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }));
            tasks = firstFive;
            saveToLocalStorage(tasks)
           
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
    renderTasks();
}

//function for progress bar
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = `${completed}/${total}`;
    barFill.style.width = total ? `${(completed / total) * 100}%` : "0%";
}


//Function for adding new tasks through user inputs.
function addTask() {
    const inputBox = document.getElementById("input-box");
    if (!inputBox.value) {
        alert("Enter a task");
        return;
    }

    const newTask = {
        id: Math.floor(Math.random() * 10000),
        title: inputBox.value.trim(),
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage(tasks)
    renderTasks();
    inputBox.value = "";
}

const inputBox = document.getElementById("input-box");

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

//Event Listeners
window.addEventListener("DOMContentLoaded", fetchInitialTasks);