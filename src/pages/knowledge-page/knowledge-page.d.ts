import { NavController, ModalController } from 'ionic-angular';
import { TrainingProvider } from "../../providers/training-provider";
import { Exercise } from "../../model/exercise";
export declare class KnowledgePage {
    navCtrl: NavController;
    trainingProvider: TrainingProvider;
    modalCtrl: ModalController;
    exercises: Exercise[];
    modalKnowledgeDetail: any;
    constructor(navCtrl: NavController, trainingProvider: TrainingProvider, modalCtrl: ModalController);
    ionViewDidLoad(): void;
    onPageLoaded(): void;
    exerciseSelected(index: any): void;
}
