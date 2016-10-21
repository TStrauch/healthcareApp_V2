import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



@Injectable()
export class UserProvider {
  public fireAuth: any;
  public userProfile: any;

  user: any = null;


  /**
   * public auth: Auth,
   public user: User
   */
    constructor(public auth: Auth, public ionicUser: User) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getCurrentUser(): any{
    if(this.user != null){
      return Rx.Observable.create( (observer) => {
        observer.next(this.user);
        observer.complete();
      });
    }
    else{
      return Rx.Observable.create( (observer) => {
        this.fireAuth.onAuthStateChanged((user) => {
          if(user){
            var userRef = firebase.database().ref('userProfile/' + user.uid);
            userRef.on('value', (snapshot) => {
              var tempUser = snapshot.val();
              tempUser.uid = user.uid;
              observer.next(tempUser)
              observer.complete();
              this.user = tempUser;
            });
          }
          else{
            observer.next(null);
            observer.complete();
          }
        });
      });
    }
  }

  /**
   *
   * @param email
   * @param password
   * @returns {any}
   *
   * subscribe to this with loginUser.subscribe(() => {}, (err) => {});
     */
  loginUser(email: string, password: string): any {

    var returnObserver;
    let returnStream = Rx.Observable.create((observer) => {
      returnObserver = observer;
    })

    let details = {'email': email, 'password': password};
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.auth.login('basic', details).then(() => {
          returnObserver.next();
          returnObserver.complete();
        }, (error) => {
          returnObserver.error(error);
          returnObserver.complete();
        });
    }, (error) => {
      returnObserver.error(error);
      returnObserver.complete();
    });

    // this.ionicUser.details.password = 'new password';

    return returnStream;
    // return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   *
   * @param email
   * @param password
   * @returns {any}
   *
   * TODO: SIMPLIFY!!! JUST WRAP THE PROMISES INTO A OBSERVABLE --> CONSISTENCY
     */
  signupUser(email: string, password: string): any {
    // return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
    //   this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
    //     this.userProfile.child(authenticatedUser.uid).set({
    //       email: email,
    //       training_count: 0
    //     });
    //   });
    // });

    var finalLoginObserver: any;
    var finalLoginStream = Rx.Observable.create( (observer) => {
      finalLoginObserver = observer;
    });

    //this one will be used to call next on by each auth-provider (firebase, ionic) once completed
    //it is used to collect the results and inform finalLoginObserver once all signup-requests have been completed
    var tmpLoginObserver: any;
    var tmpLoginStream = Rx.Observable.create( (observer) => {
      tmpLoginObserver = observer;
    });

    //here we subscribe to the tmpLoginStream and collect the results from the different auth-providers
    var allRequestsSuccessful: boolean = true;
    var requestsFinishedCounter = 0;
    let numberOfSignupRequestsFired = 2;
    tmpLoginStream.subscribe((loginFinishedBool) => {

      allRequestsSuccessful = allRequestsSuccessful && loginFinishedBool;
      requestsFinishedCounter++;

      if(allRequestsSuccessful == false){
        finalLoginObserver.next(false);
        finalLoginObserver.complete();
      }
      if(requestsFinishedCounter == numberOfSignupRequestsFired && allRequestsSuccessful == true){
        finalLoginObserver.next(true);
        finalLoginObserver.complete();
      }
    });

    //now all thats left to do is make each auth-provider request call next() on the tmpLoginObserver with the
    //corresponding boolean result.

    //firebase signup
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({
          email: email,
          training_count: 0
        });
      }).then(() => tmpLoginObserver.next(true));

    //ionic signup --> add the group assignment here to "name" property.
    let details: UserDetails = {'email': email, 'password': password};
    this.auth.signup(details).then(() => {
      // `this.user` is now registered
      tmpLoginObserver.next(true);
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          console.log('Ionic Signup:  Email already exists.');
        } else {
          // handle other errors
          console.log('Ionic Signup: some error occured');
          console.log(e);
        }
        tmpLoginObserver.next(false)
      }
    });

    return finalLoginStream;

  }

  //TODO: does not reset password yet for ionic. needs to be implemented!
  //TODO: best would be to just overwrite the user object of ionic account with the new password
  //TODO: how to do that? well one could set flag that the password will be reset and then at the next login
  //TODO: attempt one could simply overwrite the ionic password.
  //TODO: or: if the ionic login does not succeed but the google login does and the error message is wrong password
  //TODO: then once could simply overwrite the password in general. that way the ionic account stays transparent.
  //TODO: ALL OPTIONS NOT POSSIBLE! IN ORDER TO SET USER DATA THE USER HAS TO BE LOGGED IN ! ...

  //TODO: try sending directly via the API https://docs.ionic.io/api/http.html with API access token
  //TODO: to delete the user when the firebase password got reset.
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    this.user = null;
    this.auth.logout();
    return this.fireAuth.signOut();
  }


  __onlyFirebaseSignup(email: string, password: string): any{
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({
          email: email,
          training_count: 0
        });
      });
  }

  __onlyIonicSignup(email: string, password: string): any{
    let details: UserDetails = {'email': email, 'password': password};
    return this.auth.signup(details);
  }
}
