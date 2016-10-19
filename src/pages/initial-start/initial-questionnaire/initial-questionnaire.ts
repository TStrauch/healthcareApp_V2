import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the InitialQuestionnaire page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-initial-questionnaire',
  templateUrl: 'initial-questionnaire.html'
})
export class InitialQuestionnaire {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello InitialQuestionnaire Page');
  }

}
