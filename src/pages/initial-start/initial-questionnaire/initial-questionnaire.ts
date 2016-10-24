import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RootPageProvider} from "../../../providers/rootpage";
import {TabsPage} from "../../tabs-page/tabs-page";
import {Validators, FormBuilder } from '@angular/forms';
import {UserProvider} from "../../../providers/user-provider";
import {LogProvider} from "../../../providers/log-provider";
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';

/*
  Generated class for the InitialQuestionnaire page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-initial-questionnaire',
  templateUrl: 'initial-questionnaire.html'
})
export class InitialQuestionnaire {
  gender: any;
  major: any;
  questionnaire: any;
  fireAuth: any;
  userRef: any;


  constructor(public navCtrl: NavController,
    public rootPageProvider: RootPageProvider,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public logProvider: LogProvider
  ) {

    this.fireAuth = firebase.auth();


    this.questionnaire = formBuilder.group({
      age: ['', Validators.compose([Validators.maxLength(2), Validators.pattern('[0-9]*'), Validators.required])],
      gender: ['', Validators.required],
      major: ['', Validators.required]
    });

    // Set possibile selections for form
    this.gender = [
      { value: 'm', display: 'Male' },
      { value: 'f', display: 'Female' },
    ];
    this.major = [
      { value: 'economics', display: 'Economics' },
      { value: 'business', display: 'Business' },
      { value: 'science', display: 'Science' }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello InitialQuestionnaire Page');

  }

  submit() {

     // Email not working as path, use UID?
        this.userProvider.getCurrentUser().subscribe((user) => {
          debugger;
          this.userRef = firebase.database().ref('dataLog/' + user.uid); 
          this.userRef.update({
            age: this.questionnaire.value.age,
            gender: this.questionnaire.value.gender,
            major: this.questionnaire.value.major
          });
        })
    
    // Set First start here
    this.logProvider.logCounter("appOpening_count").subscribe(() =>{
        this.logProvider.logTime("appOpening_count", "appOpening");
    });


    this.rootPageProvider.setRootPage(TabsPage, {}, { "animate": true, "direction": "exit" });
  }

}
