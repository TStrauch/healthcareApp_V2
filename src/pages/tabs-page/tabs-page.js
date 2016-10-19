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
import { NavController } from 'ionic-angular';
import { TrainingPage } from "../training-page/training-page";
import { ProfilePage } from "../profile-page/profile-page";
import { KnowledgePage } from "../knowledge-page/knowledge-page";
import { Push } from '@ionic/cloud-angular';
/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var TabsPage = (function () {
    function TabsPage(navCtrl, push) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.push = push;
        this.tab1Root = TrainingPage;
        this.tab2Root = ProfilePage;
        this.tab3Root = KnowledgePage;
        //make sure push is enabled
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log('Token saved:', t.token);
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('Hello TabsPage Page');
    };
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, Push])
    ], TabsPage);
    return TabsPage;
}());
