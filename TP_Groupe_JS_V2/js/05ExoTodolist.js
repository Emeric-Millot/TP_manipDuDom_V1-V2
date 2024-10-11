import { createMarkup } from "./utils/utils.js";
import { getFormattedCurrentTime } from "./utils/timeFormater.js"; // Import de la fonction pour formater l'heure

// Récupère nos éléments HTML et on les stocke
let form = document.getElementById("form");
let inputTitle = form.querySelector("#title");
let textareaDescription = form.querySelector("#description");
let ul = document.body.querySelector("#list");
let submitFormButton = form.querySelector("#submit-form-button");

// Tableau qui stockera nos taches
let taskList = [];
let updatingTaskElements = {};

// Charger les tâches depuis localStorage au démarrage
loadTasksFromLocalStorage();

// Événement de soumission du formulaire
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Bloque le rechargement de la page

    if (submitFormButton.textContent == "Modifier") {
        // Mise à jour d'une tâche existante
        if (inputTitle.value) {
            updatingTaskElements.title.innerText = inputTitle.value;
        }
        if (textareaDescription.value) {
            updatingTaskElements.description.innerText = textareaDescription.value;
        }
        saveTasksToLocalStorage(); // Sauvegarde les modifications
        resetForm(); // Réinitialise le formulaire
    } else {
        // Ajout d'une nouvelle tâche
        if (inputTitle.value && textareaDescription.value) {
            let newTask = {
                title: inputTitle.value,
                description: textareaDescription.value,
            };
            inputTitle.value = "";
            textareaDescription.value = "";

            taskList.push(newTask); // Ajoute la nouvelle tâche dans le tableau

            addTaskToDOM(newTask); // Ajoute la tâche au DOM

            saveTasksToLocalStorage(); // Sauvegarde après ajout
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    }
});

// Fonction pour ajouter une tâche au DOM avec l'heure et l'animation bounceInUp
function addTaskToDOM(task) {
  // Création de l'élément li pour la nouvelle tâche
  const liTask = createMarkup("li", ul);

  // Ajoute l'animation bounceInUp à l'élément li
  liTask.classList.add('animate__animated', 'animate__bounceInUp');

  // Ajout du titre et de la description
  const titleTask = createMarkup("h2", liTask, task.title);
  const descriptionTask = createMarkup("p", liTask, task.description);

  // Ajout de l'heure de création avec la fonction getFormattedCurrentTime
  const taskTime = createMarkup("p", liTask, `Ajoutée à : ${getFormattedCurrentTime()}`);

    // Ajoute l'interval en temps réel
//   setInterval(() => {
//     taskTime.innerText = `Ajoutée à : ${getFormattedCurrentTime()}`;
//   }, 1000); // Mise à jour toutes les secondes


  const buttonDelete = createMarkup("button", liTask, "Supprimer");
  const buttonEdit = createMarkup("button", liTask, "Modifier");

  // Gestion des événements pour le bouton delete avec l'animation rollOut
  buttonDelete.addEventListener("click", () => {
      liTask.classList.add('animate__animated', 'animate__rollOut'); // Ajoute l'animation de suppression

      liTask.addEventListener('animationend', () => {
          // Supprimer l'élément du DOM après la fin de l'animation
          liTask.remove();

          // Mettre à jour taskList après suppression
          taskList = taskList.filter(t => t.title !== task.title);

          // Sauvegarder les tâches après suppression
          saveTasksToLocalStorage();
      });
  });

  // Gestion des événements pour le bouton Modifier
  buttonEdit.addEventListener("click", () => {
      inputTitle.value = task.title;
      textareaDescription.value = task.description;

      submitFormButton.textContent = "Modifier";
      updatingTaskElements = {
          title: titleTask,
          description: descriptionTask
      };
  });
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    inputTitle.value = "";
    textareaDescription.value = "";
    submitFormButton.textContent = "Ajouter ma tâche"; // Réinitialise le texte du bouton
    updatingTaskElements = {}; // Réinitialise les éléments à mettre à jour
}

// Fonction de sauvegarde des tâches dans localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Fonction de chargement des tâches depuis localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTaskToDOM(task); // Ajoute chaque tâche au DOM
            taskList.push(task); // Ajoute chaque tâche dans taskList pour le suivi
        });
    }
}

