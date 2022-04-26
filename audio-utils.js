export function playSticky() {
    playSound('V6TLQ57-paper-sticky-note-3.mp3');
}

export function playDing() {
    playSound('servicebell.mp3');
}

export function playWow() {
    playSound('anime-wow-sound-effect.mp3');
}

export function playAOL() {
    playSound('imrcv.wav');
}

function playSound(fileName) {
    const audio = new Audio(`../assets/${fileName}`);
    audio.volume = 0.5;
    audio.play();
}