import { NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user-provider";
import { RootPageProvider } from "../../providers/rootpage";
export declare class ProfilePage {
    nav: NavController;
    userProvider: UserProvider;
    rootPageProvider: RootPageProvider;
    user: any;
    lineChartData: Array<any>;
    lineChartLabels: Array<any>;
    lineChartOptions: any;
    lineChartColors: Array<any>;
    lineChartLegend: boolean;
    lineChartType: string;
    constructor(nav: NavController, userProvider: UserProvider, rootPageProvider: RootPageProvider);
    ionViewDidLoad(): void;
    ionViewDidEnter(): void;
    logOut(): void;
}
