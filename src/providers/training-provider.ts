import { Injectable } from '@angular/core';
import {EXERCISES} from "./mock/training-data";



/*
  Generated class for the Training provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrainingProvider {

  getAllExercises(): any{
    return Promise.resolve(EXERCISES)
  }

  getSingleExercise(id: number): any {
     return Promise.resolve(EXERCISES).then(
        exerciseList => exerciseList.filter(singleExercise => singleExercise.id === id)[0]
   );
  }

}

