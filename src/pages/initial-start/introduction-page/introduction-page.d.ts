import { NavController } from 'ionic-angular';
import { RootPageProvider } from "../../../providers/rootpage";
import { Push } from '@ionic/cloud-angular';
export declare class IntroductionPage {
    navCtrl: NavController;
    rootPageProvider: RootPageProvider;
    push: Push;
    constructor(navCtrl: NavController, rootPageProvider: RootPageProvider, push: Push);
    accept(): void;
    ionViewDidLoad(): void;
}
