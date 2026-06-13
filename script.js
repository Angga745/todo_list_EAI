const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const form = document.querySelector(".input-area");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ==========================
   LOAD TASKS
========================== */

window.addEventListener("load", () => {
    tasks.forEach(task => createTask(task.text, task.completed));
    updateTaskCount();
});

/* ==========================
   ADD TASK
========================== */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText === ""){
       Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: "Task tidak boleh kosong!"
    });
        return;
    }

    createTask(taskText, false);

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    updateTaskCount();

    taskInput.value = "";
});

/* ==========================
   CREATE TASK
========================== */

function createTask(text, completed){

    const li = document.createElement("li");
    li.classList.add("task-added");

    if(completed){
        li.classList.add("completed");
    }

    li.innerHTML = `
    <span class="task-text">${text}</span>

    <div class="task-buttons">

        <button class="complete-btn" title="Selesai">
            <i class="fa-solid fa-check"></i>
        </button>

        <button class="delete-btn" title="Hapus">
            <i class="fa-solid fa-trash"></i>
        </button>

    </div>
`;

    taskList.appendChild(li);

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    /* COMPLETE TASK */

    completeBtn.addEventListener("click", () => {

        li.classList.toggle("completed");

        updateTaskStatus(text);

    });

    /* DELETE TASK */

    deleteBtn.addEventListener("click", () => {

        li.classList.add("task-removing");

        setTimeout(() => {

            li.remove();

            tasks = tasks.filter(task => task.text !== text);

            saveTasks();
            updateTaskCount();

        }, 300);

    });

}

/* ==========================
   UPDATE STATUS
========================== */

function updateTaskStatus(text){

    tasks = tasks.map(task => {

        if(task.text === text){
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;

    });

    saveTasks();
}

/* ==========================
   SAVE TO LOCAL STORAGE
========================== */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

/* ==========================
   COUNT TASKS
========================== */

function updateTaskCount(){

    taskCount.textContent =
    document.querySelectorAll("#task-list li").length;

}