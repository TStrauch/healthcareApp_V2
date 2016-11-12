import { Injectable } from '@angular/core';
import { Questions } from "./mock/question-data";
import { UserProvider } from "./user-provider";
import moment from 'moment';
import * as Rx from 'rxjs';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionProvider {
  private pssRef: any;
  questionnaireRef: any;
  configurationRef: any;
  configuration;

  constructor(public userProvider: UserProvider) {

    this.userProvider.getCurrentUser().subscribe((user) => {
      this.pssRef = firebase.database().ref('/pss');
      this.pssRef = this.pssRef.child(user.uid);
      this.questionnaireRef = firebase.database().ref('/last_questionnaire/' + user.uid);
    })

  }

  getQuestions(category: number): any {
    return Promise.resolve(Questions).then(
      questionList => questionList.filter(singleQuestion => singleQuestion.category === category)
    );
  }

  getConfiguration() {
    return Rx.Observable.create((observer) => {
      this.configurationRef = firebase.database().ref('/configuration/');
      this.configurationRef.on('value', (snapshot) => {
        debugger;
        this.configuration = {
          questionnaire_afterTime: snapshot.val().questionnaire_afterTime,
          questionnaire_afterTraining: snapshot.val().questionnaire_afterTraining
        };
        debugger;
        observer.next(this.configuration);
        observer.complete();
      })
    })
  }

  savePSS(data: any) {
    let questions = data.questions;
    let values = data.answers;

    var pss = 0;

    for (var i=0; i < questions.length; i++){
      let q = questions[i];
      let v = values[i];

      if(q.invertScale){
        pss += (4 - Number(v));
      }
      else{
        pss += Number(v);
      }
    }

    var pushRef = this.pssRef.push();
    pushRef.set({
      "date": moment().toDate().getTime(),
      "score": pss
    })
  }

  questionnaireAvailable(trainingsCounter) {
    return Rx.Observable.create((observer) => {
      // Get configuration, afterTime is the maximum range the last questionnaire should have, and after trainingsCounter
      // the maximum number of trainings until a new questionnaire will be triggered
      this.getConfiguration().subscribe((configuration) => {
        let lastWeek = moment().subtract(configuration.questionnaire_afterTime, 'days').format();
        this.questionnaireRef.on('value', (snapshot) => {
          console.log(snapshot.val() + " " + lastWeek);
          if (moment(snapshot.val()).isBefore(lastWeek) || (trainingsCounter % configuration.questionnaire_afterTraining === 1)) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        })
      })
    })
  }

  getThisWeeksPSL() {
    //.startAt(moment().subtract(7, 'days').format())
    return Rx.Observable.create((observer) => {
      let lastWeek = moment().subtract(7, 'days').toDate().getTime();
      this.pssRef.orderByChild('date').startAt(lastWeek).on('value', (snapshot) => {
        var results = snapshot.val();
        if (results == null){
          results = [];
        }
        observer.next(results); observer.complete();
      })
    })

  }
}
