import { Component } from '@angular/core';
import {Platform, ModalController} from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import {IntroductionPage} from '../pages/introduction-page/introduction-page';
import { AngularFire } from 'angularfire2'
import firebase from 'firebase';
import {firebaseconfig} from "./app.module";
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {RootPageProvider} from "../providers/rootpage";

import { NativeStorage } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';
import {AppealPage} from "../pages/appeal-page/appeal-page";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;
  modal;

  constructor(platform: Platform,
    public push: Push,
    public af: AngularFire,
    public rootPageProvider: RootPageProvider,
    public modalCtrl: ModalController) {
    firebase.initializeApp(firebaseconfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.rootPage = HomePage;
        this.rootPage = TabsPage;

        console.log("I'm here! HomePage");
      } else {
        NativeStorage.getItem('introduction')
          .then(
          this.rootPage = LoginPage,
          this.rootPage = IntroductionPage
          );

        //console.log("I'm here! IntroductionPage");
      }
    });

    //show login page if user is not logged in. otherwise show home page.
    rootPageProvider.getRootPageStream().subscribe((newRootPage) => {
      this.rootPage = newRootPage;
    })

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
    this.push.rx.notification()
      .subscribe((msg) => {
        //{"raw":{"message":"Get 150% off!","title":"Test Push","additionalData":
        // {"payload":{"key":"pushValue"},"foreground":true,"coldstart":false}},
        // "text":"Get 150% off!","title":"Test Push","app":{"asleep":false,"closed":false},
        // "payload":{"key":"pushValue"}}
        //access the payload:
        //msg.payload.key
        let payload: any = msg.payload;
        this.modal = this.modalCtrl.create(AppealPage, { url: payload.url });
        this.modal.present();

        console.log("received push");
        //alert(msg.title + ': ' + msg.text);
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
