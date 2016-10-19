import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UserProvider } from "../../providers/user-provider";
import { RootPage } from "../../interfaces/RootPage";
import { RootPageProvider } from "../../providers/rootpage";
export declare class LoginPage implements RootPage {
    nav: NavController;
    navParams: NavParams;
    authData: UserProvider;
    formBuilder: FormBuilder;
    alertCtrl: AlertController;
    loadingCtrl: LoadingController;
    rootPageProvider: RootPageProvider;
    loginForm: any;
    emailChanged: boolean;
    passwordChanged: boolean;
    submitAttempt: boolean;
    loading: any;
    isInitialView: boolean;
    loginDoneNavOptions: any;
    constructor(nav: NavController, navParams: NavParams, authData: UserProvider, formBuilder: FormBuilder, alertCtrl: AlertController, loadingCtrl: LoadingController, rootPageProvider: RootPageProvider);
    /**
     * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
     */
    elementChanged(input: any): void;
    /**
     * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
     * the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    loginUser(): void;
    goToSignup(): void;
    goToResetPassword(): void;
}
