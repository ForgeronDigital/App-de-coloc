import { Injectable } from '@angular/core';
import { Item } from '../models/Item.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items:Item[]=[];
  itemSubject=new Subject<Item[]>();

  constructor(){
    this.getItems();
  }

  emitItems (){
    this.itemSubject.next(this.items.slice());
  }

  addItem(item:Item){
    this.items.push(item);
    firebase.database().ref('/items').set(this.items);
    this.emitItems();
  }

  getItems(){
    firebase.database().ref('/items').on('value', (data)=>{
      this.items=data.val() ? data.val() : [];
      this.emitItems();
    });
  }

  deleteItem(indexItem){
    this.items.findIndex(
      (index)=>{
        return index===indexItem;
      }
    );
    this.items.splice(indexItem,1);
    firebase.database().ref('/items').set(this.items);
    this.emitItems();
  }
}
