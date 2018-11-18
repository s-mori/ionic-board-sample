import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

// FirebaseのAuthenticationの機能を使うために必要
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signup: {
    email: string,
    password: string,
    name: string
  } = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // ユーザ登録処理
  signUp() {
    // ユーザアカウントを作成
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.signup.email, this.signup.password
    )
      .then(created => {
        let newUser = created.user;
        newUser.updateProfile({
          // 入力された名前を設定してプロフィールを上書き
          displayName: this.signup.name,
          photoURL: ''
        })
          .then(res => {
            this.toastCtrl.create({
              message: `${created.user.displayName}さんを登録しました`,
              duration: 3000
            }).present();
          }).catch(error => {
            this.toastCtrl.create({
              message: error,
              duration: 5000
            }).present();
          });
          // 登録に成功したら、ログインページに戻す
          this.goBack();
      }).catch(error => {
        this.toastCtrl.create({
          message: error,
          duration: 5000
        }).present();
      })
  }

  // ログインページに戻る処理
  goBack() {
    this.navCtrl.pop();
  }

}
