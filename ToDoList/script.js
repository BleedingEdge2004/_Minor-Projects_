// Element Cpturing in Variables
const addTask = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const task = document.getElementById("task");
const themeBtn = document.getElementById("switchTheme");

// Add CheckBox and Delete Buttons
const AddBtns = (element) => {
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("input");

    checkBtn.type = "checkbox";
    checkBtn.className = "checkBtn"
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20px"><path  d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>`;

    element.prepend(checkBtn);
    element.append(delBtn);
}

// Add Tasks inside the Todo List
const AddTask = () => {
    if (task.value.trim() !== "") {
        const newTask = document.createElement("p");
    
        newTask.innerText = task.value;
        todoList.prepend(newTask);

        AddBtns(newTask);
        task.value = "";
    }
    else {
        alert("Your Task Can Not Be Empty");
    }
}

// Update tasks Inside Todo List
const UpdateTask = (event) => {
    let target = event.target;
    if (target.tagName === "P") {
        let updateTask = prompt("Update Your Task ");
        if (updateTask.trim() !== "") {
            target.innerText = updateTask;

            AddBtns(target);
        }
        else {
            alert("Your Task Can Not Be Empty");
        }
    }
}

// Mark Task Complete or not And Remove Button Functionality
const HandleButton = (event) => {
    if (event.target.tagName === "INPUT") {

        if (event.target.parentNode.getAttribute("class") === "completed") {
            event.target.parentNode.setAttribute("class", "");
        }
        else {
            event.target.parentNode.setAttribute("class", "completed");
        }
    }

    if (event.target.parentNode.tagName === "BUTTON") {
        event.target.parentNode.parentNode.remove();
    }
}

// Switches Dark/Light Mode
const SwitchTheme = () => {
    document.body.classList.toggle("darkmode");
}

// Evevnt Listeners all Over Page
todoList.addEventListener('click', HandleButton);
todoList.addEventListener('dblclick', UpdateTask);
addTask.addEventListener('click', AddTask);
themeBtn.addEventListener('click', SwitchTheme);
task.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        AddTask();
    }
});