const Weather = document.querySelector(".js-weather");
const API_KEY = "22510297e4b41a9271f715f3e1310985";
const COORDS = "coords";

//fetch = > JS에서 url을 사용하는 방법
//then => 데이터가 완전히 넘어오고 나서 호출
function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        //json 데이터 가져오기 (=JS Object), json 데이터를 가져오고 나면
        return response.json()
    }).then(function(json){
        //console.log(json);
        //console.log(json.main.temp);
        //console.log(json.name);
        const temperature = json.main.temp;
        const place = json.name;
        Weather.innerText = `${temperature}℃ @${place}`
    });
};

function SaveCoords(CoordsObj){
    localStorage.setItem(COORDS,JSON.stringify(CoordsObj));
};

function GeoSucess(position){
    //위도, 경도 값 가져오기
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //변수에 위도, 경도 값 넣기
    const CoordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    SaveCoords(CoordsObj);
    getWeather(latitude, longitude);
};

function GeoError(){
    console.log("cant access geo location");
};

//위치를 묻는 함수
function AskForCoords(){
    //getCurrentPosition(a,b)-> 사용자의 현위치를 가져옴
    //                  (좌표 가져오기 성공시, 좌표 가져오기 오류시)
    navigator.geolocation.getCurrentPosition(GeoSucess, GeoError);
};

function LoadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        //localStroage가 비어있으면 위치 묻기
        AskForCoords();
    } else {
        //비어있지 않으면 날씨 불러오기
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    };
};

function init(){
    LoadCoords();
};

init();