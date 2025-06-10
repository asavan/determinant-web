export function toggleFullScreen(elem) {
    if (!document.fullscreenElement) {
        // If the document is not in full screen mode
        // make the video full screen
        elem.requestFullscreen();
    } else {
        // Otherwise exit the full screen
        document.exitFullscreen?.();
    }
}


export function fullScreenDblClick(elemClick, elemResize) {
    if (!elemClick || !elemResize) {
        return;
    }
    elemClick.addEventListener("dblclick", () => {
        toggleFullScreen(elemResize);
    });
}
