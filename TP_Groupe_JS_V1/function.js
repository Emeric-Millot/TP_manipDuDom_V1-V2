export function addTask(newTask) {
    let taskTitle = newTask.title.trim();
    let taskDescription = newTask.description.trim();

    if (taskTitle === "" || taskDescription === "") {
        alert("Attention, veuillez entrer une tâche valide");
        return;
    }
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Création d'un li pour afficher la tâche
    let li = document.createElement("li");
    li.innerText = `${taskTitle} ${taskDescription}`;
    li.classList.add("todo-item");
    todoDiv.appendChild(li);
    saveLocalTodos(`${taskTitle} ${taskDescription}`);

    // Bouton Modifier
    const modifyButton = document.createElement("button");
    modifyButton.innerHTML = '<i class="fas fa-edit"></i>';
    modifyButton.classList.add("modify-btn");
    todoDiv.appendChild(modifyButton);

    // Ajouter l'événement pour le bouton Modifier
    modifyButton.addEventListener("click", modifyTask);

    // Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    let list = document.getElementById("list");
    list.appendChild(todoDiv);
    resetForm();
}

// Fonction qui permet de réinitialiser le formulaire
function resetForm() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
}

// Fonction pour modifier une tâche
function modifyTask(e) {
    const item = e.target;
    if (item.classList[0] === "modify-btn") {
        const todo = item.parentElement;
        const taskDetails = todo.querySelector(".todo-item");

        // Permet à l'utilisateur de modifier le texte dans des champs de saisie
        const newTitle = prompt("Modifier le titre de la tâche :", taskDetails.innerText.split(' ')[0]);
        const newDescription = prompt("Modifier la description de la tâche :", taskDetails.innerText.split(' ')[1]);

        if (newTitle && newDescription) {
            taskDetails.innerText = `${newTitle} ${newDescription}`;

            // Met à jour le stockage local après modification
            updateLocalTodos(todo, `${newTitle} ${newDescription}`);
        }
    }
}

// Mise à jour du localStorage après modification
function updateLocalTodos(todo, updatedTask) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const oldTask = todo.children[0].innerText;
    const taskIndex = todos.indexOf(oldTask);

    // Met à jour la tâche correspondante
    todos[taskIndex] = updatedTask;
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function deleteCheck(e) {
    const item = e.target;
    // Supprimer une tâche
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
}

export function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Créer le li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Bouton Modifier
        const modifyButton = document.createElement("button");
        modifyButton.innerHTML = '<i class="fas fa-edit"></i>';
        modifyButton.classList.add("modify-btn");
        todoDiv.appendChild(modifyButton);

        // Ajouter l'événement pour le bouton Modifier
        modifyButton.addEventListener("click", modifyTask);

        // Bouton Supprimer
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // Ajouter la tâche à la liste
        let list = document.getElementById("list");
        list.appendChild(todoDiv);
    });
}

export function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
