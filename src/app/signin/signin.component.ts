import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private route :Router,
              private authService : AuthService) { }

  userSignIn : FormGroup;

  ngOnInit() {
    this.userSignIn = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  onSubmitForm(){
    const userIn = this.userSignIn.value;
    this.authService.signIn(userIn.email, userIn.password);
    this.route.navigate(['user']);
  }

}
