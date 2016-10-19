import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UserProvider } from "../../providers/user-provider";
import { RootPageProvider } from "../../providers/rootpage";
export declare class Signup {
    nav: NavController;
    navParams: NavParams;
    userProvider: UserProvider;
    formBuilder: FormBuilder;
    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    rootPageProvider: RootPageProvider;
    signupForm: any;
    emailChanged: boolean;
    passwordChanged: boolean;
    submitAttempt: boolean;
    loading: any;
    isInitialView: boolean;
    loginDoneNavOptions: any;
    constructor(nav: NavController, navParams: NavParams, userProvider: UserProvider, formBuilder: FormBuilder, loadingCtrl: LoadingController, alertCtrl: AlertController, rootPageProvider: RootPageProvider);
    ionViewDidLoad(): void;
    elementChanged(input: any): void;
    signupUser(): void;
    goToLogin(): void;
}
