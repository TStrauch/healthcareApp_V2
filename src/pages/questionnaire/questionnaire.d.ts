import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionProvider } from "../../providers/question-provider";
export declare class Questionnaire {
    navCtrl: NavController;
    params: NavParams;
    viewCtrl: ViewController;
    questionProvider: QuestionProvider;
    category: any;
    questions: any;
    actualQuestion: any;
    scale: any;
    answer: any;
    length: any;
    counter: any;
    form: any;
    constructor(navCtrl: NavController, params: NavParams, viewCtrl: ViewController, questionProvider: QuestionProvider);
    sendQuestion(): void;
    ionViewDidLoad(): void;
}
