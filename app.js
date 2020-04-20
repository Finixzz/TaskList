"use strict"
const form=document.querySelector("#task-form");
const taskInput=document.querySelector("#addedTask");
var warning=document.querySelector("#warning");
var taskList=document.querySelector("#taskList");
var filter=document.querySelector("#filter");


loadEventListeners();

function loadEventListeners(){

    form.addEventListener("submit",addNewTask);

    taskList.addEventListener("click",removeTask); 

    filter.addEventListener("keyup",filterTasks);
    
}

function addNewTask(e,deleteTaskButton){
    if(taskInput.value==""){
        if(form.querySelector(".warn")==null){
            let warningHTML=`<li class="warn"style="color: red;"> This field is required in order to add new task</li>`
            warning.innerHTML+=warningHTML;
        }  
    }else{
        let task=`
                <li class="collection-item">
                  ${taskInput.value}
                  <a href="#" class="secondary-content">
                    <i class="fa fa-remove"></i>
                  </a>
                </li> `;
        taskList.innerHTML+=task;

        if(form.querySelector(".warn")!=null)
            form.querySelector(".warn").remove();
    }
    e.preventDefault();
    taskInput.value="";
    
}


function removeTask(e){
    e.target.parentElement.querySelector(".fa-remove").addEventListener("click",()=>{
        if(confirm("Are you sure you want to delete this task?")){
            e.target.parentElement.querySelector(".fa-remove").parentElement.parentElement.remove();
        }
    });  
}


function filterTasks(e){
    let text=e.target.value.toLowerCase();
    taskList.querySelectorAll(".collection-item").forEach(task=>{
        if(task.textContent.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

