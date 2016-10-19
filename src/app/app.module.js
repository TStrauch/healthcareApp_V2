var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { UserProvider } from '../providers/user-provider';
import { TrainingProvider } from "../providers/training-provider";
import { QuestionProvider } from "../providers/question-provider";
import { RootPageProvider } from "../providers/rootpage";
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { TabsPage } from "../pages/tabs-page/tabs-page";
import { ProfilePage } from "../pages/profile-page/profile-page";
import { KnowledgePage } from "../pages/knowledge-page/knowledge-page";
import { TrainingPage } from "../pages/training-page/training-page";
import { KnowledgeDetailPage } from "../pages/knowledge-detail/knowledge-detail";
import { Questionnaire } from "../pages/questionnaire/questionnaire";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { AppealPage } from "../pages/appeal-page/appeal-page";
import { TrainingExercisePage } from "../pages/training-exercise-page/training-exercise-page";
import { IntroductionPage } from "../pages/initial-start/introduction-page/introduction-page";
import { InitialQuestionnaire } from "../pages/initial-start/initial-questionnaire/initial-questionnaire";
// Import additional libraries
var cloudSettings = {
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
export var firebaseconfig = {
    apiKey: "AIzaSyA8FuVvYO2pwraBAQW8tQrvV_5T66xm1as",
    authDomain: "healthcareapp-18fe6.firebaseapp.com",
    databaseURL: "https://healthcareapp-18fe6.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "876282683428"
};
var myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                QuestionProvider
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
