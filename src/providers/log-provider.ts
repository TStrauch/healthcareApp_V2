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
        if(user !== null){
          this.logRef = firebase.database().ref(user.data_path + '/dataLog/' + user.uid + '/' + path);
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
        }
        else{
          observer.error('Log: User not logged in');
          observer.complete();
        }

      })
    })
  }

  logTraining(path) {
    this.userProvider.getCurrentUser().subscribe((user) => {

      this.logRef = firebase.database().ref(user.data_path + '/dataLog/' + user.uid + "/training_count");
      this.logRef.once('value', (snapshot) => {
        var tempName = "training_" + snapshot.val() + "_" + path;
        var updateObject = {};
        updateObject[tempName] = new Date().getTime();
        this.logRef.parent.update(updateObject);
      });

      //log training finished to the application-used log area
      if (path == 'end') {
        var trainingLogRef = firebase.database().ref(user.data_path + '/trainingLog/' + user.uid);
        var trainingPushRef = trainingLogRef.push();
        var today = moment();
        trainingPushRef.set({
          "date": today.toDate().getTime(),
          "day": today.dayOfYear(),
          "month": today.month()
        });

        var trainingLogAllUserRef = firebase.database().ref(user.data_path + '/trainingLogAllUsers');
        trainingLogAllUserRef.orderByChild("day").equalTo(today.dayOfYear()).once('value', (snapshot) => {
          var results = snapshot.val();

          // check if a value exists, otherwise just update
          if (results == null) {
            var trainingLogAllUserSaveRef = firebase.database().ref(user.data_path + '/trainingLogAllUsers/');
            var trainingAllPushRef = trainingLogAllUserSaveRef.push();
            trainingAllPushRef.set({
              "date": today.toDate().getTime(),
              "day": today.dayOfYear(),
              "year": today.year(),
              "counter": 1
            });
          } else {
            debugger;
            console.log(results.key);
            snapshot.forEach(function (singleObject) {
              // need to check year if the year fits...
              var trainingLogAllUserUpdateRef = firebase.database().ref(user.data_path + '/trainingLogAllUsers/' + singleObject.key);
              trainingLogAllUserUpdateRef.child('counter').transaction(function (counter) {
                return counter + 1;
              })
              //Loops forEach() one time
              return true;
            });

          }
        });
      }
    });
  }

  logQuestion(questionId, questionAnswer): any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        this.logRef = firebase.database().ref(user.data_path + '/dataLog/' + user.uid + "/questionnaire_count");
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
      this.logRef = firebase.database().ref(user.data_path + '/dataLog/' + user.uid + "/" + path);
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
        var userRef = firebase.database().ref(user.data_path + '/dataLog/' + user.uid + "/" + path);
        userRef.on('value', (snapshot) => {
          observer.next(snapshot.val())
          observer.complete();
        });
      });

    });

  }

  logLastQuestionnaire() {
    this.userProvider.getCurrentUser().subscribe((user) => {
      this.logRef = firebase.database().ref(user.data_path + '/last_questionnaire/');
      var tempName = user.uid;
      var updateObject = {};
      updateObject[tempName] = moment().format();
      this.logRef.update(updateObject);
    });
  }

  getTrainingChartDataWeek(): any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        let trainingRef = firebase.database().ref(user.data_path + '/trainingLog/' + user.uid);
        let lastWeek = moment().subtract(7, 'days').dayOfYear();
        trainingRef.orderByChild('day').startAt(lastWeek).on('value', (snapshot) => {
          observer.next(snapshot.val()); observer.complete();
        })
      }, (error) =>{
        observer.next(); observer.complete();
      });
    });
  }

  getTrainingChartDataAllUsersWeek(): any {
    return Rx.Observable.create((observer) => {
      this.userProvider.getCurrentUser().subscribe((user) => {
        let trainingAllRef = firebase.database().ref(user.data_path + '/trainingLogAllUsers');
        let lastWeek = moment().subtract(7, 'days').dayOfYear();
        trainingAllRef.orderByChild('day').startAt(lastWeek).on('value', (snapshot) => {
          observer.next(snapshot.val());
          observer.complete();
        });
      });
    });
  }
}
