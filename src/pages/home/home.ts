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

}
