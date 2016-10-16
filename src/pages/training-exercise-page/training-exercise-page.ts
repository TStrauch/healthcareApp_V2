import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TrainingExercisePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-training-exercise-page',
  templateUrl: 'training-exercise-page.html'
})
export class TrainingExercisePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TrainingExercisePage Page');
  }

}
