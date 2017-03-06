var countdown;

var pomodoro = {
  sessionTime: { seconds: 1500, isFinished: false },
  breakTime: { seconds: 300, isFinished: false },
  isPaused: false,
  timer: function(obj){
    this.displayTimeLeft(obj.seconds)
    var self = this;
    countdown = setInterval(function() {
      if(!self.isPaused){
        obj.seconds--;
        view.displayTimerTime()
        // self.displayTimeLeft(obj.seconds)
      } else {
        console.log("paused");
      }
      if(obj.seconds <= 0){
        obj.isFinished = true;
        clearInterval(countdown);
        return;
      }
    }, 100)},
  displayTimeLeft: function(seconds){
    const min = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    console.log(`${min}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`);
    return `${min}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`;
  },
  pauseTime: function(){
    this.isPaused = !this.isPaused;
  },
  startTimer: function(){
    // debugger;
    if(!this.sessionTime.isFinished){
      this.timer(this.sessionTime);
    } else if (!this.breakTime.isFinished){
      this.timer(this.breakTime);
    } else {
      // console.log("Finished");
      this.reset();
    }
  },
  reset: function(){
    this.sessionTime = { seconds: 1500, isFinished: false };
    this.breakTime = { seconds: 300, isFinished: false };
    this.isPaused= false;
  },
  changeTime: function(mins, obj){
    obj.seconds < 5 ? obj.seconds = 300 : obj.seconds += mins * 60;
  }
}

handlers= {
  addBreakTime: function(){
    pomodoro.changeTime(5, pomodoro.breakTime)
    view.displayBreakTime()
  },
  minusBreakTime: function(){
    pomodoro.changeTime(-5, pomodoro.breakTime)
    view.displayBreakTime()
  },
  addSessionTime: function(){
    pomodoro.changeTime(5, pomodoro.sessionTime)
    view.displaySessionTime()
  },
  minusSessionTime: function(){
    pomodoro.changeTime(-5, pomodoro.sessionTime)
    view.displaySessionTime()
  },
  startPomodoro: function(){
    pomodoro.startTimer()
    view.displayTimerTime()
  },
  pause: function(){
    pomodoro.pauseTime()
    view.displayTimerTime()
  },
  reset: function(){
    pomodoro.reset()
    view.displayTimerTime()
  }

}

view = {
  displayBreakTime: function(){
    $('#break').html(pomodoro.breakTime.seconds / 60)
  },
  displaySessionTime: function(){
    $('#session').html(pomodoro.sessionTime.seconds / 60)
  },
  displayTimerTime: function(){
    if(!pomodoro.sessionTime.isFinished){
      var timeString = pomodoro.displayTimeLeft(pomodoro.sessionTime.seconds);
      $('#time').html(timeString);
    } else if (!pomodoro.breakTime.isFinished){
      var timeString = pomodoro.displayTimeLeft(pomodoro.breakTime.seconds);
      $('#time').html(timeString)
      // $('.progress-bar').width('0%')
    } else {
      $('#time').html("Pomodoro is over, <br />Please press reset button")
    }
  }
}


view.displayBreakTime()
view.displaySessionTime()
view.displayTimerTime()
// function reset(){
//   sessionTime = {
//     seconds: 5,
//     isFinished: false
//   };
//   breakTime = {
//     seconds: 3,
//     isFinished: false
//   };
// let sessionTime = {
//   seconds: 5,
//   isFinished: false
// };
// let breakTime = {
//   seconds: 3,
//   isFinished: false
// };
// let isPaused = false
// let countdown;
//
// function timer(obj){
//   displayTimeLeft(obj.seconds)
//   countdown = setInterval(function() {
//     if(!isPaused){
//       obj.seconds--;
//       displayTimeLeft(obj.seconds);
//     } else {
//       console.log("paused");
//     }
//     if(obj.seconds <= 0){
//       obj.isFinished = true;
//       clearInterval(countdown);
//       return;
//     }
//   }, 300);
// }
//
// function displayTimeLeft(seconds){
//   const min = Math.floor(seconds / 60);
//   const remainderSeconds = seconds % 60;
//   console.log(`${min}:${remainderSeconds < 10 ? "0" : ''}${remainderSeconds}`);
// }
//
// function startPomodoro(){
//     if(!sessionTime.isFinished){
//       timer(sessionTime);
//     } else if (!breakTime.isFinished){
//       timer(breakTime);
//     } else {
//       console.log("Finished");
//       reset();
//     }
// }
//
// function pauseTime(){
//   isPaused = !isPaused
// }
//
// function reset(){
//   sessionTime = {
//     seconds: 5,
//     isFinished: false
//   };
//   breakTime = {
//     seconds: 3,
//     isFinished: false
//   };
// }
