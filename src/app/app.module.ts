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
import  {QuestionProvider} from "../providers/question-provider";
import {RootPageProvider} from "../providers/rootpage";

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {TabsPage} from "../pages/tabs-page/tabs-page";
import {ProfilePage} from "../pages/profile-page/profile-page";
import {KnowledgePage} from "../pages/knowledge-page/knowledge-page";
import {TrainingPage} from "../pages/training-page/training-page";
import {KnowledgeDetailPage} from "../pages/knowledge-detail/knowledge-detail";
import {Questionnaire} from "../pages/questionnaire/questionnaire";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {AppealPage} from "../pages/appeal-page/appeal-page";
import {TrainingExercisePage} from "../pages/training-exercise-page/training-exercise-page";
import {IntroductionPage} from "../pages/introduction-page/introduction-page";

// Import additional libraries

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '211fde7e'
  },
  'push': {
    'sender_id': '157850107630',
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
  apiKey: "AIzaSyA8FuVvYO2pwraBAQW8tQrvV_5T66xm1as",
   authDomain: "healthcareapp-18fe6.firebaseapp.com",
   databaseURL: "https://healthcareapp-18fe6.firebaseio.com",
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
    TrainingExercisePage,
    KnowledgeDetailPage,
    Questionnaire,
    AppealPage,
    IntroductionPage
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
    TrainingExercisePage,
    KnowledgeDetailPage,
    Questionnaire,
    AppealPage,
    IntroductionPage
  ],
  providers: [
    UserProvider,
    RootPageProvider,
    TrainingProvider,
    QuestionProvider
  ]
})
export class AppModule {}
