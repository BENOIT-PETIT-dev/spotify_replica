const audio = document.getElementById('playback');
audio.volume = 0.10;


const button = document.getElementById('volume-bar__button');
const volumeBar = document.querySelector('.volume-bar');
const leftbar = document.querySelector('.volume-bar__bar__volume');
var clicking = false;


volumeBar.addEventListener('mousedown', (event) => {
    clicking = true;
    volumeBarTracking(event);
});

document.addEventListener('mouseup', function() {
    if (clicking == true) {
        clicking = false;
        changeMusicVolume(percentage);
    }
});

document.addEventListener('mousemove', (event) => {
    if (clicking == true) {
        volumeBarTracking(event);
        changeMusicVolume(percentage);
    }
});


function volumeBarTracking(e) {
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


function getBarInfos() {
    barWidth = volumeBar.offsetWidth;
    barHeight = volumeBar.offsetHeight;
    offsetLeft = volumeBar.offsetLeft;
    offsetRight = barWidth + offsetLeft;
    barRect = volumeBar.getBoundingClientRect();
        barLeft = barRect.left;
        barRight = barRect.right;
        barTop = barRect.top;
        barBottom = barRect.bottom;
}

function changeMusicVolume(percentage) {
    audio.volume = percentage / 100;
}