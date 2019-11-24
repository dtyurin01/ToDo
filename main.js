const checkBox = document.querySelector("#task1");
const toDoList = document.querySelector(".checkBoxes");
const label = document.querySelectorAll('#taskLabel1');

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :  {
    todo: [],
    completed: []
};



function dateToday() {
    aDate = document.querySelector('.todoList__date-text');
    let myDate = new Date();
    let weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    aDate.innerHTML = `${weekday[myDate.getDay()]} / ${myDate.getDate()} / ${myDate.getMonth() + 1}`;

}
dateToday()
function accordion() {
    const acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                document.querySelector('.accordion').innerText = 'To Do List 👇';

            } else {
                panel.style.maxHeight = ` ${panel.scrollHeight}px`;
                document.querySelector('.accordion').innerText = 'To Do List ☝️';
            }
        });
    }
}
accordion();

// SVGS
var removeSVG = '<i class="far fa-trash-alt"></i>';
var completeSVG = '<i class="far fa-check-circle"></i>';
renderTodoList();

document.querySelector('#toSubmit').addEventListener('click', e => {
    e.preventDefault();
    let value = document.querySelector('#nameofTodo').value;
    if(value){
        addItem(value); 
    }
});
document.getElementById('nameofTodo').addEventListener('keydown',function(e){
    let value = this.value
      if(e.code === 'Enter' && value){
        addItem(value);
    }
      
  });

function addItem(value) {
        data.todo.push(value)
        addItemTodo(value);
        document.getElementById('nameofTodo').value = '';

        dataObjectUpdated();
}
function renderTodoList() {
    if(!data.todo.length && !data.completed.length) return;

    for(let i = 0;i < data.todo.length;i++){
        var value = data.todo[i];
        addItemTodo(value);
    }
    for(let k = 0; k < data.completed.length;k++){
        var value = data.completed[k];
        addItemTodo(value,true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}
function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();
    parent.removeChild(item);

}


function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    var target = (id === 'todo') ? document.querySelector('#completed') : target = document.querySelector('#todo');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);




}
// Add a new item
function addItemTodo(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.querySelector('.todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('delete');
    remove.innerHTML = removeSVG;

    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('mark');
    complete.innerHTML = completeSVG;
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
}
