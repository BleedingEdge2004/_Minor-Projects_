const addTask = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const task = document.getElementById("task");
const switchTheme = document.getElementById("switchTheme");

function AddTask() {
    if (task.value !== "")
    {
        const newTask = document.createElement("p");
        const delBtn = document.createElement("button");
        const checkBtn = document.createElement("input");

        checkBtn.type = "checkbox";
        checkBtn.className = "checkBtn"
        delBtn.innerText = "X";
        newTask.innerText = task.value;

        todoList.prepend(newTask);
        newTask.append(delBtn);
        newTask.prepend(checkBtn);

        task.value = "";
    }
    else{
        alert("Your Task Can Not Be Empty");
    }
}

function HandleButton(event) {
    if (event.target.tagName === "INPUT") {
        if (event.target.parentNode.getAttribute("class") === "completed") {
            event.target.parentNode.setAttribute("class","");
        }
        else{
            event.target.parentNode.setAttribute("class", "completed");
        }
    }
    if (event.target.tagName === "BUTTON") {
        event.target.parentNode.remove();
    }
}

todoList.addEventListener('click', HandleButton);
addTask.addEventListener('click', AddTask);
switchTheme.addEventListener('click', () => {
    document.body.classList.toggle("darkmode");
});