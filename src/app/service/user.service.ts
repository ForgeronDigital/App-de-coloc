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

  private users:User[]= [];
  userSubject = new Subject<User[]>();
  total:number=0;
  retour='';
  giveBack='';

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user:User){
    this.users.push(user);
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
      console.log(this.total);
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
