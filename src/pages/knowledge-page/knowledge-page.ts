import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {TrainingProvider} from "../../providers/training-provider";
import {Exercise} from "../../model/exercise";
import {KnowledgeDetailPage} from "../knowledge-detail/knowledge-detail";

/*
  Generated class for the KnowledgePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-knowledge-page',
  templateUrl: 'knowledge-page.html'
})
export class KnowledgePage {
  exercises: Exercise[];
  modalKnowledgeDetail: any;

  constructor(public navCtrl: NavController,
              public trainingProvider: TrainingProvider,
              public modalCtrl: ModalController
  ) {
    this.trainingProvider.getAllExercises().then(data => {
      this.exercises = data;
    });
  }

  ionViewDidLoad() {
    console.log('Hello KnowledgePage Page');
  }

  onPageLoaded() {
    debugger;
  }


exerciseSelected(id){
    this.modalKnowledgeDetail = this.modalCtrl.create(KnowledgeDetailPage, {"id": id});
    this.modalKnowledgeDetail.present();
  }

 /* exerciseSelected(index) {
    this.navCtrl.push(KnowledgeDetailPage, {
      exercise: this.exercises[index],
    });
  } */

}
