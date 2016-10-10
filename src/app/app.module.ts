import { NgModule } from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';

// Import providers
import { UserProvider } from '../providers/user-provider';
import {TrainingProvider} from "../providers/training-provider";
import {RootPageProvider} from "../providers/rootpage";

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {ProfilePage} from "../pages/profile-page/profile-page";
import {KnowledgePage} from "../pages/knowledge-page/knowledge-page";
import {TrainingPage} from "../pages/training-page/training-page";
import {KnowledgeDetailPage} from "../pages/knowledge-detail/knowledge-detail";
import {ChartsModule} from "ng2-charts/ng2-charts";

// Import additional libraries

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '211fde7e'
  },
  'push': {
    'sender_id': 'SENDER_ID',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

export const firebaseconfig = {
  apiKey: "AIzaSyCxSuxUhRSJ0yBgLmM6FHTui3qatvHXmMo",
  authDomain: "ionic2rctest.firebaseapp.com",
  databaseURL: "https://ionic2rctest.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "876282683428"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPassword,
    Signup,
    TabsPage,
    ProfilePage,
    KnowledgePage,
    TrainingPage,
    KnowledgeDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseconfig, myFirebaseAuthConfig),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPassword,
    Signup,
    TabsPage,
    ProfilePage,
    KnowledgePage,
    TrainingPage,
    KnowledgeDetailPage
  ],
  providers: [
    UserProvider,
    RootPageProvider,
    TrainingProvider
  ]
})
export class AppModule {}
