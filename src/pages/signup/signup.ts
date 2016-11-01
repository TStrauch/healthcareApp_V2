import {
  NavController,
  LoadingController,
  AlertController, NavParams
} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import {UserProvider} from "../../providers/user-provider";
import {RootPageProvider} from "../../providers/rootpage";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs-page/tabs-page";

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  isInitialView: boolean;
  loginDoneNavOptions: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public rootPageProvider: RootPageProvider) {

    //read nav Params
    if(navParams.get("initial")){
      this.isInitialView = navParams.get("initial");
    }
    if(navParams.get("loginDoneNavOptions")){
      this.loginDoneNavOptions = navParams.get("loginDoneNavOptions");
    }

    //set default values for nav Params if necessary
    if(!this.loginDoneNavOptions){
      this.loginDoneNavOptions = {};
      this.loginDoneNavOptions.pageSignup = TabsPage;
      this.loginDoneNavOptions.pageLogin = TabsPage;
      this.loginDoneNavOptions.navParamsSignup = {};
      this.loginDoneNavOptions.navParamsLogin = {};
      this.loginDoneNavOptions.navOpt = {};
    }

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  signupUser(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.userProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password).subscribe(() => {
        this.rootPageProvider.setRootPage(this.loginDoneNavOptions.pageSignup, this.loginDoneNavOptions.navParamsSignup, this.loginDoneNavOptions.navOpt);
      }, (error) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }


  goToLogin(){
    this.nav.push(LoginPage, {"initial" : !this.isInitialView, "loginDoneNavOptions": this.loginDoneNavOptions}, {});
  }


}
