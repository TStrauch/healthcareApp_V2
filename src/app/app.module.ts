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
import  {LogProvider} from "../providers/log-provider";

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
import {IntroductionPage} from "../pages/initial-start/introduction-page/introduction-page";
import {InitialQuestionnaire} from "../pages/initial-start/initial-questionnaire/initial-questionnaire";

// Import additional libraries


//healthcareApp project settings (not worklax-project)
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
// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '211fde7e'
//   },
//   'push': {
//     'sender_id': '808633843882',
//     'pluginConfig': {
//       'ios': {
//         'badge': true,
//         'sound': true
//       },
//       'android': {
//         'iconColor': '#343434'
//       }
//     }
//   }
// };

export const firebaseconfig = {
  apiKey: "AIzaSyA8FuVvYO2pwraBAQW8tQrvV_5T66xm1as",
   authDomain: "healthcareapp-18fe6.firebaseapp.com",
   databaseURL: "https://healthcareapp-18fe6.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "157850107630"
};
// export const firebaseconfig = {
//   apiKey: "AIzaSyCREzuQQNzNrcWRidRrpX1ZB8A38RvFxkk",
//   authDomain: "worklax-c8a7c.firebaseapp.com",
//   databaseURL: "https://worklax-c8a7c.firebaseio.com",
//   storageBucket: "worklax-c8a7c.appspot.com",
//   messagingSenderId: "808633843882"
// };

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
    IntroductionPage,
    InitialQuestionnaire
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
    IntroductionPage,
    InitialQuestionnaire
  ],
  providers: [
    UserProvider,
    RootPageProvider,
    TrainingProvider,
    QuestionProvider,
    LogProvider
  ]
})
export class AppModule {}
