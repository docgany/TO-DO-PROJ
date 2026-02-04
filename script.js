/*Add a new function to your ToDos app that initially loads ToDos data from an API.
    Workflow for upgraded To-Do APP
    - Loads tasks from localStorage on page load
    - If empty/missing, fetches 5 todos from JSONPlaceholder using Axios.
    - Saves them to localStorage.
    - Renders them in UI
    - Let's users add new tasks.*/


//Global variables
const progressText = document.getElementById("progress-text");
const barFill = document.getElementById("bar-fill");
let tasks = [];


function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = `${completed}/${total}`;
    barFill.style.width = total ? `${(completed / total) * 100}%` : "0%";
}

//Function to display todos on UI
function renderTasks() {
    const listItems = document.getElementById("list-items");
    listItems.innerHTML = "";//clear old content

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


//function to fetch todos from API and save to localStorage

async function fetchAndStoreTodos() {
    try {
        //make GET response with Axios
        await axios.get("https://jsonplaceholder.typicode.com/todos");
        //Store only 5 todos and map to needed fields.
        const cleanedTodos = response.data.slice(0, 5).map(todo => ({
            id: todo.id,
            input: todo.title,
            completed: todo.completed
        }));
        //Save to localStorage as a string
        localStorage.setItem("tasks", JSON.stringify(cleanedTodos));
        //update our in-memory array
        tasks = cleanedTodos;
        //Display on the ui page
        renderTasks();
    } catch (error) {
        alert("Error fetching todos:", error);
        return [];
    }
}


//Function to load todos from localStorage if they exist
function loadTodosFromStorage() {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored && Array.isArray(stored) && stored.length > 0) {
        tasks = stored;
        renderTasks();
    } else {
        //If nothing in storage, fetch from API
        fetchAndStoreTodos();
    }
}


//Function for adding tasks to array through user inputs.
function addTask() {
    const inputBox = document.getElementById("input-box");
    if (!inputBox.value) {
        alert("Enter a task");
        return;
    }

    tasks = loadTodosFromStorage();

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

//Run when the page load
window.addEventListener("DOMContentLoaded", loadTodosFromStorage);