import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainingPage } from "../training-page/training-page";
import { ProfilePage } from "../profile-page/profile-page";
import { KnowledgePage } from "../knowledge-page/knowledge-page";
import { RootPage } from "../../interfaces/RootPage";
import { Push, PushToken } from '@ionic/cloud-angular';
import { QuestionProvider } from "../../providers/question-provider";
import { UserProvider } from "../../providers/user-provider";

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage implements RootPage {
  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public knowledgeView: boolean;
  public profileView: boolean;

  constructor(public navCtrl: NavController,
    public push: Push,
    public questionProvider: QuestionProvider,
    public userProvider: UserProvider) {


    this.tab1Root = TrainingPage;
    this.tab2Root = ProfilePage;
    this.tab3Root = KnowledgePage;

    //make sure push is enabled.
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });


  }

  ionViewWillEnter() {
    this.userProvider.getViewConfiguration().subscribe((data) => {
      console.log(data);
      this.profileView = data.showProfileView;
      this.knowledgeView = data.showKnowledgeView;
    })
  }


  ionViewDidLoad() {
    /*  this.configuration = {
        showKnowledgeView: true,
        showProfileView: true
      }
  */

    console.log('Hello TabsPage Page');
  }

}
