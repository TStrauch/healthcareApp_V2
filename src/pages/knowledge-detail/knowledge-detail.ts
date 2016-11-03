import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import {TrainingProvider} from "../../providers/training-provider";
import {LogProvider} from "../../providers/log-provider";

/*
  Generated class for the KnowledgeDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'knowledge-detail',
  templateUrl: 'knowledge-detail.html',
})
export class KnowledgeDetailPage {

  id: any;
  exerciseInfo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public trainingProvider: TrainingProvider,
    public viewCtrl: ViewController,
    public logProvider: LogProvider) {

   this.exerciseInfo = this.navParams.get("exercise");
   //  this.id = navParams.get("id");
   //
   //

   //  this.trainingProvider.getSingleExercise(this.id).then(data => {
   //    this.exerciseInfo = data;
   //  });
  }

  ionViewDidEnter() {
   this.logProvider.logCounter("knowledgePage_count").subscribe();
  }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }

}
