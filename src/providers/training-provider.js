var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { EXERCISES, TRAINING_DAT } from "./mock/training-data";
/*
  Generated class for the Training provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var TrainingProvider = (function () {
    function TrainingProvider() {
    }
    TrainingProvider.prototype.getAllExercises = function () {
        return Promise.resolve(EXERCISES);
    };
    TrainingProvider.prototype.getSingleExercise = function (id) {
        return Promise.resolve(EXERCISES).then(function (exerciseList) { return exerciseList.filter(function (singleExercise) { return singleExercise.id === id; })[0]; });
    };
    TrainingProvider.prototype.getNewTraining = function (index) {
        var max = TRAINING_DAT.count_per_category;
        var e1 = TRAINING_DAT.category_one[index % max];
        var e2 = TRAINING_DAT.category_two[index % max];
        var e3 = TRAINING_DAT.category_three[index % max];
        var trainingSet = [
            e1,
            e2,
            e3
        ];
        return Promise.resolve(trainingSet);
    };
    TrainingProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], TrainingProvider);
    return TrainingProvider;
}());
