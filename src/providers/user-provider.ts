import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
// import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  public fireAuth: any;
  public userProfile: any;

  /**
   * public auth: Auth,
   public user: User
   */
  constructor() {

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getCurrentUser(): any{
    return Rx.Observable.create( (observer) => {
      this.fireAuth.onAuthStateChanged((user) => {
        if(user){
          observer.next(user);
        }
        else{
          observer.error(null);
        }
        observer.complete();
      });
    });
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): any {
    //this one will be returned to the controller and called .next() once both logins returned
    debugger;

    // var finalLoginObserver: any;
    // var finalLoginStream = Rx.Observable.create( (observer) => {
    //   finalLoginObserver = observer;
    // });
    //
    // //this one will be used to call next on by each auth-provider (firebase, ionic) once completed
    // //it is used to collect the results and inform finalLoginObserver once all signup-requests have been completed
    // var tmpLoginObserver: any;
    // var tmpLoginStream = Rx.Observable.create( (observer) => {
    //   tmpLoginObserver = observer;
    // });
    //
    // //here we subscribe to the tmpLoginStream and collect the results from the different auth-providers
    // var allRequestsSuccessful: boolean = true;
    // var allRequestsFinishedCounter = 0;
    // let numberOfSignupRequestsFired = 1;
    // tmpLoginStream.subscribe((loginFinishedBool) => {
    //
    //   allRequestsSuccessful = allRequestsSuccessful && loginFinishedBool;
    //   allRequestsFinishedCounter++;
    //
    //   if(allRequestsSuccessful == false){
    //     let error = {message: "some signup error occured."};
    //     finalLoginObserver.error(error);
    //     finalLoginObserver.complete();
    //   }
    //   if(allRequestsFinishedCounter == numberOfSignupRequestsFired && allRequestsSuccessful == true){
    //     finalLoginObserver.next();
    //     finalLoginObserver.complete();
    //   }
    // });
    //
    // //now all thats left to do is make each auth-provider request call next() on the tmpLoginObserver with the
    // //corresponding boolean result.
    //
    // //firebase signup
    // this.fireAuth.createUserWithEmailAndPassword(email, password)
    //   .then((newUser) => {
    //     this.userProfile.child(newUser.uid).set({email: email});
    //   }).then(() => tmpLoginObserver.next(true));

    //ionic signup
    // let details: UserDetails = {'email': email, 'password': password};
    // this.auth.signup(details).then(() => {
    //   // `this.user` is now registered
    //   tmpLoginObserver.next(true);
    // }, (err: IDetailedError<string[]>) => {
    //   for (let e of err.details) {
    //     if (e === 'conflict_email') {
    //       console.log('Ionic Signup:  Email already exists.');
    //     } else {
    //       // handle other errors
    //       console.log('Ionic Signup: some error occured');
    //       console.log(e);
    //     }
    //     tmpLoginObserver.next(false)
    //   }
    // });

    // return finalLoginStream;

  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }
}
