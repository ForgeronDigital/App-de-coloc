import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../service/items.service';
import { Item } from '../models/Item.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  users:User[];
  items:Item[];
  userSub:Subscription;
  itemSub:Subscription;
  totalUsers:number;
  moneyDue;
  moneyBack;
  
  sumUp(){
    this.users.forEach(user => {
      this.items.forEach(item => {
        if(user.name===item.buyer){
          user.total+=item.price;
        }
      });
    });
  }
  cleanUp(){
    this.users.forEach(user => {
      user.total=0;
    });
  }

  constructor(private userService : UserService,
              private itemService : ItemsService) {}

  ngOnInit() {

    this.userSub = this.userService.userSubject.subscribe(
      (users : User[])=> {
        this.users = users;
      }
    );
    this.userService.emitUsers();

    this.itemSub = this.itemService.itemSubject.subscribe(
      (items :Item[])=>{
        this.items = items;
      }
    );
    this.itemService.emitItems();

    this.sumUp();
    this.userService.sumTotal();
    this.totalUsers=this.userService.total;
    this.userService.owMoney();
    this.moneyDue=this.userService.retour;
    this.moneyBack=this.userService.giveBack;
  }
  
  ngOnDestroy(){
    this.cleanUp();
    this.userService.cleanUpTotal();
    
  }
}
