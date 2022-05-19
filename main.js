//selecteurs: on va sélectionner notre bouton, input et liste
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//ecouteurs: pour créer une action, losqu'on click sur le bouton
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("input", filterTodo);

//fonctions
function addTodo(event){
    event.preventDefault(); // (sopper le bouton) pour ne pas rediriger vers une autre page lorsqu'on click sur le bouton
    //console.log("hello");
    //Todo DIV
    const todoDiv = document.createElement("div");
     todoDiv.classList.add("todo");

     //créer un li
     const newTodo = document.createElement("li");
     newTodo.innerText = todoInput.value;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);
      // Ajouter la todo au lacalStorage
      saveLocalTodos(todoInput.value);
     //bouton chack
     const completButton = document.createElement("button");
     completButton.innerHTML = '<i class= "fas fa-check"></i>';
     completButton.classList.add("complete-btn");
     todoDiv.appendChild(completButton);

     //bouton supprimer
     const trashtButton = document.createElement("button");
     trashtButton.innerHTML = '<i class= "fas fa-trash"></i>';
     trashtButton.classList.add("trash-btn");
     todoDiv.appendChild(trashtButton);

     //ajout de todo a todolist
     todoList.appendChild(todoDiv);
     todoInput.value = "";
}

function deletecheck(e){
    //console.log(e.target);
    const item = e.target;
    //delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        //item.parentElement.remove;
       todo.addEventListener("transitioned", function(){
           todo.remove();
       });
    }
    
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        //item.parentElement.remove;
    }
}

function filterTodo(e){
    const todos = todoList.hasChildNodes;
    //console.log(todos);
    todos.forEach(function (todo){
        switch (e.target.value) {
            case "all":
                todo.style.display= "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //checker si il y a des items existent
    let todos;
    if (localStorage.getItem("todo") === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}