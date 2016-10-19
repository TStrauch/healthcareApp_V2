import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
export declare class KnowledgeDetailPage {
    navCtrl: NavController;
    navParams: NavParams;
    trainingProvider: TrainingProvider;
    viewCtrl: ViewController;
    id: any;
    exerciseInfo: any;
    constructor(navCtrl: NavController, navParams: NavParams, trainingProvider: TrainingProvider, viewCtrl: ViewController);
}
