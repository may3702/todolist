const clock = document.querySelector(".js-clock h1");

function clockPlay(){
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    clock.innerHTML = `${hours < 10 ? `0${hours}`: hours} : ${min <10 ? `0${min}` : min } : ${sec < 10 ? `0${sec}` : sec}`
};

clockPlay();

setInterval(clockPlay, 1000)

