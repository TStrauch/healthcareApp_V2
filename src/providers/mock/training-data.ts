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
    then make a 10 second break and repeat this 3 times.', duration: 60, goal:'Strengthening of neck muscles', effect: 'By pressing your head against your hands your can release mental pressure.', image: 'assets/img/training/neck1.PNG'},
   {id:2, name:'Release tensions in your neck', description:'Relax your shoulders and lean your head to one side. \
   The hand on the opposite side increases the tension by being \
   pressed in direction of the ground. Repeat and switch the side.', duration: 60, goal:'Relaxation of the neck muscles', effect: 'The intensive stretch releases tensions in your neck muscles.', image: 'assets/img/training/neck2.jpg'},
   {id:3, name:'Circle your Head', description:'Lean your head forward and slowly roll from side to side.', duration: 60, goal:'Mobilisation of the cervical spine', effect: 'Feel and relax your cervical spine through slow movements of the head.', image: 'assets/img/training/neck3.PNG'},
   {id:4, name:'Incline your Head', description:'Slowly lean your head to the left side and go back to the starting position.\
    Then switch the side.', duration: 60, goal:'Relaxation of the neck muscles', effect: 'Actively feel for tensions in your neck and counter them through careful stretching.', image: 'assets/img/training/neck4.PNG'},

 ];
 var category_two: Exercise[] = [
   {id:1, name:'Circle your Shoulders', description:'Start with circling your shoulders backwards in small movements.\
    Then try to maximise the size of the circles.  After 30 seconds, switch the direction\
     of the circulation and repeat the movement.', duration: 60, goal:'Mobilization of the shoulder', effect: 'This exercise relaxes and mobilizes the shoulders. Backwards circling opens the chest thereby countering the unconscious forward-lean of the upper body.', image: 'assets/img/training/circleShoulders.png'},
   {id:2, name:'Raise your Shoulders', description:'Raise both shoulders at once up toward the ears. \
   Hold, release and drop them. Hold your breath while tensing and exhale when relaxing the muscles. Afterwards repeat the movement.', duration: 60, goal:'Relaxation of the shoulder muscles', effect: 'By repeatedly tensing and relaxing the muscles this exercise helps you relax particularly well.', image: 'assets/img/training/shoulder2.PNG'},
   {id:3, name:'Stretch  your Shoulders', description:'Create a U-form with your arms, the elbows are at the height of your shoulders. \
   Press your arms to the back. Hold this position some seconds. Afterwards put the hands together and pull the arms as much as possible in height of the shoulders to the front.\
    Hold this position some seconds and repeat the movement.', duration: 60, goal:'Stretch and Strengthening of the shoulder muscles', effect: 'This exercise combines a training of the shoulder muscles with an intensive stretch thereby making your feel very relaxed afterwards.',  image: 'assets/img/training/shoulder5.png'},
   {id:4, name:'Keep your Shoulders together', description:'Clutch your fingers at chest height. Create a tension by pressing the shoulder blades together and pull open the elbows.\
    Hold for 10 seconds and release. Repeat the movement three times.', duration: 60, goal:'Strengthening of the shoulder muscles', effect: 'This exercise counters the unhealthy posture we have when sitting in front of the computer. By pressing the shoulder blades together the back is straightened.',  image: 'assets/img/training/shoulder4.PNG'},
   {id:5,
     name:'Round Back',
     description:'Bend your upper body forward and let your arms rest on your legs. You shoulders should press gently towards the chair. Your back should be as round as possible.\
     Keep the posture for 5 - 7 seconds. Relax abruptly and slowly sit straight again. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal:'Relax back muscles',
     effect: 'This exercise relaxes your back muscles and thus also release stress related inner tensions.',
     image: 'assets/img/training/back1.jpg'},

 ];
 var category_three: Exercise[] = [
   {id:1, name:'Zoom with your Eyes', description:'Stretch your arm, the thumb points upwards. As long as you clearly see the thumb, move it slowly in direction of your face. \
   Afterwards move it slowly back to the starting position. Repeat this movement.', duration: 60, goal:'Relaxation of the eye muscles', effect: 'The repeated jump in viewing distance from close to far reduces tensions in your eye muscles.', image: 'assets/img/training/eye1.PNG'},
   {id:2, name:'Let your Eyes wander', description:'Select several items with different distances in your environment. Focus your view on each of this items a few seconds and then switch to the next one. \
   After arriving at the last item, go whole the way back.', duration: 60, goal:'Keep your eye lense flexible', effect: 'The incremental increase and decrease of viewing distance relaxes your eye muscles. ' +
   'This exercise is especially beneficial for people that work a lot in front of a computer.', image: 'assets/img/training/eye2.PNG'},
   {id:3, name:'Move your Eye ', description:'Slowly look with your open eyes to the left and then to the right side. Repeat it 5 times. Afterwards close your eyes for some seconds.\
    Finally look for 5 times up and down in a slow movement. ', duration: 60, goal:'Strengthen of eye muscles', effect: 'The exercise lets you actively tense and relax your eye muscles thereby strengthening and stretching them.', image: 'assets/img/training/eye3.PNG'},
   {id:4, name:'Coordinate your Eyes', description:'Stretch your arms at the height of your shoulders. Turn your head to the left side. The left thumb points up whereas the right one points down.\
    When turning the head to the other side, \
    also switch the thumbs position. Repeat it 7 times.', duration: 60, goal:'Coordination of eyes and hands', effect: 'This combined exercise trains and relaxes your eyes, neck, arms, and shoulders.', image: 'assets/img/training/eye4.PNG'},

 ];

 var category_four: Exercise[] = [
   {
     id: 1,
     name: 'Press and release: tongue and lips',
     description: 'Gently push your tongue against the roof of your mouth, while pressing your lips together. Keep the tension for 5 - 7 seconds. Relax abruptly and feel how the pressure releases. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal: 'Relax mouth and chin muscles',
     effect: 'With this exercise you first create a high amount of tension in muscles around your mouth and chin and second release it again. Actively feeling for how the pressure releases will reduce stress related tensions in the area.',
     image: 'assets/img/training/lips1.jpg'
   },{
     id: 2,
     name: 'Pull your stomach in',
     description: 'Pull your stomach in as much as you can. Keep the tension for 5 - 7 seconds. Relax abruptly and feel how the pressure releases. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal: 'Counter stomach cramps',
     effect: 'Wrong food, stress and excitement can lead to stomach aches and cramps. This exercise helps you counter these.',
     image: 'assets/img/training/stomach1.jpg'
   },{
     id: 3,
     name: 'Toe grabbing',
     description: 'Imagine you are trying to grab and hold a pencil with your toes and perform the corresponding movement. Keep the tension for 5 - 7 seconds. Relax abruptly and feel how the pressure releases. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal: 'Relax your toes',
     effect: 'During the day we keep our feet in tight shoes and hardly ever move them. This is especially true for our toes. This exercise retains the mobility and blood flow in the toes.',
     image: 'assets/img/training/toes1.jpg'
   },{
     id: 4,
     name: 'Horizontal Legs',
     description: 'Make sure your legs are side by side and touch one another. Now, lift your lower legs and try to keep them horizontally. Keep the tension for 5 - 7 seconds. Relax abruptly and feel how the pressure releases. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal: 'Strenghten your legs and stomach',
     effect: 'We tend to sit for long times during the day and thus do not use our legs often enough. With this exercise you activate your leg and stomach muscles again.',
     image: 'assets/img/training/legs1.jpg'
   },{
     id: 5,
     name: 'Push your stomach out',
     description: 'Push your stomach out as much as you can, it should feel very round. Keep the tension for 5 - 7 seconds and make sure your back is straight. Relax abruptly and feel how the pressure releases. Repeat after 20 seconds of relaxing.',
     duration: 60,
     goal: 'Release tensions from your stomach',
     effect: 'This exercise counters stress by actively pushing against stress related tensions that sit in your stomach.',
     image: 'assets/img/training/solarplexus.jpg'
   }
 ];

 export var TRAINING_DAT:any = {
   "count_categories": 4,
   "category_one": category_one,
   "category_two": category_two,
   "category_three": category_three,
   "category_four": category_four
 }
