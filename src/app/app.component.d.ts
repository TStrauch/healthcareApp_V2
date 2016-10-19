import { Platform, ModalController, NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { RootPageProvider } from "../providers/rootpage";
import { Push } from '@ionic/cloud-angular';
export declare class MyApp {
    push: Push;
    af: AngularFire;
    rootPageProvider: RootPageProvider;
    modalCtrl: ModalController;
    nav: NavController;
    rootPage: any;
    modal: any;
    ngAfterViewInit(): void;
    constructor(platform: Platform, push: Push, af: AngularFire, rootPageProvider: RootPageProvider, modalCtrl: ModalController);
}
