import 'rxjs/add/operator/map';
export declare class UserProvider {
    fireAuth: any;
    userProfile: any;
    user: any;
    /**
     * public auth: Auth,
     public user: User
     */
    constructor();
    getCurrentUser(): any;
    loginUser(email: string, password: string): any;
    signupUser(email: string, password: string): any;
    resetPassword(email: string): any;
    logoutUser(): any;
}
