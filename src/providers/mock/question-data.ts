 import {Question} from "../../model/question";

 export var Questions: Question[] = [
  {id:1, description:'How do you feel?', category: 1},
  {id:2, description:'How did you sleep?',category: 1},
  {id:3, description:'Do you feel tired?',category: 2},
  {id:4,  description:'Do you feel uncomfortable?',category: 2},

   //perceived stress scale
   {id:5,  description:'In the last month, how often have you been upset because of something that happened unexpectedly?',category: 3, invertScale: false},
   {id:6,  description:'In the last month, how often have you felt that you were unable to control the important things in your life?',category: 3, invertScale: false},
   {id:7,  description:'In the last month, how often have you felt nervous and “stressed”?',category: 3, invertScale: false},
   {id:8,  description:'In the last month, how often have you felt confident about your ability to handle your personal problems?',category: 3, invertScale: true},
   {id:9,  description:'In the last month, how often have you felt that things were going your way?',category: 3, invertScale: true},
   {id:10,  description:'In the last month, how often have you found that you could not cope with all the things that you had to do?',category: 3, invertScale: false},
   {id:11,  description:'In the last month, how often have you been able to control irritations in your life?',category: 3, invertScale: true},
   {id:12,  description:'In the last month, how often have you felt that you were on top of things?',category: 3, invertScale: true},
   {id:13,  description:'In the last month, how often have you been angered because of things that were outside of your control?',category: 3, invertScale: false},
   {id:14,  description:'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',category: 3, invertScale: false},

];
