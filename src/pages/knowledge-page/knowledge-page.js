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
import { TrainingProvider } from "../../providers/training-provider";
import { KnowledgeDetailPage } from "../knowledge-detail/knowledge-detail";
/*
  Generated class for the KnowledgePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var KnowledgePage = (function () {
    function KnowledgePage(navCtrl, trainingProvider, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.trainingProvider = trainingProvider;
        this.modalCtrl = modalCtrl;
        this.trainingProvider.getAllExercises().then(function (data) {
            _this.exercises = data;
        });
    }
    KnowledgePage.prototype.ionViewDidLoad = function () {
        console.log('Hello KnowledgePage Page');
    };
    KnowledgePage.prototype.onPageLoaded = function () {
        debugger;
    };
    // exerciseSelected(id){
    //     this.modalKnowledgeDetail = this.modalCtrl.create(KnowledgeDetailPage, {"id": id});
    //     this.modalKnowledgeDetail.present();
    //   }
    KnowledgePage.prototype.exerciseSelected = function (index) {
        this.navCtrl.push(KnowledgeDetailPage, {
            exercise: this.exercises[index],
        });
    };
    KnowledgePage = __decorate([
        Component({
            selector: 'page-knowledge-page',
            templateUrl: 'knowledge-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, TrainingProvider, ModalController])
    ], KnowledgePage);
    return KnowledgePage;
}());
