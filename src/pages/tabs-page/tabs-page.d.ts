import { NavController } from 'ionic-angular';
import { RootPage } from "../../interfaces/RootPage";
import { Push } from '@ionic/cloud-angular';
export declare class TabsPage implements RootPage {
    navCtrl: NavController;
    push: Push;
    tab1Root: any;
    tab2Root: any;
    tab3Root: any;
    constructor(navCtrl: NavController, push: Push);
    ionViewDidLoad(): void;
}
