import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import moment from 'moment';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

// 定義したインタフェースをインポート
import  { Post } from '../../app/models/post';

// ログインページ
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message: string; // 入力メッセージ
  post: Post;      // Postと同じデータ構造のプロパティを指定
  posts: Post[];   // Post型の配列を指定

  // Firestoreのコレクションを扱うプロパティ
  postsCollection: AngularFirestoreCollection<Post>;

  /*
    使いたい機能をimport(L2)
    →constructorの中でimportしたオブジェクト型のprivate変数を宣言
    →コンポーネントの中でインポートしてきたオブジェクトの機能を利用できるようになる
    …Dependency Injectionという概念
  */ 
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
  }

  // ライフサイクルメソッド
  // ページがアクティブになる直前に実行
  ionViewWillEnter() {
    // Firestoreのネットワークを有効にする
    // 一度ログアウトするとFirestoreへ正常に読み書きできなくなる現象の対応
    this.afStore.firestore.enableNetwork();
    this.getPosts();
  }

  // 追加
  addPost() {
    // 入力されたメッセージを使って、投稿データを作成
    this.post = {
      id: '',
      userName: this.afAuth.auth.currentUser.displayName,
      message: this.message,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Firestoreにデータを追加
    this.afStore.collection('posts').add(this.post)
      .then( (docRef) => {
        // 一度投稿を追加した後に、idを更新
        this.postsCollection.doc(docRef.id).update({
          id: docRef.id
        });
        // 追加できたら入力フィールドを空にする
        this.message = '';
      })
      .catch( (error) => {
        // エラーはToastControllerで表示
        this.toastCtrl.create({
          message: error,
          duration: 5000
        }).present();
      })
  }

  getPosts() {
    // コレクションの参照をここで取得
    this.postsCollection = this.afStore.collection(
      'posts',
      ref => ref.orderBy('created', 'desc')
    );

    // データに変更があったらそれを受け取ってpostsに入れる
    this.postsCollection.valueChanges()
      .subscribe( data => {
        this.posts = data;
      });
  }

  // 編集
  presentPrompt(post: Post) {
    let alert = this.alertCtrl.create({
      title: 'メッセージ編集',
      inputs: [
        {
          name: 'message',
          placeholder: 'メッセージ'
        }
      ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            console.log('キャンセルが選択されました');
          }
        },
        {
          text: '更新',
          handler: data => {
            // 投稿を更新するメソッドを実行
            this.updatePost(post, data.message);
          }
        }
      ]
    });
    // createしたalertCtrlの表示処理
    alert.present();
  }

  // メッセージをアップデート
  // 更新される投稿とメッセージを受け取る
  updatePost(post: Post, message: string) {
    // 入力されたメッセージで投稿を更新
    this.postsCollection.doc(post.id).update({
      message: message
    }).then( () => {
      this.toastCtrl.create({
        message: '投稿が更新されました',
        duration: 3000
      }).present();
    }).catch( (error) => {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    })
  }

  // 削除
  deletePost(post: Post) {
    // 受け取った投稿のidを参照して削除
    this.postsCollection.doc(post.id).delete()
      .then( () => {
        this.toastCtrl.create({
          message: '投稿が削除されました',
          duration: 3000
        }).present();
      }).catch( (error) => {
        this.toastCtrl.create({
          message: error,
          duration: 5000
        }).present();
      })
  }

  // 投稿日時と現在日時の差分を返す
  differenceTime(time: Date): string {
    // 出力を日本語に設定
    moment.locale('ja');
    return moment(time).fromNow();
  }

  // ログアウト処理
  logout() {
    /*
      Firestoreのネットワークを無効化
      ログアウト直後にFirestoreへ読み込みが発生した際、
      権限エラーになってしまうのを防止
    */
    this.afStore.firestore.disableNetwork();
    this.afAuth.auth.signOut()
      .then( () => {
        this.toastCtrl.create({
          message: 'ログアウトしました',
          duration: 3000
        }).present();
        this.navCtrl.setRoot(LoginPage);
      }).catch( error => {
        this.toastCtrl.create({
          message: error,
          duration: 5000
        }).present();
      })
  }
}
