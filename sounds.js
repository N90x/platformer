var soundNames = [
    "coin", "jump", "land", "step", "speedup", //"music", 
    "jump 1", "jump 2", "swosh", "swing 1", "swing 2"
]

var sounds = []

function loadSounds() {
    soundFormats("wav")
    for (let n of soundNames)
    {
        sounds[n] = loadSound("assets/sound/".concat(n))
    }
}

// 0.5283125

var stepSoundDuration = 0.232
function playRunLoop() {
    if (!sounds["step"].isPlaying())
    {
        playSound("land", 0.8)
        //print(sounds["step"].duration())

        let stepSpeed = movementSpeed/100 * 3
        //print(stepSpeed)

        let startTime = 0.2, 
            rate = stepSoundDuration/stepSpeed, 
            amp = 0.3, 
            cueLoopStart = 0

        sounds["step"].loop(startTime, rate, amp, cueLoopStart)
    }
}

function pauseRunLoop(){
    if (sounds["step"].isPlaying())
    {
        sounds["step"].pause()
    }
}

function playSound(n, vol){
    sounds[n].setVolume(vol)
    sounds[n].play()
}