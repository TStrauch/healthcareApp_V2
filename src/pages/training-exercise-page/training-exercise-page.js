var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { UserProvider } from "../../providers/user-provider";
/*
  Generated class for the TrainingExercisePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var TrainingExercisePage = (function () {
    function TrainingExercisePage(navCtrl, userProvider, trainingProvider, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.userProvider = userProvider;
        this.trainingProvider = trainingProvider;
        this.viewCtrl = viewCtrl;
        this.userProvider.getCurrentUser().subscribe(function (user) {
            _this.trainingProvider.getNewTraining(user.training_count).then(function (trainingSet) {
                _this.buttonText = "Start Exercise";
                _this.counter = 0;
                _this.trainingData = trainingSet;
                _this.actualExercise = _this.trainingData[_this.counter];
                // -----------  
                //set here real time of the exercise this.actualExercise.duration, 5 is for short demo cases
                // -----------  
                _this.timer = { seconds: 5, remainingTime: 5, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };
                debugger;
            });
        });
    }
    TrainingExercisePage.prototype.start = function () {
        // Move to next exercise, when counter is finished and the user clicks on the button
        if (this.timer.hasFinished) {
            this.counter++;
            if (this.counter < 3) {
                this.actualExercise = this.trainingData[this.counter];
                this.buttonText = "Start Exercise";
                this.initTimer();
            }
            else {
                // --------------------------
                // Set record for finished training
                //---------------------------
                this.viewCtrl.dismiss();
            }
        }
        else {
            this.startTimer();
            this.setButtonText();
        }
    };
    // Set different button next between switching, other texts are set in start()
    TrainingExercisePage.prototype.setButtonText = function () {
        if (this.counter < 2) {
            this.buttonText = "Next Exercise";
        }
        else {
            this.buttonText = "Finish Training";
        }
    };
    // start timer and set variables
    TrainingExercisePage.prototype.startTimer = function () {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.runTimer();
    };
    // run the timer
    TrainingExercisePage.prototype.runTimer = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.timer.runTimer) {
                return;
            }
            _this.timer.remainingTime--;
            _this.timer.displayTime = _this.visualizeClock(_this.timer.remainingTime);
            if (_this.timer.remainingTime > 0) {
                _this.runTimer();
            }
            else {
                _this.timer.hasFinished = true;
            }
        }, 1000);
    };
    // visualize 
    TrainingExercisePage.prototype.visualizeClock = function (inputSeconds) {
        var sec_num = parseInt(inputSeconds.toString(), 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var minutesString = '';
        var secondsString = '';
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        this.timer.text = minutesString + ':' + secondsString;
    };
    TrainingExercisePage.prototype.initTimer = function () {
        // -----------  
        //set here real time of the exercise this.actualExercise.duration, 5 is for short demo cases
        // -----------  
        this.timer = { seconds: 5, remainingTime: 5, runTimer: false, hasStarted: false, hasFinished: false, text: '1:00' };
    };
    TrainingExercisePage = __decorate([
        Component({
            selector: 'page-training-exercise-page',
            templateUrl: 'training-exercise-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, UserProvider, TrainingProvider, ViewController])
    ], TrainingExercisePage);
    return TrainingExercisePage;
}());
