var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { IntroductionPage } from '../pages/initial-start/introduction-page/introduction-page';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
import { firebaseconfig } from "./app.module";
import { RootPageProvider } from "../providers/rootpage";
import { Push } from '@ionic/cloud-angular';
import { AppealPage } from "../pages/appeal-page/appeal-page";
export var MyApp = (function () {
    function MyApp(platform, push, af, rootPageProvider, modalCtrl) {
        var _this = this;
        this.push = push;
        this.af = af;
        this.rootPageProvider = rootPageProvider;
        this.modalCtrl = modalCtrl;
        firebase.initializeApp(firebaseconfig);
        //show login page if user is not logged in. otherwise show home page.
        rootPageProvider.getRootPageStream().subscribe(function (navData) {
            var newRootPage = navData.rootPage;
            var navParams = navData.navParams;
            var navOpt = navData.navOpt;
            _this.nav.setRoot(newRootPage, navParams, navOpt);
        });
        // this.push.register().then((t: PushToken) => {
        //   return this.push.saveToken(t);
        // }).then((t: PushToken) => {
        //   console.log('Token saved:', t.token);
        // });
        this.push.rx.notification()
            .subscribe(function (msg) {
            //{"raw":{"message":"Get 150% off!","title":"Test Push","additionalData":
            // {"payload":{"key":"pushValue"},"foreground":true,"coldstart":false}},
            // "text":"Get 150% off!","title":"Test Push","app":{"asleep":false,"closed":false},
            // "payload":{"key":"pushValue"}}
            //access the payload:
            //msg.payload.key
            var payload = msg.payload;
            _this.modal = _this.modalCtrl.create(AppealPage, { url: payload.url });
            _this.modal.present();
            console.log("received push");
            //alert(msg.title + ': ' + msg.text);
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
    MyApp.prototype.ngAfterViewInit = function () {
        // Let's navigate from TabsPage to Page1
        // firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //     // this.rootPage = HomePage;
        //     this.nav.push(TabsPage);
        //   } else {
        //     // NativeStorage.getItem('introduction')
        //     //   .then(
        //     //   this.rootPage = IntroductionPage
        //     //   );
        //
        //     //this should depend on whether its the initial start of the app or not.
        //     this.nav.push(IntroductionPage);
        //   }
        // });
        this.rootPageProvider.setRootPage(IntroductionPage, {}, {});
    };
    __decorate([
        ViewChild('mainNav'), 
        __metadata('design:type', NavController)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            template: "<ion-nav #mainNav [root]=\"rootPage\"></ion-nav>"
        }), 
        __metadata('design:paramtypes', [Platform, Push, AngularFire, RootPageProvider, ModalController])
    ], MyApp);
    return MyApp;
}());
