import {
  NavController,
  LoadingController,
  AlertController, NavParams
} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Signup } from '../signup/signup';
// import { HomePage } from '../home/home';
import { ResetPassword } from '../reset-password/reset-password';
//import { EmailValidator } from '../../validators/email';
import {UserProvider} from "../../providers/user-provider";
import {TabsPage} from "../tabs-page/tabs-page";
import {RootPage} from "../../interfaces/RootPage";
import {RootPageProvider} from "../../providers/rootpage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements RootPage{
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  isInitialView: boolean = false;
  loginDoneNavOptions: any;

  constructor(public nav: NavController, public navParams: NavParams, public authData: UserProvider, public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public rootPageProvider: RootPageProvider) {

    /**
     * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
     * to be using.
     *
     * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
     */
    // this.loginForm = formBuilder.group({
    //   email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    //   password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    // });
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
      this.loginDoneNavOptions.page = TabsPage;
      this.loginDoneNavOptions.navParams = {};
      this.loginDoneNavOptions.navOpt = {};
    }

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        // this.nav.setRoot(HomePage);
        // this.nav.setRoot(TabsPage);
        this.rootPageProvider.setRootPage(this.loginDoneNavOptions.page, this.loginDoneNavOptions.navParams, this.loginDoneNavOptions.navOpt);
      }, error => {
        this.loading.dismiss().then( () => {
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
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToSignup(){
    this.nav.push(Signup, {"initial" : !this.isInitialView, "loginDoneNavOptions": this.loginDoneNavOptions}, {});
  }

  goToResetPassword(){
    this.nav.push(ResetPassword);
  }

}
