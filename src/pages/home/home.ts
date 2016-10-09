import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user-provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController, public userProvider: UserProvider) {

  }

  logOut(){
    this.userProvider.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

}
