const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function submit(event){
    event.preventDefault();
    const VALUE = input.value;
    paintGreeting(VALUE);
    
    // VALuE에 입력된 이름 저장
    localStorage.setItem(USER_LS, VALUE);
};

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit" , submit );
};

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
};

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // 이름이 비어있으면
        askForName();
    } else {
        // 이름이 있으면
        paintGreeting(currentUser);
    };
};

loadName();