// import { mafonction } from './function.js';
import "./function.js";
import { addTask, deleteCheck, getTodos } from "./function.js";

document.addEventListener("DOMContentLoaded", getTodos);
// des que la page apparait on lance la fonction getTodos


// object qui represente une tache//
let taskModel = {
    title: "",
    description: "",
}

let taskList = []; // creation d'un tableau pour avoir les informations a l interieur//

// recupere nos élèments html et on les stocks//
let form = document.getElementById('form');
let title = form.querySelector("#title");  // On prends tout l'élement title  dans form//
let description = form.querySelector("#description"); //on prends l'element description dnas form//

const todoList = document.querySelector(".todo-list");
todoList.addEventListener("click", deleteCheck);


//element de soumission sur l'id principal qui est 'form' et on ajoute addEvenlister // apres il faut la bloquer en ajoutant un event//
form.addEventListener("submit", function (event){
    event.preventDefault(); //bloquer le recharchement de la page//


    let newTask = { // je cree une nouvelle valeur//
        title: title.value,
        description: description.value
    }
    addTask(newTask);
    taskList.push(newTask);
    //console.log(taskList);

});

