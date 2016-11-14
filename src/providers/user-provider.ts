import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



@Injectable()
export class UserProvider {

  public fireAuth: any;
  public userProfile: any;
  public experimentGroupRef: any;
  public logRef: any;
  public configurationRef: any;

  user: any = null;
  configuration: any = null;

  //constants
  public readonly IONIC_INVALID_PASSWORD = "Invalid password";
  private readonly IONIC_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MDg0YzM4OS0zNGMxLTQxNTYtYTExMS01MGM4ZmYxMDMxMGUifQ.dQE35KrPq7WJS6hA075eP3vlc-3y7io9VxGBgYpJnU4';

  /**
   * public auth: Auth,
   public user: User
   */
  constructor(public auth: Auth,
    public ionicUser: User,
    public http: Http) {

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
    this.experimentGroupRef = firebase.database().ref('/experiment_groups');
  }


  getViewConfiguration(): any {
    if (this.configuration != null) {
      return Rx.Observable.create((observer) => {
        observer.next(this.configuration);
        observer.complete();
      });
    }
    else {
      return Rx.Observable.create((observer) => {
        this.getCurrentUser().subscribe((user) => {
          var configKnowledgeRef = firebase.database().ref('experiment_groups/' + user.experiment_group_id + '/show_knowledgeview');
          configKnowledgeRef.on('value', (knowledgeView) => {
            var configProfilRef = firebase.database().ref('experiment_groups/' + user.experiment_group_id + '/show_profileview');
            configProfilRef.on('value', (profileView) => {
              this.configuration = {
                showKnowledgeView: knowledgeView.val(),
                showProfileView: profileView.val()
              }
              observer.next(this.configuration)
              observer.complete();
            });
          });
        });
      });
    }
  }

  getCurrentUser(): any {
    if (this.user != null) {
      return Rx.Observable.create((observer) => {
        observer.next(this.user);
        observer.complete();
      });
    }
    else {
      return Rx.Observable.create((observer) => {
        this.fireAuth.onAuthStateChanged((user) => {
          if (user) {
            var userRef = firebase.database().ref('userProfile/' + user.uid);
            userRef.on('value', (snapshot) => {
              var tempUser = snapshot.val();
              // tempUser.uid = user.uid;
              this.user = tempUser;
              this.user.uid = user.uid;
              observer.next(this.user)
              observer.complete();
            });
          }
          else {
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
   */
  loginUser(email: string, password: string): any {

    var returnObserver;
    let returnStream = Rx.Observable.create((observer) => {
      returnObserver = observer;
    })

    let details = { 'email': email, 'password': password };
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.auth.login('basic', details).then(() => {
        returnObserver.next();
        returnObserver.complete();
      }, (error) => {
        //we should never arrive here. if we do this can have three reasons:
        //1. ionic api is not available (while firebase is)
        //2. the user changed the password on firebase through the password reset function.
        //3. some admin related error (such as deleting the ionic account but leaving the firebase one)
        //we will decide what type of error it is depending on the "error" object given into the callback
        //apparently ionic does not give some technical id for the type of error. only the message tells us the error
        //the problem with that is that they might change the message and the following logic will break then...
        debugger;
        let msg = error.response.body.error.message;
        if (msg == this.IONIC_INVALID_PASSWORD) {
          // this seems to be error type 2.
          // delete the ionic account and create a new one.
          // make sure to set the test group property (take from firebase user)
          // also get the ionic uuid from the firebase user object
          this.getCurrentUser().subscribe((user) => {
            this.__deleteIonicAccount(user.ionic_uuid).subscribe(() => {
              this.__onlyIonicSignup(email, password, user.experiment_group_id, user.name).subscribe(() => {
                this.__onlyIonicLogin(email, password).subscribe(() => {
                  //now set the new ionic uuid to the firebase object
                  var userRef = firebase.database().ref('userProfile/' + user.uid);
                  userRef.child('ionic_uuid').set(this.ionicUser.id);

                  returnObserver.next();
                  returnObserver.complete();
                }, (error) => {
                  returnObserver.error(error);
                  returnObserver.complete();
                })
              }, (error) => {
                returnObserver.error(error);
                returnObserver.complete();
              })
            }, (error) => {
              returnObserver.error(error);
              returnObserver.complete();
            })
          })
        }
        else {
          returnObserver.error(error);
          returnObserver.complete();
        }
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
   */
  signupUser(email: string, password: string): any {

    var returnObserver;
    let returnStream = Rx.Observable.create((observer) => {
      returnObserver = observer;
    });

    //first create the firebase user
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {

      //determine which experiment group the user should be assigned to
      this.assignExperimentGroup(newUser.uid).subscribe((groupid) => {

        //now create the ionic user
        let details: UserDetails = { 'email': email, 'password': password, 'custom': { "experimentgroup": groupid } };
        this.auth.signup(details).then(() => {


          //sign-in and add all relevant data to the firebase user object
          this.loginUser(email, password).subscribe((user) => {

            let detailsAny: any = details;

            this.userProfile.child(newUser.uid).set({
              email: email,
              training_count: 0,
              experiment_group_id: detailsAny.custom.experimentgroup,
              ionic_uuid: this.ionicUser.id
            });

            // set all counters, which are required for logging data
            this.logRef = firebase.database().ref('dataLog/' + newUser.uid);
            this.logRef.set({
              profilePage_count: 0,
              knowledgePage_count: 0,
              training_count: 0,
              appOpening_count: 0,
              questionnaire_count: 0,
              appealPage_count: 0
            });

            // count all users
            this.userProfile.child('user_count').transaction(function (counter) {
              return counter + 1;
            })

            // Add data logo elements
            returnObserver.next();
            returnObserver.complete();
          });

        }, (error) => {
          returnObserver.error(error);
          returnObserver.complete();
        });
      });
    }, (error) => {
      returnObserver.error(error);
      returnObserver.complete();
    });

    return returnStream;
  }

  assignExperimentGroup(userid: string): any {
    return Rx.Observable.create((observer) => {

      this.experimentGroupRef.once('value', (snapshot) => {

        let groups = snapshot.val();

        //find smallest group
        var smallestGroupId = "";
        var smallestGroupCountMembers = 1000000;

        Object.keys(groups).forEach((key) => {
          if (groups[key].members) {
            if (Object.keys(groups[key].members).length < smallestGroupCountMembers) {
              smallestGroupCountMembers = Object.keys(groups[key].members).length;
              smallestGroupId = key;
            }
          }
          else {
            smallestGroupCountMembers = 0;
            smallestGroupId = key;
          }
        });

        let groupMemberRef = firebase.database().ref('/experiment_groups/' + smallestGroupId + "/members").push();
        groupMemberRef.set({
          "uid": userid
        });

        observer.next(smallestGroupId);
        observer.complete();
      });
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    this.user = null;
    this.auth.logout();
    return this.fireAuth.signOut();
  }


  __onlyFirebaseSignup(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({
          email: email,
          training_count: 0,
          experiment_group_id: "Experiment_id_placeholder"
        });
      });
  }

  __onlyIonicSignup(email: string, password: string, experiment_group_id: string, name: string): any {
    let details: UserDetails = { 'email': email, 'password': password, 'name': name, 'custom': { "experimentgroup": experiment_group_id } };
    return Rx.Observable.fromPromise(this.auth.signup(details));
  }

  __onlyIonicLogin(email, password) {
    return Rx.Observable.create((observer) => {
      let details = { 'email': email, 'password': password };
      this.auth.login('basic', details).then(() => {
        observer.next();
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });

    });
  }

  __deleteIonicAccount(ionic_uuid: string) {
    return Rx.Observable.create((observer) => {
      var headers = new Headers({
        'Authorization': 'Bearer ' + this.IONIC_API_KEY
      });
      headers.append('Content-Type', 'application/json');

      var options = new RequestOptions({
        method: RequestMethod.Delete,
        url: 'https://api.ionic.io/users/' + ionic_uuid,
        headers: headers
      });
      var req = new Request(options);

      this.http.request(req).subscribe((response) => {
        observer.next();
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    })
  }

  getNumberOfUsers(): any {
    return Rx.Observable.create((observer) => {
        var userCounterRef = firebase.database().ref('/userProfile/user_count');
        userCounterRef.on('value', (snapshot) => {
          observer.next(snapshot.val()); observer.complete();
        })
    });
  }
}
