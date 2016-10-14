import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {Questionnaire} from '../questionnaire/questionnaire'

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('Hello TrainingPage Page');
  }

  showModal(category){

    this.modal = this.modalCtrl.create(Questionnaire, category);
    this.modal.present();
  }

}
