import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {Questionnaire} from '../questionnaire/questionnaire'
import {TrainingExercisePage} from "../training-exercise-page/training-exercise-page";
import {TrainingProvider} from "../../providers/training-provider";
import {UserProvider} from "../../providers/user-provider";
import {LogProvider} from "../../providers/log-provider";
import {Exercise} from "../../model/exercise";

/*
  Generated class for the TrainingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-training-page',
  templateUrl: 'training-page.html'
})
export class TrainingPage {

  modal: any;
  trainingData: Exercise[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
    public trainingProvider: TrainingProvider,
    public logProvider: LogProvider) {

    this.logProvider.getCount("training_count").subscribe((data) => {
      this.trainingProvider.getNewTraining(data).then((trainingSet) => {
        this.trainingData = trainingSet;
        console.log(this.trainingData);
      });
    });

     /* this.userProvider.getCurrentUser().subscribe((user) => {
         this.trainingProvider.getNewTraining(user.training_count).then((trainingSet) => {
           this.trainingData = trainingSet;
           console.log(this.trainingData);
         })
       }); */
       
  }

  ionViewDidLoad() {
    console.log('Hello TrainingPage Page');
  }

  showModal(category) {

    this.modal = this.modalCtrl.create(Questionnaire, category);
    this.modal.present();
  }

  openTrainingModal() {
    this.modal = this.modalCtrl.create(TrainingExercisePage)
    this.modal.present();
  }

}
