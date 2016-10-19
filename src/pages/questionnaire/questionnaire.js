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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionProvider } from "../../providers/question-provider";
/*
  Generated class for the Questionnaire page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Questionnaire = (function () {
    function Questionnaire(navCtrl, params, viewCtrl, questionProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.questionProvider = questionProvider;
        this.category = this.params.get('category');
        this.questionProvider.getQuestions(this.category).then(function (data) {
            _this.questions = data;
            _this.length = _this.questions.length;
            _this.actualQuestion = _this.questions[_this.counter];
        });
        this.counter = 0;
        // Set scale for every question
        this.scale = [
            { value: '1', display: 'Strongly Agree' },
            { value: '2', display: 'Agree' },
            { value: '3', display: 'Agree somewhat' },
            { value: '4', display: 'Undecided' },
            { value: '5', display: 'Disagree somewhat' },
            { value: '6', display: 'Disagree' },
            { value: '7', display: 'Strongly disagree' }
        ];
    }
    Questionnaire.prototype.sendQuestion = function () {
        //---------------------------------------------
        //Add here the sending to firebase, if structure is clear
        //---------------------------------------------
        console.log('Question Nr:   ' + this.actualQuestion.id + '   Answer:' + this.form);
        if (this.counter < (this.length - 1)) {
            this.counter++;
            this.actualQuestion = this.questions[this.counter];
            this.form = null;
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    Questionnaire.prototype.ionViewDidLoad = function () {
        console.log('Hello Questionnaire Page');
    };
    Questionnaire = __decorate([
        Component({
            selector: 'page-questionnaire',
            templateUrl: 'questionnaire.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, QuestionProvider])
    ], Questionnaire);
    return Questionnaire;
}());
