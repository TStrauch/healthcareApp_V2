import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UserProvider } from "../../providers/user-provider";
export declare class ResetPassword {
    userProvider: UserProvider;
    formBuilder: FormBuilder;
    nav: NavController;
    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    resetPasswordForm: any;
    emailChanged: boolean;
    passwordChanged: boolean;
    submitAttempt: boolean;
    constructor(userProvider: UserProvider, formBuilder: FormBuilder, nav: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController);
    ionViewDidLoad(): void;
    elementChanged(input: any): void;
    resetPassword(): void;
}
