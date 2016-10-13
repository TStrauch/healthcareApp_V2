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

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, public questionProvider: QuestionProvider) {

    this.category = this.params.get('category');

    this.questionProvider.getQuestions(this.category).then(data => {
      this.questions = data;
    });

  }


  ionViewDidLoad() {
    console.log('Hello Questionnaire Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
