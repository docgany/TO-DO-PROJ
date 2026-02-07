📄 README.md
# Enhanced ToDo App (Axios + localStorage)

A polished, interactive ToDo application built with vanilla JavaScript.  
This version includes API bootstrapping, animations, a progress bar, and robust UI feedback.

---

## 🚀 Features

### **1. API Bootstrapping with Axios**
- On first load, the app checks localStorage.
- If empty, it fetches **5 todos** from the JSONPlaceholder API using **Axios**.
- If not empty, it loads the user's saved todos.

### **2. Loading Spinner**
- A clean CSS spinner appears while fetching initial todos.

### **3. Error UI**
- If the API request fails, a styled error box appears with a helpful message.

### **4. Smooth Animations**
- Todos fade in with a slide animation for a polished feel.

### **5. Progress Bar**
- Shows the percentage of completed tasks.
- Updates automatically whenever todos change.



* Project Structure
TO-DO-APP/
│
├── index.html        # Main HTML structure
├── stylesheet.css    # Styling and layout
└── script.js         # App logic (CRUD + localStorage)

## 📦 Dependencies
- **Axios** (via CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

## 🛠 Technologies Used ##
• 	HTML5
• 	CSS3 (animations, transitions, UI components)
• 	JavaScript (DOM, events, localStorage)
• 	Axios (HTTP client)

## 🧠 How It Works

### **Initialization Flow**
1. Load todos from localStorage.
2. If empty:
   - Show spinner
   - Fetch 5 todos from API
   - Save to localStorage
3. Render todos
4. Update progress bar

### **User Interactions**
- Add todos via input or Enter key.
- Select todos by clicking.
- Delete selected todos with Delete key.
- Edit todos by double‑clicking.
- Completed tasks update the progress bar.


* How to Run the Project
- Clone the repository:
git clone https://github.com/docgany/TO-DO-PROJ.git
- Open the project folder:
cd TO-DO-PROJ
- Open index.html in your browser.

* Future Improvements
- Inline Editing
     - Double‑click any todo text to edit it.
     - Edits save automatically on blur.
- Keyboard Shortcuts
     - Enter → Add a new todo  
     - Delete → Remove the currently selected todo  
- Click a todo to select it.
- Add animations for adding/removing tasks
- Add categories or tags
- Add dark/light mode
- Add drag‑and‑drop task reordering

* Contributions
This is a learning project, but suggestions, improvements, and ideas are always welcome.

* License
This project is open‑source and available under the MIT License.

## 🧩 **App Architecture Diagram**

Below is a clean, conceptual diagram you can paste into documentation or slides.  
It shows the flow of data and user interactions clearly.

                   ┌──────────────────────────┐
                   │        index.html         │
                   │  - Input field            │
                   │  - Todo list container    │
                   │  - Spinner                │
                   │  - Error box              │
                   │  - Progress bar           │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │         app.js            │
                   ├──────────────────────────┤
                   │ fetchInitialTasks()                    │
                   │  ├─ load localStorage     │
                   │  ├─ if empty → fetch API  │
                   │  └─ renderTodos()         │
                   │                           │
                   │ renderTodos()             │
                   │  ├─ build <li> items      │
                   │  ├─ apply animations      │
                   │  └─ updateProgressBar()   │
                   │                           │
                   │ addTodo()                 │
                   │  ├─ push to array         │
                   │  ├─ save to storage       │
                   │  └─ renderTodos()         │
                   │                           │
                   │ Inline Editing             │
                   │  ├─ dblclick → edit       │
                   │  └─ blur → save           │
                   │                           │
                   │ Keyboard Shortcuts         │
                   │  ├─ Enter → add           │
                   │  └─ Delete → remove       │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │      localStorage         │
                   │  - Persist todos          │
                   │  - Loaded on startup      │
                   └──────────────────────────┘

                                 ▲
                                 │
                                 ▼

                   ┌──────────────────────────┐
                   │ JSONPlaceholder API       │
                   │  - Fetch 5 todos          │
                   │  - Axios GET request      │
                   └──────────────────────────┘

