import { Component, ViewChild } from '@angular/core';
import {Platform, ModalController, NavController} from 'ionic-angular';
import { StatusBar, NativeStorage, Push as PushNotification } from 'ionic-native';

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
  initialOpening = true;
  pNsEnabled = false;

  ngAfterViewInit() {

  }

  constructor(public platform: Platform,
    public push: Push,
    public af: AngularFire,
    public rootPageProvider: RootPageProvider,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
    public logProvider: LogProvider) {


    /**
     * firebase setup
     */
    firebase.initializeApp(firebaseconfig);


    /**
     * handle any rootpage changes centrally here
     */
    rootPageProvider.getRootPageStream().subscribe((navData) => {
      let newRootPage = navData.rootPage;
      let navParams = navData.navParams;
      let navOpt = navData.navOpt;

      //gets executed when user comes form introduction screen via login. then the initial questionnaire is not executed.
      if(navParams.initialOpening){
        NativeStorage.setItem('initialOpening', {value: false}).then(data => {
          console.log("initial opening set: "+data);
          this.initialOpening = false;
          this.nav.setRoot(newRootPage, navParams, navOpt);
        }, error => {
          console.error(error);
          this.nav.setRoot(newRootPage, navParams, navOpt);
        });
      }
      else{
        this.nav.setRoot(newRootPage, navParams, navOpt);
      }
    })

    /**
     * call local storage to set initialOpening to true / false
     * @type {boolean}
     */
    /**
     * set the initial rootpage on app start depending on the state.
     * states are: initial opening, logged in, not-logged in
     */
    if(!this.platform.is('cordova')){
      this.initialOpening = true;
      this.pNsEnabled = true;
    }
    // firebase.auth().onAuthStateChanged((user) => {
    this.userProvider.getCurrentUser().subscribe((user) => {

      NativeStorage.getItem('initialOpening').then(data => {
        console.log("initial opening retrieved: "+data);
        this.initialOpening = data.value;
      }, error => {
        console.log("initial opening could not be retrieved!!")
        console.error(error);
      }).then(() => {
        PushNotification.hasPermission().then((data) => {
          console.log("[App.Component] Push Notifications enabled: "+data.isEnabled);
          if (data.isEnabled){
            this.pNsEnabled = true;
          }
          else{
            this.pNsEnabled = false;
          }
        }, error => {console.log('error')}).then(() => {
          console.log("[App.Component] Initial: "+this.initialOpening+"; PNs enabled: "+this.pNsEnabled);
          if (user && !this.initialOpening && this.pNsEnabled) {
            this.rootPageProvider.setRootPage(TabsPage, {}, {});
          } else if(this.initialOpening || !this.pNsEnabled) {
            this.rootPageProvider.setRootPage(IntroductionPage, {}, {});
          } else{
            this.rootPageProvider.setRootPage(LoginPage, {"initial": true}, {});
          }
        });
      });
    });



    /**
     * logic what to do when a new push notification is received.
     * --> open a new modal and display the text and picture
     */
    this.push.rx.notification()
      .subscribe((msg) => {
        //{"raw":{"message":"Get 150% off!","title":"Test Push","additionalData":
        // {"payload":{"key":"pushValue"},"foreground":true,"coldstart":false}},
        // "text":"Get 150% off!","title":"Test Push","app":{"asleep":false,"closed":false},
        // "payload":{"key":"pushValue"}}
        //access the payload:
        //msg.payload.key
        let payload: any = msg.payload;
        this.modal = this.modalCtrl.create(AppealPage, { text: msg.text, title: msg.title, url: payload.url });
        this.modal.present();

        console.log("received push");
        //alert(msg.title + ': ' + msg.text);
      });


    /**
     * cordova platform events triggered on pause and resume
     */
    this.platform.pause.subscribe(() => {
      this.logProvider.logTime("appOpening_count", "appPausing");
      console.log("platform pause triggered");
    });
    this.platform.resume.subscribe(() => {
      this.logProvider.logCounter("appOpening_count").subscribe(() => {
        this.logProvider.logTime("appOpening_count", "appOpening");
      });
      console.log("platform resume triggered");

      PushNotification.hasPermission().then((data) => {
        if (data.isEnabled) {
          //
        }
        else{
          this.rootPageProvider.setRootPage(IntroductionPage, {}, {});
        }
      });
    });

    /**
     * is only triggered on appCreate.
     * will not be triggered if the app returns from a background state.
     */
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      //gets only executed when "resume" is not fired.
      this.logProvider.logCounter("appOpening_count").subscribe(() => {
        this.logProvider.logTime("appOpening_count", "appOpening");
      });
    });
  }




}
