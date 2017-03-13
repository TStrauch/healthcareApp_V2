import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {NativeStorage, Push as PushNotification} from 'ionic-native';
import {RootPageProvider} from "../../../providers/rootpage";
import {LoginPage} from "../../login/login";
import {Signup} from "../../signup/signup";
import {InitialQuestionnaire} from "../initial-questionnaire/initial-questionnaire";
import { Push, PushToken } from '@ionic/cloud-angular';
import {TabsPage} from "../../tabs-page/tabs-page";
/*
  Generated class for the IntroductionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-introduction-page',
  templateUrl: 'introduction-page.html'
})
export class IntroductionPage {

  constructor(public navCtrl: NavController,
              public rootPageProvider: RootPageProvider,
              public push: Push,
              public platform: Platform) {}

  accept(){

    if (this.platform.is('cordova')){
      this.push.register().then((t: PushToken) => {
        console.log('Intro: push registered. token is '+t);
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
        this._iosPushRegistration();
      });
    }
    else{
      let loginDoneNavOptions = {
        "pageSignup": TabsPage,
        "pageLogin" : TabsPage,
        "navParamsSignup" : {},
        "navParamsLogin" : {initialOpening: true},
        "navOpt" : {"animate": true, "direction": "forward"}
      }
      this.rootPageProvider.setRootPage(Signup,
        {"initial": true, "loginDoneNavOptions": loginDoneNavOptions}, {"animate": true, "direction": "forward"}
      );
    }

  }

  _iosPushRegistration(){

    /**
     * Now we have to make sure that the user actually clicked "allow" in the ios-popup.
     * There is an event available with the phonegap push plugin. But that one needs to be
     * initialized as well in order to get access to the object that fires the event
     */

    //healthcareApp key --> update to worklax-project
    let pushNotification = PushNotification.init({
      android: {
        senderID: "157850107630"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
      windows: {}
    });
    // let pushNotification = PushNotification.init({
    //   android: {
    //     senderID: "808633843882"
    //   },
    //   ios: {
    //     alert: "true",
    //     badge: true,
    //     sound: 'false'
    //   },
    //   windows: {}
    // });

    /**
     * the "registration" event is the event fired by the phonegap-plugin-push when the
     * push notification registration status changes. This is the case when the user hits
     * "allow" or "decline" in the ios-popup.
     *
     * Note: there is also a default event fired... Thus "hasPermission" is required to
     * check if the user actually hit "allow" and not "decline".
     * Only in the case of "allow" the navigation to the next view is triggered.
     *
     */
    let that = this;
    pushNotification.on('registration', function(data){
      console.log(data);

      PushNotification.hasPermission().then((data) => {
        if (data.isEnabled) {
          console.log('[Cordova plugin] Push is Enabled');
          let loginDoneNavOptions = {
            "pageSignup": TabsPage,
            "pageLogin" : TabsPage,
            "navParamsSignup" : {},
            "navParamsLogin" : {initialOpening: true},
            "navOpt" : {"animate": true, "direction": "forward"}
          }
          that.rootPageProvider.setRootPage(Signup,
            {"initial": true, "loginDoneNavOptions": loginDoneNavOptions}, {"animate": true, "direction": "forward"}
          );
        }
        else{
          console.log('[Cordova plugin] Push is not enabled');
        }
      })
    })
  }

  ionViewDidLoad() {
    console.log('Hello IntroductionPage Page');
  }

}
