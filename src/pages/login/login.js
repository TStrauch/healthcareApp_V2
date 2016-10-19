var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Signup } from '../signup/signup';
import { ResetPassword } from '../reset-password/reset-password';
import { UserProvider } from "../../providers/user-provider";
import { TabsPage } from "../tabs-page/tabs-page";
import { RootPageProvider } from "../../providers/rootpage";
export var LoginPage = (function () {
    function LoginPage(nav, navParams, authData, formBuilder, alertCtrl, loadingCtrl, rootPageProvider) {
        this.nav = nav;
        this.navParams = navParams;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.rootPageProvider = rootPageProvider;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.isInitialView = false;
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
        if (navParams.get("initial")) {
            this.isInitialView = navParams.get("initial");
        }
        if (navParams.get("loginDoneNavOptions")) {
            this.loginDoneNavOptions = navParams.get("loginDoneNavOptions");
        }
        //set default values for nav Params if necessary
        if (!this.loginDoneNavOptions) {
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
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    /**
     * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
     * the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function (authData) {
                // this.nav.setRoot(HomePage);
                // this.nav.setRoot(TabsPage);
                _this.rootPageProvider.setRootPage(_this.loginDoneNavOptions.page, _this.loginDoneNavOptions.navParams, _this.loginDoneNavOptions.navOpt);
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
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
    };
    LoginPage.prototype.goToSignup = function () {
        this.nav.push(Signup, { "initial": !this.isInitialView, "loginDoneNavOptions": this.loginDoneNavOptions }, {});
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.nav.push(ResetPassword);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, UserProvider, FormBuilder, AlertController, LoadingController, RootPageProvider])
    ], LoginPage);
    return LoginPage;
}());
