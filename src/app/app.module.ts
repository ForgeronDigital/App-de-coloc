import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Routes, RouterModule } from '@angular/router';
import {AuthService} from './service/auth.service';
import { DetailUserComponent } from './detail-user/detail-user.component'
import { AuthGuard } from './service/authGuard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsService } from './service/items.service';

const route :Routes =[
  {path: 'accueil', component : AccueilComponent },
  {path: '', redirectTo:'accueil', pathMatch:"full"},
  {path: 'user', canActivate:[AuthGuard], component : DetailUserComponent},
  {path: 'signin', component : SigninComponent},
  {path: 'signup', component : SignupComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DetailUserComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, UserService, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
