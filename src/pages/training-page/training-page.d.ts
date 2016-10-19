import { NavController, ModalController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { UserProvider } from "../../providers/user-provider";
import { Exercise } from "../../model/exercise";
export declare class TrainingPage {
    navCtrl: NavController;
    modalCtrl: ModalController;
    userProvider: UserProvider;
    trainingProvider: TrainingProvider;
    modal: any;
    trainingData: Exercise[];
    constructor(navCtrl: NavController, modalCtrl: ModalController, userProvider: UserProvider, trainingProvider: TrainingProvider);
    ionViewDidLoad(): void;
    showModal(category: any): void;
    openTrainingModal(): void;
}
