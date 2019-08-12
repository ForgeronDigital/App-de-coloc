import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../service/items.service';
import { Item } from '../models/Item.model';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  constructor(private userService : UserService,
              private itemService: ItemsService) {}

  itemForm: FormGroup;
  userGroup: FormGroup;
  userItems : Item[];
  itemSubscription : Subscription;
  users:User[];
  userSub:Subscription;



  ngOnInit() {

    this.userSub = this.userService.userSubject.subscribe(
      (users : User[])=> {
        this.users = users;
      }
    );
    this.userService.emitUsers();

    this.itemSubscription=this.itemService.itemSubject.subscribe(
      (items : Item[])=>{
        this.userItems=items;
      }
    );
    this.itemService.emitItems();

    this.userGroup= new FormGroup({
      user: new FormControl('', [Validators.required])
    })

    this.itemForm=new FormGroup({
      item: new FormControl('', [Validators.required]),
      price : new FormControl('', [Validators.required]),
      buyer : new FormControl('', [Validators.required])
    });

    this.sumUp();
  }

  ngOnDestroy(){
    this.cleanUp();
  }

  onSubmitForm(){
    const formValue = this.itemForm.value;
    const newItem = new Item(
      formValue['item'],
      formValue['price'],
      formValue['buyer']
    );
    this.itemService.addItem(newItem);
    this.cleanUp();
    this.sumUp();
  }

  onSubmitFormUser(){
    const formValue = this.userGroup.value;
    const newUser = new User(
      formValue['user']
    );
    this.userService.addUser(newUser);
  }

  onDeleteItem(indexItem){
    this.itemService.deleteItem(indexItem);
    this.itemService.emitItems();
    this.userService.emitUsers();
    this.cleanUp();
    this.sumUp();
  }

  sumUp(){
    this.users.forEach(user => {
      this.userItems.forEach(item => {
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
}