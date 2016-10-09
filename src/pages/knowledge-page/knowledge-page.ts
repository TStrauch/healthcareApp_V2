import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public trainingProvider: TrainingProvider
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

  exerciseSelected(event, exercise) {
    console.log('KnowledgePage: exerciseSelected');
    this.navCtrl.push(KnowledgeDetailPage, {
      id: exercise.id,
    });
  }

}
