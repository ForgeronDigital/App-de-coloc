import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authservice :AuthService,
                private route :Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().onAuthStateChanged(
          (user)=>{
            if(user){
              resolve(true);
            }else{
              this.route.navigate(['accueil']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}