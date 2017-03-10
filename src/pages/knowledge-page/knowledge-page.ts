import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { Exercise } from "../../model/exercise";
import { KnowledgeDetailPage } from "../knowledge-detail/knowledge-detail";

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
  exercisesNeck: Exercise[];
  exercisesShoulder: Exercise[];
  exercisesEye: Exercise[];
  exercisesBody: Exercise[];
  detailExercise: Exercise;
  modalKnowledgeDetail: any;

  constructor(public navCtrl: NavController,
    public trainingProvider: TrainingProvider,
    public modalCtrl: ModalController
  ) {

    this.trainingProvider.getAllExercises().then(data => {
      this.exercisesNeck = data.category_one;
      this.exercisesShoulder = data.category_two;
      this.exercisesEye = data.category_three;
      this.exercisesBody = data.category_four;
    });
  }

  ionViewDidLoad() {
    console.log('Hello KnowledgePage Page');
  }

  onPageLoaded() {
    debugger;
  }


  // exerciseSelected(id){
  //     this.modalKnowledgeDetail = this.modalCtrl.create(KnowledgeDetailPage, {"id": id});
  //     this.modalKnowledgeDetail.present();
  //   }

  exerciseSelected(category, index) {

    if (category === 1) {
      this.detailExercise = this.exercisesNeck[index];
    } else if (category == 2) {
      this.detailExercise = this.exercisesShoulder[index];
    } else if (category == 3) {
      this.detailExercise = this.exercisesEye[index];
    } else if (category == 4) {
      this.detailExercise = this.exercisesBody[index];
    }
    this.navCtrl.push(KnowledgeDetailPage, {
      exercise: this.detailExercise,
    });
  }

}
