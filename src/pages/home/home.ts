import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  post: {
    userName: string,
    message: string,
    createdDate: any
  } = {
    userName: 'Taro Hogeyama',
    message: 'これはテストメッセージです',
    createdDate: '10分前'
  };
  message: string;

  posts: { userName: string, message: string, createdDate: any }[]
    = [
      {
        userName: 'Taro Hogeyama',
        message: 'これはテストメッセージです',
        createdDate: '10分前'
      },
      {
        userName: 'Jiro Hogeyama',
        message: '2つ目のメッセージ',
        createdDate: '5分前'
      }
    ];

  /*
    使いたい機能をimport(L2)
    →constructorの中でimportしたオブジェクト型のprivate変数を宣言
    →コンポーネントの中でインポートしてきたオブジェクトの機能を利用できるようになる
    …Dependency Injectionという概念
  */ 
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController
    ) {
  }

  addPost() {
    // 入力されたメッセージを使って、投稿データを作成
    this.post = {
      userName: 'Saburo Hogeyama',
      message: this.message,
      createdDate: '数秒前'
    };
    // 配列postsにpostを追加
    this.posts.push(this.post);
    // 入力フィールドを空にする
    this.message = '';
  }

  presentPrompt(index: number) {
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
            console.log(data);
            // メッセージを上書き
            this.posts[index].message = data.message;
          }
        }
      ]
    });
    // createしたalertCtrlの表示処理
    alert.present();
  }

}
