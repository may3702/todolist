const toDo_form = document.querySelector(".js-toDoForm");
const toDo_input = toDo_form.querySelector("input");
const toDo_list = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"

//5. 비어있는 배열 만들어주기 (입력되는 value를 밀어넣어주기 위함)
let toDos = [];


//9. X버튼 눌렀을 때
function deleteToDo(event){
    //9-1. 어떤 버튼이 눌렸는지, 그 버튼의 부모가 누구인지 찾아야함
      //console.dir(event.target);
      //parentNode = > 부모가 DOM의 모든 객체
      //parentElement => 부모가 꼭 요소여야만 함
      //console.log(event.target.parentNode);

    //X버튼을 눌렀을 때 타깃이 누구인지(=button)
    const delete_btn = event.target;
    //그 타깃의 부모노드가 누구인지(=li)
    const delete_li = delete_btn.parentNode;

    //9-2. HTML에서 목록을 삭제 
    //     toDo_list(=ul)의 childe(=li)
    toDo_list.removeChild(delete_li);
   
    //9-3. 클릭한 것을 제외한 나머지 값 반환하기
    //     cleanToDos는 toDos배열에서 
    //     클릭한 id의 배열을 제외한, 다른 id를 가진 배열만 반환한다
    //     클릭한 id가 1이라면 id가 2,3,4,... 인 배열만 반환하는 것이다
    //     즉, 같지 않은 경우에만 반환이 되는 것
                           //filter = array의 모든 배열에 함수를 실행시킴
    const cleanToDos = toDos.filter(function(btnclick){
        //delete_li.id는 string(문자)여서 parseInt를 이용해 숫자로 변환        
        return btnclick.id !== parseInt(delete_li.id);
    });
    //console.log(cleanToDos);

    //9-4. '원래 배열 = 나머지 배열' 변경 시켜주기
    //     cleanToDos : 클릭한(삭제한) li를 제외한, 나머지 배열이 남아있음
    //     toDos : 원래 배열이 그대로 남아있음
    toDos = cleanToDos;

    //9-5. 변경된 toDos배열은 saveToDos()를 거쳐 다시 로컬스토리지에 저장
    saveToDos();
};


//7. toDos배열을 가져와 로컬스토리지에 저장
function saveToDos(){
    //로컬스토리지에는 JS 데이터를 저장할 수 없음
    //localStorage.setItem(TODOS_LS,toDos)
    //JS의 object(=toDos)를 string로 변환시켜줘야함
        // 변환 시킬 수 있는 명령 = JSON.stringify()
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
};


//4. 폼을 제출했을 때 화면에 나타내기
function paintToDo(text){
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    btn.innerText = "❌";
    span.innerText = text;
    //X버튼 클릭시 deleteToDo실행
    btn.addEventListener("click",deleteToDo);

    li.id = newId;
    li.appendChild(btn);
    li.appendChild(span);
    toDo_list.appendChild(li);

    //6. 해야할 일을 입력할 때마다 toDos 배열에 추가해주기
      //6-1. 변수만들기
    const toDoObj = {
        text : text,
        id : newId 
    };
      //6-2. 배열에 변수 밀어넣기
    toDos.push(toDoObj);

      //6-3. 밀어넣은 배열을 저장하는 함수 호출
    saveToDos();  
};



//3. 폼을 제출했을 때
function handleSubmit(event){
    event.preventDefault();
    //input에 입력된 value값을 currentValue로 저장
    const currentValue = toDo_input.value;
    //value값을 인자로 하는 함수 paintToDo실행
    paintToDo(currentValue);
    //엔터해서 제출하고나면 빈칸으로 다시 입력할 수 있게 하기
    toDo_input.value = "";
};


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //로컬스토리지 안에 toDos가 있으면
    if(loadedToDos !== null){
       //8. string를 object로 변경
       const parsedToDos = JSON.parse(loadedToDos);
          //8-1. object로 바꾼 것을 paintToDo로 화면에 출력해야 함
             // forEach = array에 담겨있는 것들 각각에 대하여 함수 실행
         parsedToDos.forEach(function (each){
                //각각 object의 text를 paintToDo 함수로 나타내줘
                paintToDo(each.text);
         });
         
    };
};

function init(){
    //1. 목록을 나타내고
    loadToDos();
    //2. 투두리스트 폼 제출시 submit 이벤트실행
    toDo_form.addEventListener("submit", handleSubmit);

};

init();