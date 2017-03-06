var countdown;
var sessionTime;
var breakTime;

var pomodoro = {
    currentTime: 0,
    SPEED: 1000,
    time: [{
        name: 'session',
        duration: 1500
    }, {
        name: 'break',
        duration: 300
    }],
    isPaused: false,
    timer: function(current) {
        this.displayTimeLeft(this.time[current].duration)
        var self = this;
        countdown = setInterval(function() {
            if (!self.isPaused) {
                self.time[current].duration--;
                view.displayTimerTime(current);
                view.displayTimerProgress(current);
            }
            if (self.time[current].duration <= 0) {
                self.currentTime = (self.currentTime + 1);
                if (self.currentTime === 2) {
                    clearInterval(countdown);
                    alert("Break time is over, please restart pomodoro");
                    self.reset();
                    view.displayTimerTime(0);
                    return;
                } else {
                    clearInterval(countdown);
                    alert("Work Time Up, start break time");
                    self.timer(self.currentTime);
                }
            }
        }, self.SPEED)
    },
    displayTimeLeft: function(seconds) {
        const min = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        return `${min}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`;
    },
    pauseTime: function() {
        this.isPaused = !this.isPaused;
    },
    reset: function() {
        clearInterval(countdown);
        $('.btn-md').removeClass('disabled')
        this.time = [{
            name: 'session',
            duration: 1500
        }, {
            name: 'break',
            duration: 300
        }];
        this.isPaused = false;
        this.currentTime = 0;
        this.SPEED = 1000;

    },
    changeTime: function(mins, obj) {
        obj.duration < 0 ? obj.duration = 0 : obj.duration += mins * 60;
    },
    changeSpeed: function(){
        clearInterval(countdown);
        this.SPEED = 30;
        this.timer(this.currentTime)
    }


}

handlers = {
    addBreakTime: function() {
        pomodoro.changeTime(5, pomodoro.time[1])
        view.displayBreakTime()
    },
    minusBreakTime: function() {
        pomodoro.changeTime(-5, pomodoro.time[1])
        view.displayBreakTime()
    },
    addSessionTime: function() {
        pomodoro.changeTime(5, pomodoro.time[0])
        view.displaySessionTime()
        view.displayTimerTime(0)
    },
    minusSessionTime: function() {
        pomodoro.changeTime(-5, pomodoro.time[0])
        view.displaySessionTime()
        view.displayTimerTime(0)
    },
    startPomodoro: function() {
        breakTime = $('#break').text();
        sessionTime = $('#session').text();
        $('.btn-md').addClass('disabled')
        pomodoro.timer(pomodoro.currentTime)
    },
    pause: function() {
        pomodoro.pauseTime()
    },
    reset: function() {
        pomodoro.reset()
        view.displayBreakTime()
        view.displaySessionTime()
        view.displayTimerTime(0)
    }

}

view = {
    displayBreakTime: function() {
        $('#break').html(pomodoro.time[1].duration / 60)
    },
    displaySessionTime: function() {
        $('#session').html(pomodoro.time[0].duration / 60)
    },
    displayTimerTime: function(i) {
        var timeString = pomodoro.displayTimeLeft(pomodoro.time[i].duration);
        $('#time').html(timeString);

    },
    displayTimerProgress: function(i){
        if(i === 0){
            $('.progress-bar').removeClass("progress-bar-warning")
            var totalProgress = sessionTime * 1 * 60
        } else {
            $('.progress-bar').addClass("progress-bar-warning")
            var totalProgress = breakTime * 1 * 60
        }
        var progress = 100-((pomodoro.time[i].duration / totalProgress)*100) + '';

        $('.progress-bar').css('width', progress + '%');
    }
}


view.displayBreakTime()
view.displaySessionTime()
view.displayTimerTime(0)
