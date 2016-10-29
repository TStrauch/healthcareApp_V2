 import {Question} from "../../model/question";

 export var Questions: Question[] = [
  {id:1, description:'How do you feel?', category: 1},
  {id:2, description:'How did you sleep?',category: 1},
  {id:3, description:'Do you feel tired?',category: 2},
  {id:4,  description:'Do you feel uncomfortable?',category: 2},

   //perceived stress scale
   {id:5,  description:'In the last month, how often have you been upset because of something that happened unexpectedly?',category: 3, invertScale: false},
   {id:6,  description:'In the last month, how often have you felt that you were unable to control the important things in your life?',category: 3, invertScale: false}
];
