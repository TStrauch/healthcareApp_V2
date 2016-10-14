import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController) {

    this.url = params.get("url");

  }

  ionViewDidLoad() {
    console.log('Hello AppealPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
