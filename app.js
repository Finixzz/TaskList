const saveTaskBtn=document.querySelector("#saveBtn");
const addedTask=document.querySelector("#addedTask");
const valMessage=document.querySelector("#valMessage");
let taskList=document.querySelector("#taskList");

saveTaskBtn.addEventListener("click",function(){
    if(addedTask.value==""){
        valMessage.style.color="red";
        valMessage.innerHTML="This field is required for subbmiting your new task!";
        setTimeout(function(){
            valMessage.innerHTML="";
        },3000);
    }else{

        //For fancy delete X button 
        const deleteTaskBtn=document.createElement("a");
        deleteTaskBtn.className="delete-item secondary-content";
        const letterX=document.createElement("i");
        letterX.className="fa fa-remove";
        deleteTaskBtn.appendChild(letterX);
        

        //Appending task to collection
        const newTask=document.createElement("li");
        newTask.className="collection-item";
        newTask.innerHTML=addedTask.value;
        newTask.appendChild(deleteTaskBtn);

        taskList.append(newTask);
        addedTask.value="";


        
        const selectedTaskToDelete=document.querySelectorAll(".collection-item");
        for(let i=0;i<selectedTaskToDelete.length;i++){
            selectedTaskToDelete[i].addEventListener("click",function(){
                   selectedTaskToDelete[i].remove();
            });
        }

    }
});