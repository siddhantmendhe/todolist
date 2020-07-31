const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput= document.querySelector('#task');

//Load all event list
loadEventListeners();

function loadEventListeners(){
    //load event
    document.addEventListener('DOMContentLoaded',getTask);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',deleteItem);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}
//get tasks after page reloads
function getTask(e){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(temp){
    //creating li
    let li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(temp));
    //creating a tag
    let link= document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML=`<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    taskList.appendChild(li);

    })

}
function addTask(e){

    let task=taskInput.value;
    if(task===''){
        alert('insert item');
    }
    else{
    //creating li
    let li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));
    //creating a tag
    let link= document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML=`<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    taskList.appendChild(li);

    //store in LS
    storeTaskInlocalStorage(task);

    //clearing input
    taskInput.value='';
}
    e.preventDefault();

}
// Store Task
function storeTaskInlocalStorage(task)
{
    console.log('hello')
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    // alert('Task Saved');
}

//delete iteme

function deleteItem(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //remove item form local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
}
//clear tasks form local storage
function removeTaskFromLocalStorage(item){
    tasks=JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(temp,index){
        if(item.textContent===temp){
            tasks.splice(index,1);
            
           
        }
        
        
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));



}

function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //remove tasks from local storage
    removeAllTasks();
}
function removeAllTasks(){
    localStorage.clear();
}

function filterTasks(e){
    let text=e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('li').forEach(function(temp){
        if(temp.textContent.toLowerCase().indexOf(text)!=-1){
            temp.style.display='block';
        }
        else{
            temp.style.display='none';
        }
    })
}