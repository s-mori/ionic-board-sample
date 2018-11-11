import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

// FirebaseのAuthenticationの機能を使う為に必要
import { AngularFireAuth } from '@angular/fire/auth';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {
    email: string,
    password: string
  } = {
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth
  ) {
  }

  // ログイン処理
  userLogin() {
    // 実際のログイン処理
    this.afAuth.auth.signInWithEmailAndPassword(
      this.login.email, this.login.password
    )
    .then( user => {
      this.toastCtrl.create({
        message: 'ログインできました',
        duration: 3000
      }).present();

      // ログインできたらメッセージボードに移動する
      this.navCtrl.setRoot(HomePage);
    })
    .catch( error => {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    });
  }
}
