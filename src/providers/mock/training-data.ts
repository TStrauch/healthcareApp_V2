 import {Exercise} from "../../model/exercise";

 export var EXERCISES: Exercise[] = [
  {id:1, name:'Backstretching', description:'Move your Back', duration: 60, goal:'Helps back', image: 'path to image'},
  {id:2, name:'Shoulderstretching', description:'Move your Shoulders', duration: 60, goal:'Helps back', image: 'path to image'},
  {id:3, name:'Neckstretching', description:'Move your Neck', duration: 60, goal:'Helps back', image: 'path to image'},
  {id:4, name:'Armstretching', description:'Move your Arms', duration: 60, goal:'Helps back', image: 'path to image'},
  {id:5, name:'Fingerstretching', description:'Move your Fingers', duration: 60, goal:'Helps back', image: 'path to image'},
];


 var category_one: Exercise[] = [
   {id:1, name:'Press against Resistance', description:'Put both hands behind your head to create a resistance. Press your head with small pressure against your hands.\
    Try not to move the hands or your head. Hold this tension for 10 seconds,\
    then make a 10 second break and repeat this 3 times.', duration: 60, goal:'Strengthening of neck muscles', image: 'assets/img/training/neck1.PNG'},
   {id:2, name:'Create Tension in your Neck', description:'Relax your shoulders and lean your head to one side. \
   The hand on the opposite side increases the tension by being \
   pressed in direction of the ground. Repeat and switch the side.', duration: 60, goal:'Relaxation of the neck muscles', image: 'assets/img/training/neck2.PNG'},
   {id:3, name:'Circle your Head', description:'Lean your head forward and slowly roll from side to side.', duration: 60, goal:'Mobilisation of the cervical spine', image: 'assets/img/training/neck3.PNG'},
   {id:4, name:'Incline your Head', description:'Lean your head to the left side and go back to the starting position.\
    Then switch the side.', duration: 60, goal:'Relaxation of the neck muscles', image: 'assets/img/training/neck4.PNG'},

 ];
 var category_two: Exercise[] = [
   {id:1, name:'Circle your Shoulders', description:'Start with circling your shoulders backwards in small movements.\
    Then try to maximise the size of the circles.  After 30 seconds, switch the direction\
     of the circulation and repeat the movement.', duration: 60, goal:'Mobilisation of the shoulder', image: 'assets/img/training/shoulder1.PNG'},
   {id:2, name:'Raise your Shoulders', description:'Raise both shoulders at once up toward the ears. \
   Hold, release and drop them. Afterwards repeat the movement.', duration: 60, goal:'Relaxation of the shoulder muscles', image: 'assets/img/training/shoulder2.PNG'},
   {id:3, name:'Stretch  your Shoulders', description:'Create a U-form with your arms, the elbows are at the height of your shoulders. \
   Press your arms to the back. Hold this position some seconds. Afterwards put the hands together and pull the arms as much as possible in height of the shoulders to the front.\
    Hold this position some seconds and repeat the movement.', duration: 60, goal:'Stretch and Strengthening of the shoulder muscles', image: 'assets/img/training/shoulder3.PNG'},
   {id:4, name:'Keep your Shoulders together', description:'Clutch your fingers at chest height. Create a tension by pressing the shoulder blades together and pull open the elbows.\
    Hold for 10 seconds and release. Repeat the movement three times.', duration: 60, goal:'Strengthening of the shoulder muscles', image: 'assets/img/training/shoulder4.PNG'},


 ];
 var category_three: Exercise[] = [
   {id:1, name:'Zoom with your Eyes', description:'Stretch your arm, the thumb points upwards. As long as you clearly see the thumb, move it slowly in direction of your face. \
   Afterwards move it slowly back to the starting position. Repeat this movement.', duration: 60, goal:'Relaxation of the eye muscles', image: 'assets/img/training/eye1.PNG'},
   {id:2, name:'Let your Eyes wander', description:'Select several items with different distances in your environment. Focus your view on each of this items a few seconds and then switch to the next one. \
   After arriving at the last item, go whole the way back.', duration: 60, goal:'Flexibility of the eye lense', image: 'assets/img/training/eye2.PNG'},
   {id:3, name:'Move your Eye ', description:'Slowly look with your open eyes to the left and then to the right side. Repeat it 5 times. Afterwards close your eyes for some seconds.\
    Finally look for 5 times up and down in a slow movement. ', duration: 60, goal:'Strengthen of eye muscles', image: 'assets/img/training/eye3.PNG'},
   {id:4, name:'Coordinate your Eyes', description:'Stretch your arms at the height of your shoulders. Turn your head to the left side. The left thumb points up whereas the right one points down.\
    When turning the head to the other side, \
    also switch the thumbs position. Repeat it 7 times.', duration: 60, goal:'Coordination of eyes and hands', image: 'assets/img/training/eye4.PNG'},

 ];

 export var TRAINING_DAT:any = {
   "count_per_category": 4,
   "category_one": category_one,
   "category_two": category_two,
   "category_three": category_three
 }
