import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { UserProvider } from "../../providers/user-provider";
import { Exercise } from "../../model/exercise";
import { LogProvider } from "../../providers/log-provider";
import { QuestionProvider } from "../../providers/question-provider";
import { Questionnaire } from '../questionnaire/questionnaire'


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
  trainingCounter: number;
  trainingData: Exercise[];
  actualExercise: Exercise;
  userRef: any;
  logRef: any;
  modal: any;
  timer;
  buttonText;
  clockText;
  cardState;

  constructor(public navCtrl: NavController,
    public userProvider: UserProvider,
    public trainingProvider: TrainingProvider,
    public viewCtrl: ViewController,
    public logProvider: LogProvider,
    public modalCtrl: ModalController,
    public questionProvider: QuestionProvider) {


    this.logProvider.getCount("training_count").subscribe((data) => {
      this.trainingProvider.getNewTraining(data).then((trainingSet) => {
        this.buttonText = "Start Exercise";
        this.counter = 0
        this.trainingData = trainingSet;
        this.cardState = 'in';
        this.actualExercise = this.trainingData[this.counter];
        this.trainingCounter = data + 1;

        // -----------
        //set here real time of the exercise this.actualExercise.duration, 5 is for short demo cases
        // -----------
        this.timer = { seconds: 60, remainingTime: 60, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };

        //Count training and set timestamp
        this.logProvider.logCounter("training_count").subscribe(() => {
          this.logProvider.logTraining("start");
        });
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

        // Set timestamp for finished training
        this.logProvider.logTraining("end");

       this.questionProvider.questionnaireAvailable(this.trainingCounter).subscribe((data) => {
        if (data){
          this.modal = this.modalCtrl.create(Questionnaire, { category: 3 });
          this.modal.present().then(() => {
            this.viewCtrl.dismiss();
          });
        }  else{

        this.viewCtrl.dismiss();

        }
       });
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
    this.timer = { seconds: 60, remainingTime: 60, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };
  }

}
