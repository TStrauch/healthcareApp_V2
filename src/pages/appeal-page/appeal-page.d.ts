import { NavController, ViewController, NavParams } from 'ionic-angular';
export declare class AppealPage {
    navCtrl: NavController;
    params: NavParams;
    viewCtrl: ViewController;
    url: string;
    constructor(navCtrl: NavController, params: NavParams, viewCtrl: ViewController);
    ionViewDidLoad(): void;
    dismiss(): void;
}
