var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Questionnaire } from '../questionnaire/questionnaire';
import { TrainingExercisePage } from "../training-exercise-page/training-exercise-page";
import { TrainingProvider } from "../../providers/training-provider";
import { UserProvider } from "../../providers/user-provider";
/*
  Generated class for the TrainingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var TrainingPage = (function () {
    function TrainingPage(navCtrl, modalCtrl, userProvider, trainingProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.userProvider = userProvider;
        this.trainingProvider = trainingProvider;
        this.userProvider.getCurrentUser().subscribe(function (user) {
            _this.trainingProvider.getNewTraining(user.training_count).then(function (trainingSet) {
                _this.trainingData = trainingSet;
                console.log(_this.trainingData);
            });
        });
    }
    TrainingPage.prototype.ionViewDidLoad = function () {
        console.log('Hello TrainingPage Page');
    };
    TrainingPage.prototype.showModal = function (category) {
        this.modal = this.modalCtrl.create(Questionnaire, category);
        this.modal.present();
    };
    TrainingPage.prototype.openTrainingModal = function () {
        this.modal = this.modalCtrl.create(TrainingExercisePage);
        this.modal.present();
    };
    TrainingPage = __decorate([
        Component({
            selector: 'page-training-page',
            templateUrl: 'training-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, ModalController, UserProvider, TrainingProvider])
    ], TrainingPage);
    return TrainingPage;
}());
