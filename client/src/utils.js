export function requestFullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
        return true;
    }
    else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        return true;
    }
    else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        return true;
    }
    else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
        return true;
    }
    return false;
}

export function tryParseInt(value, defaultVal = 0) {
    let i = Number(value);
    if(isNaN(i))
        return defaultVal;
    return i;
}