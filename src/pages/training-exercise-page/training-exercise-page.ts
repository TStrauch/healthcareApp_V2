import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {TrainingProvider} from "../../providers/training-provider";
import {UserProvider} from "../../providers/user-provider";
import {Exercise} from "../../model/exercise";


/*
  Generated class for the TrainingExercisePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-training-exercise-page',
  templateUrl: 'training-exercise-page.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(130%, 0 , 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class TrainingExercisePage {
  counter: any;
  trainingData: Exercise[];
  actualExercise: Exercise;
  userRef: any;
  logRef: any;
  timer;
  buttonText;
  clockText;
  cardState;


  constructor(public navCtrl: NavController,
    public userProvider: UserProvider,
    public trainingProvider: TrainingProvider,
    public viewCtrl: ViewController) {

    this.userProvider.getCurrentUser().subscribe((user) => {
      this.trainingProvider.getNewTraining(user.training_count).then((trainingSet) => {
        this.buttonText = "Start Exercise";
        this.counter = 0
        this.trainingData = trainingSet;
        this.cardState = 'in';
        this.actualExercise = this.trainingData[this.counter];
        // -----------  
        //set here real time of the exercise this.actualExercise.duration, 5 is for short demo cases
        // -----------  
        this.timer = { seconds: 5, remainingTime: 5, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };
       


       //Save Training Start
        this.userProvider.getCurrentUser().subscribe((user) => {
          this.logRef = firebase.database().ref('dataLog/' + user.uid);
          var tempName = "training_" + user.training_count + "_start";
          var setObject = {};
          setObject[tempName] = new Date().getTime() ;
          this.logRef.update(setObject)
        })


      })
    });
  }

  flyIn() {
    if (this.cardState == 'out') {
      this.actualExercise = this.trainingData[this.counter];
      this.cardState = 'in';
    }
  }

  start() {
    // Move to next exercise, when counter is finished and the user clicks on the button
    if (this.timer.hasFinished) {
      this.counter++;
      if (this.counter < 3) {
        this.cardState = 'out';
        //this.actualExercise = this.trainingData[this.counter];
        this.buttonText = "Start Exercise"
        this.initTimer();
      } else {
        // --------------------------
        // Set record for finished training
        //---------------------------
        this.userProvider.getCurrentUser().subscribe((user) => {
          debugger;


          this.logRef = firebase.database().ref('dataLog/' + user.uid);
          var tempName = "training_" + user.training_count + "_end";
          var setObject = {};
          setObject[tempName] = new Date().getTime() ;
          this.logRef.update(setObject);


          this.userRef = firebase.database().ref('userProfile/' + user.uid);
          this.userRef.update({
            training_count: user.training_count + 1,

          });
        })

        this.viewCtrl.dismiss();
      }
    }
    // Start the counter
    else {
      this.startTimer();
      this.setButtonText();
    }

  }

  // Set different button next between switching, other texts are set in start()
  setButtonText() {
    if (this.counter < 2) {
      this.buttonText = "Next Exercise";
    } else {
      this.buttonText = "Finish Training";
    }
  }

  // start timer and set variables
  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.runTimer();
  }

  // run the timer
  runTimer() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.remainingTime--;
      this.timer.displayTime = this.visualizeClock(this.timer.remainingTime);
      if (this.timer.remainingTime > 0) {
        this.runTimer();
      }
      else {
        this.timer.hasFinished = true;
      }
    }, 1000);
  }

  // visualize 
  visualizeClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var minutesString = '';
    var secondsString = '';
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    this.timer.text = minutesString + ':' + secondsString;
  }

  initTimer() {
    // -----------  
    //set here real time of the exercise this.actualExercise.duration, 5 is for short demo cases
    // -----------  
    this.timer = { seconds: 5, remainingTime: 5, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };
  }

}
