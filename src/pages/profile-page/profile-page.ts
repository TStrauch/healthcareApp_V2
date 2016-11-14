import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user-provider";
import { RootPageProvider } from "../../providers/rootpage";
import { LogProvider } from "../../providers/log-provider";
import * as c3 from 'c3';
import { QuestionProvider } from "../../providers/question-provider";
import moment from 'moment';

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
  stress_score: any;
  // chart;

  // chart related stuff. would need to be put in a separate component
  public lineChartData: Array<any> = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'You'
    }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(26,188,156,0.2)',
      borderColor: 'rgba(26,188,156,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  constructor(public nav: NavController,
    public userProvider: UserProvider,
    public rootPageProvider: RootPageProvider,
    public questionProvider: QuestionProvider,
    public logProvider: LogProvider) {

    this.refresh();
  }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');

    this.userProvider.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  ionViewDidEnter() {
    this.refresh();
    console.log("ProfilePage did enter");
    this.logProvider.logCounter("profilePage_count").subscribe();
  }

  logOut() {
    this.userProvider.logoutUser().then(() => {
      this.rootPageProvider.setRootPage(LoginPage, { "initial": false }, {});
    });
  }

  refresh() {
    this.userProvider.getCurrentUser().subscribe((user) => {
      this.questionProvider.getThisWeeksPSL().subscribe((scores) => {
        var sum = 0;
        Object.keys(scores).forEach((key) => {
          sum += scores[key].score;
        });
        if (Object.keys(scores).length > 0) {
          sum = sum / Object.keys(scores).length;
          this.stress_score = Math.round(sum * 100) / 100;
        }
        else {
          this.stress_score = null;
        }

      });


      this.logProvider.getTrainingChartDataAllUsersWeek().subscribe((dataAllUsers) => {


        //prepare chartData and set the labels
        let newLabels: Array<any> = [];
        var chartData = [];
        var chartDataAll = [];
        for (var i = 6; i >= 0; i--) {
          // var day = moment().subtract(i, 'days').dayOfYear();
          // chartData[i] = 0;
          chartData.push(0);
          chartDataAll.push(0);
          newLabels.push(moment().subtract(i, 'days').format('ddd'));
        }

        this.userProvider.getNumberOfUsers().subscribe((totalUsers) => {
          let startDay = moment().subtract(6, 'days').dayOfYear();
          Object.keys(dataAllUsers).forEach((key) => {
            let day = dataAllUsers[key].day;
            chartDataAll[(day - startDay)] = dataAllUsers[key].counter / totalUsers;
          });


          this.logProvider.getTrainingChartDataWeek().subscribe((data) => {
          if(data != null){  
             Object.keys(data).forEach((key) => {
              let day = data[key].day;
              chartData[(day - startDay)] += 1;
            });
            this.setChart(chartData, chartDataAll, newLabels);
          } else{
            this.setChart(chartData, chartDataAll, newLabels);
          }
          });

      })
    })
  });
}

setChart(chartData, chartDataAll, newLabels){
  let newChartData = [
    { data: chartData, label: "You" },
    { data: chartDataAll, label: "All Users" }];

  setTimeout(() => {
    this.lineChartLabels = newLabels;
  }, 0);

  setTimeout(() => {
    this.lineChartData = newChartData;
  }, 0);
}

}
