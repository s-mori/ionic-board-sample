import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {

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

}
