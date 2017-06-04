import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import { LogProvider } from "../../providers/log-provider";

/*
  Generated class for the AppealPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-appeal-page',
  templateUrl: 'appeal-page.html'
})
export class AppealPage {
  url: string;
  title: string;
  text: string;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              public logProvider: LogProvider) {

    this.url = params.get("url");
    if(this.url === '' || this.url === undefined){
      this.url = null;
    }
    this.title = params.get("title")
    this.text = params.get("text");

    this.logProvider.logCounter("appealPage_count").subscribe(() => {
      this.logProvider.logTime("appealPage_count", "appealOpening");
    });

  }

  ionViewDidLoad() {
    console.log('Hello AppealPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
