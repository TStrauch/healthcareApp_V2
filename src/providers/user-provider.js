var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
// import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var UserProvider = (function () {
    /**
     * public auth: Auth,
     public user: User
     */
    function UserProvider() {
        this.user = null;
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
    }
    // getCurrentUserData(uid: string): any{
    //   if(this.userData != null){
    //     return Rx.Observable.create( (observer) => {
    //       observer.next(this.userData);
    //       observer.complete();
    //     });
    //   }
    //   else{
    //     var userRef = firebase.database().ref('userProfile/' + uid);
    //
    //     var responseStream = Rx.Observable.create( (observer) => {
    //       userRef.on('value', (snapshot) => {
    //         observer.next(snapshot.val())
    //         observer.complete();
    //       });
    //     });
    //
    //     return responseStream;
    //   }
    // }
    UserProvider.prototype.getCurrentUser = function () {
        var _this = this;
        if (this.user != null) {
            return Rx.Observable.create(function (observer) {
                observer.next(_this.user);
                observer.complete();
            });
        }
        else {
            return Rx.Observable.create(function (observer) {
                _this.fireAuth.onAuthStateChanged(function (user) {
                    if (user) {
                        var userRef = firebase.database().ref('userProfile/' + user.uid);
                        userRef.on('value', function (snapshot) {
                            observer.next(snapshot.val());
                            observer.complete();
                            _this.user = snapshot.val();
                        });
                    }
                    else {
                        observer.error(null);
                        observer.complete();
                    }
                });
            });
        }
    };
    // getCurrentUser(): any{
    //   if(this.user != null){
    //     return Rx.Observable.create( (observer) => {
    //       observer.next(this.user);
    //       observer.complete();
    //     });
    //   }
    //   else{
    //     return Rx.Observable.create( (observer) => {
    //       this.fireAuth.onAuthStateChanged((user) => {
    //         if(user){
    //           this.user = user;
    //           observer.next(user);
    //         }
    //         else{
    //           observer.error(null);
    //         }
    //         observer.complete();
    //       });
    //     });
    //   }
    // }
    UserProvider.prototype.loginUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    UserProvider.prototype.signupUser = function (email, password) {
        var _this = this;
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then(function (newUser) {
            _this.fireAuth.signInWithEmailAndPassword(email, password).then(function (authenticatedUser) {
                _this.userProfile.child(authenticatedUser.uid).set({
                    email: email,
                    training_count: 0
                });
            });
        });
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
    };
    UserProvider.prototype.resetPassword = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    UserProvider.prototype.logoutUser = function () {
        this.user = null;
        return this.fireAuth.signOut();
    };
    UserProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserProvider);
    return UserProvider;
}());
