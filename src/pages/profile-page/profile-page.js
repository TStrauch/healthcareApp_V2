var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user-provider";
import { RootPageProvider } from "../../providers/rootpage";
/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var ProfilePage = (function () {
    function ProfilePage(nav, userProvider, rootPageProvider) {
        this.nav = nav;
        this.userProvider = userProvider;
        this.rootPageProvider = rootPageProvider;
        // chart;
        // chart related stuff. would need to be put in a separate component
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('Hello ProfilePage Page');
        this.userProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
    };
    ProfilePage.prototype.ionViewDidEnter = function () {
        // this.chart = c3.generate({
        //   data: {
        //     x: 'x',
        //     columns: [
        //       ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        //       ['Your performance', 30, 60, 0, 90, 90, 20],
        //       ['Average performance', 40, 30, 20, 60, 60, 50]
        //     ]
        //   },
        //   axis: {
        //     x: {
        //       type: 'timeseries',
        //       tick: {
        //         format: '%Y-%m-%d'
        //       }
        //     }
        //   }
        // });
    };
    ProfilePage.prototype.logOut = function () {
        var _this = this;
        this.userProvider.logoutUser().then(function () {
            _this.rootPageProvider.setRootPage(LoginPage, { "initial": true }, {});
        });
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile-page',
            templateUrl: 'profile-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, UserProvider, RootPageProvider])
    ], ProfilePage);
    return ProfilePage;
}());
