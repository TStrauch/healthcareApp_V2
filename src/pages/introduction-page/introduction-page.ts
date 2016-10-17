import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import {RootPageProvider} from "../../providers/rootpage";
import { LoginPage } from '../login/login';

/*
  Generated class for the IntroductionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-introduction-page',
  templateUrl: 'introduction-page.html'
})
export class IntroductionPage {

  constructor(
  public navCtrl: NavController,
  public rootPageProvider: RootPageProvider) {}

  accept(){
    
    NativeStorage.setItem('introduction', {seen: true})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

    this.rootPageProvider.setRootPage(LoginPage);
  }

  ionViewDidLoad() {
    console.log('Hello IntroductionPage Page');
  }

}
