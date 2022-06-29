/*
//Math.random() * A
//   0~A 사이의 무작위 숫자 추출
//Math.floor() 내림
//Math.ceil() 올림

//Math.floor( Math.random() * 4 )
//   0~4 사이의 무작위 숫자를 추출 -> 소수점 전부 버림
//   ex) 0.12024 => 0,  3.42395 => 3
//       때문에 값은 0,1,2,3 중에서 랜덤으로 나온다


const body = document.querySelector("body");
const IMG_NUMBER = 4;

function paintImage(imgNumber){
    //img 객체 생성
    const image = new Image();

    //img 객체에 src속성 부여
    image.src = `images/${imgNumber + 1}.jpg`;

    //img 객체에 class(=bgImage) 추가
    image.classList.add("bgImage");

    //body의 자식요소로 img 객체 넣기
    body.appendChild(image);
};

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
};

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
};

init();
*/





const body = document.querySelector("body");
const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
};

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
};

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
};

init();