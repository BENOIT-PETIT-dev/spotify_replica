const audio = document.getElementById('playback');
audio.volume = 0.10;
var isPlaying = false;

const playpauseBtn = document.querySelectorAll('.play-pause-action');

playpauseBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        togglePlay();
    });
});

document.addEventListener("keyup", (e) => {
    if(e.keyCode == 32){
        togglePlay();
        e.preventDefault();
    }
});


playpauseBtn.forEach(btn => {
    btn.addEventListener("keyup", (e) => {
        if(e.keyCode == 32){
            togglePlay();
        }
    });
});


function togglePlay() {
    if (isPlaying == true) {
        audio.pause();
        document.querySelector('html').setAttribute('isplaying', 'false');
        isPlaying = false;
    } else {
        audio.play();
        document.querySelector('html').setAttribute('isplaying', 'true');
        isPlaying = true;
    }
};




const button = document.getElementById('progress-bar__button');
const progressBar = document.querySelector('.progress-bar');
const leftbar = document.querySelector('.progress-bar__bar__time');
const actualTimeSpan = document.querySelector('.progress-bar__time');
const durationSpan = document.querySelector('.progress-bar__duration');
var clicking = false;



progressBar.addEventListener('mousedown', (event) => {
    clicking = true;
    progressBarTracking(event);
});

document.addEventListener('mouseup', function() {
    if (clicking == true) {
        clicking = false;
        changeMusicTime(percentage);
    }
});

document.addEventListener('mousemove', (event) => {
    if (clicking == true) {
        progressBarTracking(event);
    }
});

audio.addEventListener('timeupdate', () => {
    refreshMusicSpans();
    progressBarAuto();
});

audio.addEventListener('ended', () => {
    if (isPlaying == true) {
        audio.play();
    }
});




function progressBarTracking(e) {
    cursorX = e.clientX;
    getBarInfos();
    
    if (cursorX <= offsetLeft) {
        cursorX = offsetLeft;
    }
    else if (cursorX >= offsetRight) {
        cursorX = offsetRight;
    }

    percentage = ((cursorX - offsetLeft) / barWidth) * 100;
    leftbar.style.width = (percentage) + '%';
}

function progressBarAuto() {
    if (clicking == false) {
        let duration = audio.duration;
        let actualTime = audio.currentTime;
        let percentage = (actualTime/duration) * 100;
        leftbar.style.width = percentage + '%';
    }
}

function getBarInfos() {
    barWidth = progressBar.offsetWidth;
    barHeight = progressBar.offsetHeight;
    offsetLeft = progressBar.offsetLeft;
    offsetRight = barWidth + offsetLeft;
    barRect = progressBar.getBoundingClientRect();
        barLeft = barRect.left;
        barRight = barRect.right;
        barTop = barRect.top;
        barBottom = barRect.bottom;
}

function changeMusicTime(percentage) {
    var duration = audio.duration;
    percentage = (percentage / 100) * duration;
    audio.currentTime = percentage;
}

function refreshMusicSpans() {
    var duration = audio.duration;
    var actualTime = audio.currentTime;
    durationSpan.innerHTML = formatTime(duration);
    actualTimeSpan.innerHTML = formatTime(actualTime);
}

function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes <= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}


document.addEventListener('DOMContentLoaded', function() {
    refreshMusicSpans();
}, false);