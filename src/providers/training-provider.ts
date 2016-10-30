import { Injectable } from '@angular/core';
import {EXERCISES, TRAINING_DAT} from "./mock/training-data";



/*
  Generated class for the Training provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrainingProvider {

  getAllExercises(): any{
    return Promise.resolve(TRAINING_DAT)
  }

  getSingleExercise(category: number,id: number): any {
     return Promise.resolve(EXERCISES).then(
        exerciseList => exerciseList.filter(singleExercise => singleExercise.id === id)[0]
   );
  }

  getNewTraining(index: number): any{
    let max = TRAINING_DAT.count_per_category;

    let e1 = TRAINING_DAT.category_one[index % max];
    let e2 = TRAINING_DAT.category_two[index % max];
    let e3 = TRAINING_DAT.category_three[index % max];

    let trainingSet = [
      e1,
      e2,
      e3
    ];

    return Promise.resolve(trainingSet);
  }

}

