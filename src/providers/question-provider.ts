import { Injectable } from '@angular/core';
import {Questions} from "./mock/question-data";

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionProvider {

getQuestions(category: number): any {
     return Promise.resolve(Questions).then(
        questionList => questionList.filter(singleQuestion => singleQuestion.category === category)
   );
 }
}
