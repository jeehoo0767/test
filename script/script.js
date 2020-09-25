// 현재 시간 & 요일 구현

function clock() {
    var now = new Date();
    var clockHours = now.getHours();
    var clockMinutes = now.getMinutes();
    var clockSeconds = now.getSeconds();
    var clockRes = document.querySelector("#clock");

        if (clockHours < 10) clockHours = "0" + clockHours;
        if (clockMinutes < 10) clockMinutes = "0" + clockMinutes;
        if (clockSeconds < 10) clockSeconds = "0" + clockSeconds;

    var dayIdx = now.getDay();
    var dayName = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    var dayOutPut = dayName[dayIdx];

    clockRes.innerHTML = clockHours + ":" + clockMinutes + ":" + clockSeconds + " " + dayOutPut;
}

clock();
setInterval(clock,1000);


// TodoList 구현

const todoForm = document.querySelector(".todoForm")
const todoList = document.querySelector("#todolist");
const doneList = document.querySelector("#donelist")
const inputText = document.querySelector("#inputText");

const TODOS_LS = "toDos";
const DONETODO = "doneTodo";
let toDos = [];
let doneTodo = [];


function plusDone(event, text) {
    const li = document.createElement("li");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const btn = event.target;
    const doneId = parseInt(btn.parentNode.id);
    doneBtn.addEventListener("click",deleteDone);
    for (let i = 0; i < JSON.parse(localStorage.getItem("toDos")).length; i++) {
        if (JSON.parse(localStorage.getItem("toDos"))[i].id == doneId) {
            text = JSON.parse(localStorage.getItem("toDos"))[i].text;
        }
    }
    const delLi = btn.parentNode;
    todoList.removeChild(delLi);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(delLi.id);
    });
    toDos = cleanToDos;
    doneBtn.innerText = "✔";
    doneBtn.id = "doneIcon";
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    li.appendChild(span);
    li.id = doneId;
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: doneId
    };
    doneTodo.push(doneObj);
    saveToDos();
    saveDone();
}

function paintDone(text) {
    const li = document.createElement("li");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = doneTodo.length + 1;
    doneBtn.innerText = "✔";
    doneBtn.id = "doneIcon";
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    doneBtn.addEventListener("click",deleteDone);
    li.appendChild(span);
    li.id = newId;
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId
    };
    doneTodo.push(doneObj);
    saveDone();
}

function deleteDone(event){
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanDone = doneTodo.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    doneTodo = cleanDone;
    saveDone();
}

function saveDone() {
    localStorage.setItem(DONETODO, JSON.stringify(doneTodo));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    doneBtn.innerText = "✔";
    doneBtn.id = "doneIcon";
    delBtn.innerText = "✖";
    delBtn.id="delIcon";
    delBtn.addEventListener("click", deleteToDo);
    doneBtn.addEventListener("click", plusDone);
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    li.appendChild(delBtn);
    delBtn.classList.add("del_btn");
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = inputText.value;
    paintToDo(currentValue);
    inputText.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadDoneTodo = localStorage.getItem(DONETODO);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
     if(loadDoneTodo !== null){
        const parsedDone = JSON.parse(loadDoneTodo);
        parsedDone.forEach(function(toDo){
            paintDone(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
