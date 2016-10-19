import { NavController, ViewController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { UserProvider } from "../../providers/user-provider";
import { Exercise } from "../../model/exercise";
export declare class TrainingExercisePage {
    navCtrl: NavController;
    userProvider: UserProvider;
    trainingProvider: TrainingProvider;
    viewCtrl: ViewController;
    counter: any;
    trainingData: Exercise[];
    actualExercise: Exercise;
    timer: any;
    buttonText: any;
    clockText: any;
    cardState: any;
    constructor(navCtrl: NavController, userProvider: UserProvider, trainingProvider: TrainingProvider, viewCtrl: ViewController);
    start(): void;
    setButtonText(): void;
    startTimer(): void;
    runTimer(): void;
    visualizeClock(inputSeconds: number): void;
    initTimer(): void;
}
