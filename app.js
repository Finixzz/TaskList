"use strict"
const form=document.querySelector("#task-form");
const taskInput=document.querySelector("#addedTask");
var warning=document.querySelector("#warning");
var taskList=document.querySelector("#taskList");
var filter=document.querySelector("#filter");
var clearTasksBtn=document.querySelector("#clear-tasks");
var taskCounter=0;


loadEventListeners();

function loadEventListeners(){

    document.addEventListener("DOMContentLoaded",loadTasks);

    form.addEventListener("submit",addNewTask);

    taskList.addEventListener("click",removeTask);

    filter.addEventListener("keyup",filterTasks);
    
    clearTasksBtn.addEventListener("click",clearTasks)
    
}

function createTaskElement(taskName){
    let task=  `
            <li id="${taskCounter}" class="collection-item">
            ${taskName}
            <a class="secondary-content" style="cursor:pointer">
                X
            </a>
            </li> `;
    taskCounter++;
    return task;
    
}
function loadTasks(){
    let tasks;
    if(localStorage.getItem("tasks")==null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task,i)=>{
            taskCounter=i;
            taskList.innerHTML+=createTaskElement(task.name);
        });
    }
}

function storeInLocalStorage(taskVal){
    let tasks;
    if(localStorage.getItem("tasks")==null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    let task={
        id: taskCounter,
        name: taskVal
    };
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    taskCounter++;
}


function addNewTask(e){
    if(taskInput.value==""){
        if(form.querySelector(".warn")==null){
            let warningHTML=`<li class="warn"style="color: red;"> This field is required in order to add new task</li>`
            warning.innerHTML+=warningHTML;
        }  
    }else{
        taskList.innerHTML+=createTaskElement(taskInput.value);
        if(form.querySelector(".warn")!=null)
            form.querySelector(".warn").remove();
    }
    storeInLocalStorage(taskInput.value);
    e.preventDefault();
    taskInput.value="";
    
    
}

function removeTaskFromLocalStorage(taskID){
    let tasks=JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task,i)=>{
        if(task.id=taskID)
            tasks.splice(i,1);
    })
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function removeTask(e){
    if(e.target.nodeName.toLowerCase()=="a"){
        if(confirm("Are you sure you want to delete this task?")){
            let taskID=e.target.parentElement.id;
            console.log(taskID);
            e.target.parentElement.remove();
            removeTaskFromLocalStorage(taskID);
        }
    }
}


function filterTasks(e){
    let taskFilterInput=this.value.toLowerCase();
    taskList.querySelectorAll("li").forEach(task=>{
        let taskTeks=task.innerText.substring(0,taskFilterInput.length).toLowerCase();
        if(taskFilterInput==taskTeks){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}


function clearTasks(e){
    if(confirm("Are you sure you want to clear your task list?")){
        taskList.remove();
        localStorage.clear();
    }
}

