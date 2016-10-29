import { Component, ViewChild } from '@angular/core';
import {Platform, ModalController, NavController} from 'ionic-angular';
import { StatusBar, NativeStorage, BackgroundMode } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import {IntroductionPage} from '../pages/initial-start/introduction-page/introduction-page';
import {InitialQuestionnaire} from '../pages/initial-start/initial-questionnaire/initial-questionnaire';
import { AngularFire } from 'angularfire2'
import firebase from 'firebase';
import {firebaseconfig} from "./app.module";
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {RootPageProvider} from "../providers/rootpage";


import {Push, PushToken} from '@ionic/cloud-angular';
import {AppealPage} from "../pages/appeal-page/appeal-page";
import {Signup} from "../pages/signup/signup";
import {UserProvider} from "../providers/user-provider";
import {LogProvider} from "../providers/log-provider";

import * as Rx from 'rxjs';

@Component({
  template: `<ion-nav #mainNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('mainNav') nav: NavController
  rootPage;
  modal;

  ngAfterViewInit() {

  }

  constructor(platform: Platform,
    public push: Push,
    public af: AngularFire,
    public rootPageProvider: RootPageProvider,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
    public logProvider: LogProvider) {

    firebase.initializeApp(firebaseconfig);


    //show login page if user is not logged in. otherwise show home page.
    rootPageProvider.getRootPageStream().subscribe((navData) => {
      let newRootPage = navData.rootPage;
      let navParams = navData.navParams;
      let navOpt = navData.navOpt;

      this.nav.setRoot(newRootPage, navParams, navOpt);
    })

    //show initial root page
    var initialOpening = false; //will be set via local storage

    firebase.auth().onAuthStateChanged((user) => {
      if (user && !initialOpening) {
        // this.logProvider.logCounter("appOpening_count").subscribe(() => {
        //   this.logProvider.logTime("appOpening_count", "appOpening");
        //   console.log("appOpening count increased");
          this.rootPageProvider.setRootPage(TabsPage, {}, {});
        // });
      } else if(initialOpening) {
          this.rootPageProvider.setRootPage(IntroductionPage, {}, {});
      } else{
          this.rootPageProvider.setRootPage(LoginPage, {"initial": true}, {});
      }
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


    platform.pause.subscribe(() => {
      this.logProvider.logTime("appOpening_count", "appPausing");
    });

    platform.resume.subscribe(() => {
      this.logProvider.logCounter("appOpening_count").subscribe(() => {
        this.logProvider.logTime("appOpening_count", "appOpening");
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }




}
