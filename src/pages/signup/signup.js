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
import { UserProvider } from "../../providers/user-provider";
import { RootPageProvider } from "../../providers/rootpage";
import { LoginPage } from "../login/login";
import { TabsPage } from "../tabs-page/tabs-page";
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var Signup = (function () {
    function Signup(nav, navParams, userProvider, formBuilder, loadingCtrl, alertCtrl, rootPageProvider) {
        this.nav = nav;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.rootPageProvider = rootPageProvider;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
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
        this.signupForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    Signup.prototype.ionViewDidLoad = function () {
        console.log('Hello Signup Page');
    };
    Signup.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    Signup.prototype.signupUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.userProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(function () {
                _this.rootPageProvider.setRootPage(_this.loginDoneNavOptions.page, _this.loginDoneNavOptions.navParams, _this.loginDoneNavOptions.navOpt);
            }, function (error) {
                _this.loading.dismiss();
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
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
    };
    Signup.prototype.goToLogin = function () {
        this.nav.push(LoginPage, { "initial": !this.isInitialView, "loginDoneNavOptions": this.loginDoneNavOptions }, {});
    };
    Signup = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, UserProvider, FormBuilder, LoadingController, AlertController, RootPageProvider])
    ], Signup);
    return Signup;
}());
