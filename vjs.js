let todos=[]
var dt = new Date();
function clk(){
    var tsk=$(".inputtask").val();
    if (tsk == ""){
        console.log("No task given");
        $(".warning").html("You have not written the task!");
    }
    else{
        $(".warning").html("");
        timecrnt = dt.getHours() + ":" + dt.getMinutes();
        const todo={
            id:Date.now(),
            task:tsk,
            time:timecrnt,
            completed: false
        }
        todos.push(todo);
        console.log(todos);
        $(".inputtask").val("");
        storelocal();
    }
}
const todoItems = document.querySelector('.alltasks');
function rendertasks(){
    todoItems.innerHTML='';
    todos.forEach(function(item){
        const div = document.createElement('div');
        div.classList.add("task");
        div.setAttribute('id', item.id);
        if(item.completed==true){
            div.classList.add("checked")
        }
        div.innerHTML=`
            <h1 class="task-here">${item.task}</h1>
            <span class="text-muted">${item.time}</span></span>`
        todoItems.append(div);
    })
}
function storelocal(){
    localStorage.setItem('todos', JSON.stringify(todos));
    rendertasks();
}
function getlocal(){
    const data=localStorage.getItem('todos');
    if(data){
        todos=JSON.parse(data);
        storelocal();
    }
}
getlocal();
function remlocal(){
    var des=prompt("Are you sure you want to delete","Yes to continue");
    if(des=="Yes"||des=="yes"){
        localStorage.removeItem('todos');
    }
    todos=[];
    storelocal();
}
todoItems.addEventListener('click',function(event){
    toggle(event.target.parentElement.getAttribute('id'));
})
function toggle(id){
    console.log(id)
    todos.forEach(function(item){
        if(id==item.id){
            item.completed = !item.completed;
        }
    })
    storelocal();
}
