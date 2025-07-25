const appState =
{
    view: 'Showcase',
    background: `
        radial-gradient(
            ellipse 120% 60% at 50% 0%, 
            var(--color-secondary) 0%, 
            rgba(252, 56, 21, 0.5) 60%, 
            rgba(0,0,0,0) 100%
        ),
        linear-gradient(
            to bottom, 
            rgba(0,0,0,0.85) 0%, 
            rgba(0,0,0,1) 100%
        )
    `,
    isWindowEvent: true,
    timerFunction: 60,
    timer : {
        timerState: 'paused',
        focusTime: { minutes: 1, seconds: 0  },
        shortBreaktime: { minutes: 1, seconds: 0 },
        longBreak: { minutes: 1, seconds: 0 },
        longBreakAfterSess: 4,
        timerInterval: null,
        currentNumSession: 0,
        timeCompletion: 0,
        autoStart: false,
    },
    timerIcon: './assets/icons/eye.png',
    sessionStatus: 'Focus',
    notifyStatus: true,
    setting: {
        status: 'Duration',
        focusTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
        longBreakAfterSess: 4,
    }
}

const statefulComponents =
{
    background: document.querySelector(".pomodoro-window"),
    timer: document.querySelector('.timer'),
    timerIcon: document.querySelector('.timer-icon'),
    status: document.querySelector('.session-status'),
    buttonStatus: document.querySelector('.btn-2'),
    sessTiles: document.querySelector('.timer-tiles'),
    tile1: document.querySelector('.tile-1'),
    tile2: document.querySelector('.tile-2'),
    tile3: document.querySelector('.tile-3'),
    tile4: document.querySelector('.tile-4'),
    focusTimeSetting: document.querySelector('.st-1').children[1].children[0],
    shortBreakSetting: document.querySelector('.st-2').children[1].children[0],
    longBreakSetting: document.querySelector('.st-3').children[1].children[0],
    longBreakAfterSessSetting: document.querySelector('.st-4').children[1].children[0],
    notifyToggle: document.querySelector('.notify-toggle'),
    durationSettings: document.querySelector('#timer-setting-state'),
    notificationSettings: document.querySelector('#setting-notification-state'),
    timeProgressWheel: document.querySelector('.timer-container')
}
const eventComponents = 
{
    windows: document.querySelector('.pomodoro-window'),
    backShowcaseBtn: document.querySelector('.btn-1'),
    timerBtn: document.querySelector('.btn-2'),
    settingBtn: document.querySelector('.btn-3'),
    exitSettingBtn: document.querySelector('.exit-settings'),
    toggleDuration: document.querySelector('.duration'),
    toggleNotification: document.querySelector('.notifications'),
}
function removeWindowEvent(appState)
{
    
    appState.isWindowEvent = false;
    eventComponents.windows.removeEventListener('click',windowClickEvent);
}

function updateTimerTiles() {
    const tiles = [statefulComponents.tile1, statefulComponents.tile2, statefulComponents.tile3, statefulComponents.tile4];
    
    // Reset all tiles to default
    tiles.forEach(tile => tile.classList.remove('fulfilled'));
    
    for(let i = 0; i < appState.timer.currentNumSession; i++) {
        if(tiles[i]) {
            tiles[i].classList.add('fulfilled');
        }
    }
}

function homeState(appState)
{
    document.querySelector("#home-state").classList.remove('hidden');
    changeBackground(appState);
    if(appState.sessionStatus == 'Focus') 
    {
        statefulComponents.timer.innerHTML = `${appState.timer.focusTime.minutes}:${appState.timer.focusTime.seconds}`
        
    }
    else if (appState.sessionStatus == 'Short Break')
    {
        statefulComponents.timer.innerHTML = `${appState.timer.shortBreaktime.minutes}:${appState.timer.shortBreaktime.seconds}`

    }
    else if (appState.sessionStatus == 'Long Break')
    {
        statefulComponents.timer.innerHTML = `${appState.timer.longBreak.minutes}:${appState.timer.longBreak.seconds}`
    }

    statefulComponents.timerIcon.src = appState.timerIcon;
    statefulComponents.buttonStatus.innerHTML = appState.timer.timerState == 'active' ? 'Paused' : 'Start';
    statefulComponents.status.innerHTML = appState.sessionStatus;
    statefulComponents.timeProgressWheel.style.setProperty('--progress-percentage-primary', `${appState.timer.timeCompletion}%`);
    statefulComponents.timeProgressWheel.style.setProperty('--progress-percentage-secondary', `${appState.timer.timeCompletion + 5}%`);
    updateTimerTiles();
}
const windowClickEvent = () => 
{
    changeView('Home');
    removeWindowEvent(appState);
    console.log('Removed click');
}
function previewState(appState)
{
    console.log('Hig');
    document.querySelector("#showcase-state").classList.remove('hidden');
    changeBackground(appState);
    eventComponents.windows.addEventListener('click', windowClickEvent);
}
function settingState(appState)
{
    document.querySelector("#setting-state").classList.remove('hidden');
    changeBackground(appState);
    statefulComponents.focusTimeSetting.innerHTML = appState.setting.focusTime;
    statefulComponents.shortBreakSetting.innerHTML = appState.setting.shortBreakTime;
    statefulComponents.longBreakSetting.innerHTML = appState.setting.longBreakTime;
    statefulComponents.longBreakAfterSessSetting.innerHTML = appState.setting.longBreakAfterSess;
}
function changeView(newState)
{
    appState.view = newState;
    renderState(appState);
}
function renderState(newState)
{
    document.querySelectorAll('#showcase-state, #setting-state, #home-state').forEach(state => {
        state.classList.add('hidden');
    })
    if(newState.view == 'Showcase') previewState(newState);
    if(newState.view == 'Settings') settingState(newState);
    if(newState.view == 'Home') homeState(newState);
}
const timerButtonEvent = () =>
{
    let minutes, seconds;
    if(appState.sessionStatus === 'Focus')
    {
        minutes = appState.timer.focusTime.minutes;
        seconds = appState.timer.focusTime.seconds; 
    }
    else if(appState.sessionStatus === 'Short Break')
    {
        minutes = appState.timer.shortBreaktime.minutes;
        seconds = appState.timer.shortBreaktime.seconds; 
    }
    else if(appState.sessionStatus === 'Long Break')
    {
        minutes = appState.timer.longBreak.minutes;
        seconds = appState.timer.longBreak.seconds;   
    }

    if(appState.timer.timerState == 'active')
    {
        appState.timer.timerState = 'paused';
        clearInterval(appState.timer.timerInterval);
        appState.timer.timerInterval = null;
        appState.timer.autoStart = false; 
    }
    else{
        appState.timer.timerState = 'active';
        appState.timer.autoStart = true; 
        timerFunction({minutes , seconds}, appState.sessionStatus);
    }
    renderState(appState);
}
 function router(components)
{
   
    components.backShowcaseBtn.addEventListener('click', () => {
        changeView('Showcase');
    })  
    components.timerBtn.addEventListener('click', timerButtonEvent)
    components.settingBtn.addEventListener('click', () => {
        changeView('Settings');
    })
    components.exitSettingBtn.addEventListener('click', () => {
        changeView('Home');
    })
    components.toggleDuration.addEventListener('click', () => {
        components.toggleDuration.classList.add('active')
        components.toggleNotification.classList.remove('active')
        statefulComponents.durationSettings.classList.remove('hidden')
        statefulComponents.notificationSettings.classList.add('hidden')
    })
    components.toggleNotification.addEventListener('click', () => {
        components.toggleDuration.classList.remove('active')
        components.toggleNotification.classList.add('active')
        statefulComponents.durationSettings.classList.add('hidden')
        statefulComponents.notificationSettings.classList.remove('hidden')
    })
}


function changeBackground(appState)
{
    if(appState.view !== 'Showcase') 
    {
        appState.background = `var(--color-primary)`;
    }
    else{
        appState.background = `radial-gradient(
            ellipse 120% 60% at 50% 0%, 
            var(--color-secondary) 0%, 
            rgba(252, 56, 21, 0.5) 60%, 
            rgba(0,0,0,0) 100%
        ),
        linear-gradient(
            to bottom, 
            rgba(0,0,0,0.85) 0%, 
            rgba(0,0,0,1) 100%
        )`
    }
    statefulComponents.background.style.background = appState.background;
}
function changeTimer(currentTime, sessionStatus)
{
    if(sessionStatus === 'Focus')
    {
        appState.timer.focusTime = { minutes: currentTime.minutes , seconds: currentTime.seconds};
    }
    
    if(sessionStatus === 'Short Break')
    {
        appState.timer.shortBreaktime = { minutes: currentTime.minutes , seconds: currentTime.seconds};
    }
    
    if(sessionStatus === 'Long Break')
    {
        appState.timer.longBreak = { minutes: currentTime.minutes , seconds: currentTime.seconds};
    }
    renderState(appState);

}
function percentageCompletion(currentTime, startTime) {
    const startTotalSeconds = startTime.minutes * 60 + startTime.seconds;
    const currentTotalSeconds = currentTime.minutes * 60 + currentTime.seconds;
    const percentSpent = ((startTotalSeconds - currentTotalSeconds) / startTotalSeconds) * 100;
    return percentSpent;
}
 

function autoStartNextTimer() {
    if(!appState.timer.autoStart) return;
    
    setTimeout(() => {
        let minutes, seconds;
        if(appState.sessionStatus === 'Focus') {
            minutes = appState.timer.focusTime.minutes;
            seconds = appState.timer.focusTime.seconds; 
        } else if(appState.sessionStatus === 'Short Break') {
            minutes = appState.timer.shortBreaktime.minutes;
            seconds = appState.timer.shortBreaktime.seconds; 
        } else if(appState.sessionStatus === 'Long Break') {
            minutes = appState.timer.longBreak.minutes;
            seconds = appState.timer.longBreak.seconds;   
        }
        
        appState.timer.timerState = 'active';
        timerFunction({minutes, seconds}, appState.sessionStatus);
        renderState(appState);
    }, 1000); // 1 second delay before auto-starting
}

function changeSessionStatus(currentStatus)
{
    if(currentStatus === 'Focus') 
    {
        appState.timer.currentNumSession++;
        if(appState.timer.currentNumSession === appState.timer.longBreakAfterSess) 
        {
            appState.sessionStatus = 'Long Break';
            appState.timerIcon = './assets/icons/coffee.png';
            appState.timer.autoStart = true;
        }
        else 
        {
            appState.sessionStatus = 'Short Break';
            appState.timerIcon = './assets/icons/coffee.png';
            appState.timer.autoStart = true;
        }
    }
    else if (currentStatus === 'Short Break')
    { 
        appState.sessionStatus = 'Focus';
        appState.timerIcon = './assets/icons/eye.png';
        appState.timer.autoStart = true;
    }
    else if (currentStatus === 'Long Break')
    {
        appState.sessionStatus = 'Focus';
        appState.timerIcon = './assets/icons/eye.png';
        appState.timer.currentNumSession = 0; // Reset session counter and tiles
        appState.timer.autoStart = false; // Stop auto-starting after long break
        alert('Long break finished! You can start a new cycle when ready.');
    }

    renderState(appState);
    autoStartNextTimer();
}
 
function timerFunction(startTime,sessionStatus)
{
    let {minutes , seconds} = startTime;
    console.log(minutes);
    appState.timer.timerInterval = setInterval(() =>
    {
        if(seconds > 0 )
        {
            seconds--;
            appState.timer.timeCompletion = percentageCompletion({minutes,seconds}, startTime);
            changeTimer({minutes, seconds}, sessionStatus);

        }else if (seconds == 0 && minutes == 0)
        {
            clearInterval(appState.timer.timerInterval);
            appState.timer.timerInterval = null;
            appState.timer.timerState = 'paused';
            appState.timer.timeCompletion = 0;
            changeTimer({ minutes: startTime.minutes, seconds: startTime.seconds }, sessionStatus)
            changeSessionStatus(sessionStatus);
        }
        else if( seconds == 0)
        {
            minutes--;
            seconds = 59;
            changeTimer({minutes, seconds}, sessionStatus);

        }
    }, 1000);
}

function init()
{
    document.addEventListener('DOMContentLoaded' , () =>
    {
        renderState(appState);
        router(eventComponents);
    })
}

init();
