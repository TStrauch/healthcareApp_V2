import { Injectable } from '@angular/core';
import {UserProvider} from './user-provider';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';


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
    this.userProvider.getCurrentUser().subscribe((user) => {
      debugger;
      this.logRef = firebase.database().ref('dataLog/' + user.uid + '/' + path);
      this.logRef.once('value', (snapshot) => {

        var tempName = path;
        var updateObject = {};
        updateObject[tempName] = snapshot.val() + 1;
        this.logRef.parent.update(updateObject);
      });
    })



  }

  logTraining(path) {
    this.userProvider.getCurrentUser().subscribe((user) => {

      this.logRef = firebase.database().ref('dataLog/' + user.uid + "/training_count");
      this.logRef.once('value', (snapshot) => {
        debugger;
        var tempName = "training_" + snapshot.val() + "_" + path;
        var updateObject = {};
        updateObject[tempName] = new Date().getTime();
        this.logRef.parent.update(updateObject);
      });
    });
  }

  logQuestion(questionId, questionAnswer) {
    this.userProvider.getCurrentUser().subscribe((user) => {

      this.logRef = firebase.database().ref('dataLog/' + user.uid + "/questionnaire_count");
      this.logRef.once('value', (snapshot) => {
        var tempName = "questionnaire_" + snapshot.val() + "_" + questionId;
        var updateObject = {};
        updateObject[tempName] = questionAnswer;
        this.logRef.parent.update(updateObject);
      });
    });
  }


  logTime(path, name) {
    this.userProvider.getCurrentUser().subscribe((user) => {
      debugger;
      this.logRef = firebase.database().ref('dataLog/' + user.uid + "/" + path);
      this.logRef.once('value', (snapshot) => {
        var tempName = name + "_" + snapshot.val() + "_time";
        var updateObject = {};
        updateObject[tempName] = new Date().getTime();
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

}
