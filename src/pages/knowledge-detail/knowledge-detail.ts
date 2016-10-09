import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TrainingProvider} from "../../providers/training-provider";

/*
  Generated class for the KnowledgeDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'knowledge-detail.html',
})
export class KnowledgeDetailPage {

  id: any;
  exerciseInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public trainingProvider: TrainingProvider) {

    this.exerciseInfo = this.navParams.get("exercise");
    // this.id = navParams.get("id");
    // this.exerciseInfo = {id:1, name:'Backstretching'};

    // this.trainingProvider.getSingleExercise(this.id).then(data => {
    //   this.exerciseInfo = data;
    // });
  }

}
