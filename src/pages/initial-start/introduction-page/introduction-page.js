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
import { RootPageProvider } from "../../../providers/rootpage";
import { Signup } from "../../signup/signup";
import { InitialQuestionnaire } from "../initial-questionnaire/initial-questionnaire";
import { Push } from '@ionic/cloud-angular';
/*
  Generated class for the IntroductionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var IntroductionPage = (function () {
    function IntroductionPage(navCtrl, rootPageProvider, push) {
        this.navCtrl = navCtrl;
        this.rootPageProvider = rootPageProvider;
        this.push = push;
    }
    IntroductionPage.prototype.accept = function () {
        var _this = this;
        //   NativeStorage.setItem('introduction', {seen: true})
        // .then(
        //   () => console.log('Stored item!'),
        //   error => console.error('Error storing item', error)
        // );
        //ask for push notifications
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log("Push Token registered: " + t.registered);
            if (t) {
                console.log('Token saved:', t.token);
                var loginDoneNavOptions = {
                    "page": InitialQuestionnaire,
                    "navParams": {},
                    "navOpt": { "animate": true, "direction": "forward" }
                };
                _this.rootPageProvider.setRootPage(Signup, { "initial": true, "loginDoneNavOptions": loginDoneNavOptions }, { "animate": true, "direction": "forward" });
            }
            else {
                console.log("User declined!");
            }
        });
        PushNotification.hasPermission(function (data) {
            if (data.isEnabled) {
                console.log('isEnabled');
            }
        });
    };
    IntroductionPage.prototype.ionViewDidLoad = function () {
        console.log('Hello IntroductionPage Page');
    };
    IntroductionPage = __decorate([
        Component({
            selector: 'page-introduction-page',
            templateUrl: 'introduction-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, RootPageProvider, Push])
    ], IntroductionPage);
    return IntroductionPage;
}());
