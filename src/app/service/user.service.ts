import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(){
    this.getUser();
  }

  private users:User[]=[];
  userSubject = new Subject<User[]>();
  total:number=0;
  retour='';
  giveBack='';

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(newUser:User){

    let verif;
    console.log(this.users);
    if(this.users.length>0){
      verif = this.users.find(
        (user:User)=>{
            return newUser.name===user.name;
        });
    }else{verif=undefined;}

    console.log(verif);

    if(verif===undefined){
      this.users.push(newUser);
    }else if(verif.name!=newUser.name){
      this.users.push(newUser);}
    firebase.database().ref('/users').set(this.users);
    this.emitUsers();
  }

  getUser(){
    firebase.database().ref('/users').on('value', (data)=>{
      this.users=data.val() ? data.val() : [];
    });
    this.emitUsers();
  }
  
  sumTotal(){
    this.users.forEach(user => {
      this.total += user.total;
    });
  }

  cleanUpTotal(){
    this.total=0;
  }

  owMoney(){
    this.retour='';
    this.giveBack='';
    this.users.forEach(user => {
     if(user.total<(this.total/this.users.length)){
       let moneyDue:number = (this.total/this.users.length)-user.total;

       this.retour+=`${user.name} doit ${moneyDue}€ `;
      }else if(user.total>(this.total/this.users.length)){
        let moneyBack = user.total-(this.total/this.users.length);

        this.giveBack+=`${user.name} doit récupérer ${moneyBack}€ `;
      }
    });
  }
}
