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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
/*
  Generated class for the KnowledgeDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var KnowledgeDetailPage = (function () {
    function KnowledgeDetailPage(navCtrl, navParams, trainingProvider, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trainingProvider = trainingProvider;
        this.viewCtrl = viewCtrl;
        this.exerciseInfo = this.navParams.get("exercise");
        //  this.id = navParams.get("id");
        //
        //
        //  this.trainingProvider.getSingleExercise(this.id).then(data => {
        //    this.exerciseInfo = data;
        //  });
    }
    KnowledgeDetailPage = __decorate([
        Component({
            templateUrl: 'knowledge-detail.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, TrainingProvider, ViewController])
    ], KnowledgeDetailPage);
    return KnowledgeDetailPage;
}());
