import { NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user-provider";
export declare class HomePage {
    nav: NavController;
    userProvider: UserProvider;
    constructor(nav: NavController, userProvider: UserProvider);
    logOut(): void;
}
