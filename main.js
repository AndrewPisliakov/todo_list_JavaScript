
let addMessege = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')) {  
    todoList = JSON.parse(localStorage.getItem('todo')); 
    
    displayMessages();
} 

addButton.addEventListener('click' ,function() {
    if(!addMessege.value) return; 

    let newTodo = {
        todo: addMessege.value,
        chacked: false,
        important: false
    };

    todoList.push(newTodo);

    displayMessages();

    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessege.value = '';
});


function displayMessages() {
    if(todoList.length === 0) todo.innerHTML = ' ' 

    let displayMessage = ''; 
    todoList.forEach(function(item, i) {
        displayMessage += `
        <li> 
        <input type='checkbox' id='item_${i}' ${item.chacked ? 'checked' : ' '}>
        <label for='item_${i}' class="${item.important ? 'important' : '' }">${item.todo}</label> 
        </li>
        `;  

        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id'); 
     let forLabel = todo.querySelector('[for='+ idInput + ']');  
     let valueLabel = forLabel.innerHTML; 

    console.log('valueLabel:', valueLabel);

    todoList.forEach(function(item) {
        if(item.todo === valueLabel) {
            item.chacked = !item.chacked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
    todoList.forEach( function(item, i) { 
        if(item.todo === event.target.innerHTML) { 
            if(event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else if (event.shiftKey) { 
                let change =  prompt('', item.todo);
                item.todo = change;
                if(item.todo == null) {
                    item.todo;
                }
                } else {
                item.important = !item.important;
            }

        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList)); 

        }
    } );
});


let button = document.querySelector('#elem_button');
button.addEventListener('click', function(){
    todoList.length = 0;
    displayMessages(); 
    localStorage.setItem('todo', JSON.stringify(todoList));
});

let buttonAddAll = document.querySelector('#elem_button_AdAll');
buttonAddAll.addEventListener('click', function() {
    todoList.forEach(function(elem){
        elem.chacked = true;
    }) 
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
 
});


let buttonNotAll = document.getElementById('elem_button_NotAll');
buttonNotAll.addEventListener('click', function() {
    todoList.forEach(function(elem) {
        elem.chacked = false;
    });
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});
  




