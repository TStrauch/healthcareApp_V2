import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import { QuestionProvider } from "../../providers/question-provider";
import { LogProvider } from "../../providers/log-provider";
import * as moment from 'moment';

/*
  Generated class for the Questionnaire page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questionnaire',
  templateUrl: 'questionnaire.html'
})
export class Questionnaire {
  category;
  questions;
  actualQuestion;
  scale;
  answer;
  length;
  counter;
  form;
  answers: any;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public questionProvider: QuestionProvider,
    public logProvider: LogProvider) {

    this.category = this.params.get('category');

    this.questionProvider.getQuestions(this.category).then(data => {
      this.questions = data;
      this.length = this.questions.length;
      this.actualQuestion = this.questions[this.counter];
    });

    this.counter = 0;

    // Increase counter and log start time
    this.logProvider.logCounter("questionnaire_count").subscribe(() => {
      this.logProvider.logTime("questionnaire_count", "questionnaire");
    });

    this.answers = [];



    // Set scale for every question
    // this.scale = [
    //   { value: '1', display: 'Strongly Agree' },
    //   { value: '2', display: 'Agree' },
    //   { value: '3', display: 'Agree somewhat' },
    //   { value: '4', display: 'Undecided' },
    //   { value: '5', display: 'Disagree somewhat' },
    //   { value: '6', display: 'Disagree' },
    //   { value: '7', display: 'Strongly disagree' }
    // ];
    this.scale = [
      { value: '0', display: 'Never' },
      { value: '1', display: 'Almost Never' },
      { value: '2', display: 'Sometimes' },
      { value: '3', display: 'Fairly Often' },
      { value: '4', display: 'Very Often' }
    ];


  }


  sendQuestion() {

    //---------------------------------------------
    //Add here the sending to firebase, if structure is clear
    //---------------------------------------------

    this.logProvider.logQuestion(this.actualQuestion.id, this.form).subscribe(() => {

      console.log('Question Nr:   ' + this.actualQuestion.id + '   Answer:' + this.form);

      this.answers.push(this.form);

      if (this.counter < (this.length - 1)) {
        this.counter++;
        this.actualQuestion = this.questions[this.counter];
        this.form = null;
      }
      else {
        //give answers to provider. provider then calculated PSS score and saves it to the db
        this.questionProvider.savePSS({answers: this.answers, questions: this.questions});
        this.logProvider.logLastQuestionnaire();
        this.viewCtrl.dismiss();
      }

    });
  }

  ionViewDidLoad() {
    console.log('Hello Questionnaire Page');
  }

}
