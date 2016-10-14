import { Component } from '@angular/core';
import {NavController, Platform, NavParams, ViewController} from 'ionic-angular';
import {QuestionProvider} from "../../providers/question-provider";

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
  scale;
  answer;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              public questionProvider: QuestionProvider) {

    this.category = this.params.get('category');

    this.questionProvider.getQuestions(this.category).then(data => {
      this.questions = data;
    });

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


  ionViewDidLoad() {
    console.log('Hello Questionnaire Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
