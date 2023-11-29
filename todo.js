const containerBox = document.querySelector("#containerBox"),
    contents = containerBox.querySelector("#contents"),
    list = contents.querySelector("#list"),
    inputList = document.querySelector(".inputlist"),
    listForm = inputList.querySelector("#listForm"),
    input = listForm.querySelector("input");
const list_LS = "toDos";

let toDos = [];

function saveList(){
    localStorage.setItem(list_LS, JSON.stringify(toDos));
}

function deleteList(event){
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    const cleanList = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanList;
    saveList();
}

function showingList(text){
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    const span = document.createElement("span");
    const listNum = toDos.length+1;
    delbtn.innerText = "지우기";
    delbtn.addEventListener("click", deleteList);
    span.innerText = text;
    list.appendChild(li);
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = listNum;
    const toDoObj = {
        text: text,
        id: listNum
    };
    toDos.push(toDoObj);
    saveList();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    showingList(currentValue);
    input.value = "";
}

function loadList(){
    const loadedList = localStorage.getItem(list_LS);
    if(loadedList !== null){
        const parsedData = JSON.parse(loadedList);
        parsedData.forEach(function(toDo){
            showingList(toDo.text);
        });
    }
}

function init(){
    loadList();
    listForm.addEventListener("submit", handleSubmit);
}

init();