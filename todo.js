const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");  // ul

const TODOS_LS = "toDos";

const toDos = [];

//LS의 "toDos"에 Object로 변환시킨 toDos객체를 저장
function saveToDos(){
    //LS에 값 셋팅하기
    //LS의 TODOS_LS(="toDos")에 JSON.stringify(toDos)값 저장
                               //toDos 배열에 있는 object를 string로 변경
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};
//JSON = > JavaScript Object Notation (데이터를 전달할때 js가 다룰 수 있도록 object로 변경해주는 기능)
//JSON.stringify => 자바스크립트 object를 string로 변경해줌


//form을 제출하면 input에 있는 value(투두리스트,text)를 인자로 실행되는 함수
function paintToDo(text){
    //createElement = html 생성
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    //a.appendChild(b) = a안에 b넣기 
    li.appendChild(delBtn); //li안에 delBtn넣기
    li.appendChild(span); //li안에 span넣기  <li><button></button><span></span></li>
    //li의 id는 toDos배열의 길이+1
    li.id = newId;
    //toDoList(=ul)안에 위에서 생성한 li넣기
    toDoList.appendChild(li);
    //text(투두리스트), id값
    const toDoObj = {
        text : text,
        id : newId
    };
    //비어있는 toDos배열에 toDoObj 값 밀어넣기
    toDos.push(toDoObj);
    //투두리스트 저장하기
    saveToDos();
};


//ToDoForm 제출시 실행되는 함수 (ToDoList 작성하고 Enter 눌렀을 때)
function handleSubmit(event){
    event.preventDefault();
    //input에 입력 된 value
    const currentValue = toDoInput.value;
    //input에 입력 된 value를 pnaintToDo 함수로 실행
    paintToDo(currentValue);

    toDoInput.value = "";
};


// ToDoList를 로드
function loadToDos(){
    //로컬스토리지에서 TODOS_LS(="toDos") 값 가져오기
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //TODOS_LS(=toDos)가 비어있지 않으면 (항목이 있으면)
    if(loadedToDos !== null){
        //TODOS_LS(=toDos) 값을 object로 변환
        const parsedToDos = JSON.parse(loadedToDos);
        //object로 변환한 TODOS_LS(=toDos) 각각에 대해 paintToDo 함수 실행 
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    };
};


function init(){
    //ToDoList 로드
    loadToDos(); 
    //ToDoForm을 제출 -> handleSubmit 함수 실행
    toDoForm.addEventListener("submit",handleSubmit);
};


init();