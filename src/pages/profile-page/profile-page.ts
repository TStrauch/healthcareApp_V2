import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user-provider";
import {RootPageProvider} from "../../providers/rootpage";
import * as c3 from 'c3';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html'
})
export class ProfilePage {
  user: any;
  chart;

  constructor(public nav: NavController, public userProvider: UserProvider,
              public rootPageProvider: RootPageProvider) {}

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');

    this.userProvider.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  ionViewDidEnter() {
    this.chart = c3.generate({
      data: {
        x: 'x',
        columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
          ['Your performance', 30, 60, 0, 90, 90, 20],
          ['Average performance', 40, 30, 20, 60, 60, 50]
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });
  }

  logOut(){
    this.userProvider.logoutUser().then(() => {
      this.rootPageProvider.setRootPage(LoginPage);
    });
  }

}
