import { Injectable } from '@angular/core';
import {Questions} from "./mock/question-data";
import {UserProvider} from "./user-provider";
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
  questionnaireRef:any;

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

  savePSS(values: [number]) {
    var pss = 0;

    for (var item of values){
      let n = Number(item);
      pss += n;
    }
    // pss = pss / values.length;
    var pushRef = this.pssRef.push();
    pushRef.set({
      "date": moment().toDate().getTime(),
      "score": pss
    })
  }

  questionnaireAvailable(){
     return Rx.Observable.create((observer) => {
      let lastWeek = moment().subtract(7,'days').format();
      this.questionnaireRef.on('value', (snapshot) => {
        debugger;
        console.log(snapshot.val() + " " + lastWeek);
        if(moment(snapshot.val()).isBefore(lastWeek)){
          observer.next(true);
        } else{
          observer.next(false);
        }
        observer.complete();
      })
    })
  }

  getThisWeeksPSL(){
    //.startAt(moment().subtract(7, 'days').format())
    return Rx.Observable.create((observer) => {
      let lastWeek = moment().subtract(7,'days').toDate().getTime();
      this.pssRef.orderByChild('date').startAt(lastWeek).on('value', (snapshot) => {
        var results = snapshot.val();
        observer.next(results);observer.complete();
      })
    })

  }
}
