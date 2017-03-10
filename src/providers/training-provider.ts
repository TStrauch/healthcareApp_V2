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
    let trainingExercises = [
      TRAINING_DAT.category_one,
      TRAINING_DAT.category_two,
      TRAINING_DAT.category_three,
      TRAINING_DAT.category_four
    ]

    let numCategories = TRAINING_DAT.count_categories;
    let numExercisesInTraining = 3;

    //determine which categories to use
    let startingCategory = index % numCategories;

    //setting the appropriate exercises
    let trainingSet = [];
    for (var i=startingCategory; i < startingCategory + numExercisesInTraining; i++){
      let categoryIndex = i % trainingExercises.length;
      let exerciseIndex = index % trainingExercises[categoryIndex].length
      trainingSet.push(trainingExercises[categoryIndex][exerciseIndex]);
    }


    //determine which exercises to use

    // let e1 = TRAINING_DAT.category_one[index % max];
    // let e2 = TRAINING_DAT.category_two[index % max];
    // let e3 = TRAINING_DAT.category_three[index % max];

    // let trainingSet = [
    //   e1,
    //   e2,
    //   e3
    // ];

    return Promise.resolve(trainingSet);
  }

}

