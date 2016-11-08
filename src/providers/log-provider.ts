import { Injectable } from '@angular/core';
import { UserProvider } from './user-provider';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
import moment from 'moment';


@Injectable()
export class LogProvider {
  logRef: any;

  /*
    !!!!! Important !!!!!
    Initiate all counter elements for logging in the signup function of the user-provider
  */

  constructor(public userProvider: UserProvider) {
    console.log('Hello LogProvider Provider');
  }

  logCounter(path) {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {

        this.logRef = firebase.database().ref('dataLog/' + user.uid + '/' + path);
        this.logRef.once('value', (snapshot) => {

          var tempName = path;
          var updateObject = {};
          updateObject[tempName] = snapshot.val() + 1;
          this.logRef.parent.update(updateObject).then(() => {
            observer.next();
            observer.complete();
          }, (error) => {
            observer.error(error);
            observer.complete();
          });
        })
      })
    })
  }

  logTraining(path) {
    this.userProvider.getCurrentUser().subscribe((user) => {

      this.logRef = firebase.database().ref('dataLog/' + user.uid + "/training_count");
      this.logRef.once('value', (snapshot) => {
        var tempName = "training_" + snapshot.val() + "_" + path;
        var updateObject = {};
        updateObject[tempName] = new Date().getTime();
        this.logRef.parent.update(updateObject);
      });

      //log training finished to the application-used log area
      if (path == 'end') {
        var trainingLogRef = firebase.database().ref('/trainingLog/' + user.uid);
        var trainingPushRef = trainingLogRef.push();
        var today = moment();
        trainingPushRef.set({
          "date": today.toDate().getTime(),
          "day": today.dayOfYear(),
          "month": today.month()
        });
      }
    });
  }

  logQuestion(questionId, questionAnswer):any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        this.logRef = firebase.database().ref('dataLog/' + user.uid + "/questionnaire_count");
        this.logRef.once('value', (snapshot) => {
          var tempName = "questionnaire_" + snapshot.val() + "_" + questionId;
          var updateObject = {};
          updateObject[tempName] = questionAnswer;
          this.logRef.parent.update(updateObject);
          observer.next()
          observer.complete();
        });
      });
    });
  }



  logTime(path, name) {
    var time = new Date().getTime();
    this.userProvider.getCurrentUser().subscribe((user) => {
      this.logRef = firebase.database().ref('dataLog/' + user.uid + "/" + path);
      this.logRef.once('value', (snapshot) => {
        var tempName = name + "_" + snapshot.val() + "_time";
        var updateObject = {};
        updateObject[tempName] = time;
        this.logRef.parent.update(updateObject);
      });
    });
  }


  getCount(path): any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        var userRef = firebase.database().ref('dataLog/' + user.uid + "/" + path);
        userRef.on('value', (snapshot) => {
          observer.next(snapshot.val())
          observer.complete();
        });
      });

    });

  }

  logLastQuestionnaire() {
    this.userProvider.getCurrentUser().subscribe((user) => {
      this.logRef = firebase.database().ref('/last_questionnaire/');
      var tempName = user.uid;
      var updateObject = {};
      updateObject[tempName] = moment().format();
      this.logRef.update(updateObject);
    });
  }

  getTrainingChartDataWeek(): any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        let trainingRef = firebase.database().ref('/trainingLog/' + user.uid);
        let lastWeek = moment().subtract(7, 'days').dayOfYear();
        trainingRef.orderByChild('day').startAt(lastWeek).on('value', (snapshot) => {
          observer.next(snapshot.val()); observer.complete();
        })
      });
    });
  }
}
