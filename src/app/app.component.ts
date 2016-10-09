import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { AngularFire } from 'angularfire2'
import firebase from 'firebase';
import {firebaseconfig} from "./app.module";
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {RootPageProvider} from "../providers/rootpage";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, public af: AngularFire, public rootPageProvider: RootPageProvider) {
    firebase.initializeApp(firebaseconfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.rootPage = HomePage;
        this.rootPage = TabsPage;

        console.log("I'm here! HomePage");
      } else {
        this.rootPage = LoginPage;
        console.log("I'm here! LoginPage");
      }
    });

    //show login page if user is not logged in. otherwise show home page.
    rootPageProvider.getRootPageStream().subscribe((newRootPage) => {
      this.rootPage = newRootPage;
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
