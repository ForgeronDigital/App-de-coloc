import { Component, OnInit } from '@angular/core';
import {AuthService} from './service/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService : AuthService){

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyCGKhQXcXGbdcZWXnfDuOa6uKbznmFKs38",
    authDomain: "app-de-coloc.firebaseapp.com",
    databaseURL: "https://app-de-coloc.firebaseio.com",
    projectId: "app-de-coloc",
    storageBucket: "app-de-coloc.appspot.com",
    messagingSenderId: "963488181912",
    appId: "1:963488181912:web:fea4215901d2d0ec"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
  auth:boolean;

  ngOnInit(){
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.auth =true;
        }else{
          this.auth=false;
        }
      }
    );
  }

  signOut(){
    this.authService.signOut();
    this.auth=this.authService.auth;
  }
}
