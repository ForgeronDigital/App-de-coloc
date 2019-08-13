import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService,
              private formBuilder : FormBuilder,
              private route : Router,
              private authService : AuthService) { }

  userForm : FormGroup;
  pass=false;

  ngOnInit() {
    this.userForm=new FormGroup({
      firstname: new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('', [Validators.minLength(6), Validators.required]),
      password_confirmation : new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstname'] +" "+ formValue['lastname']
    );
    this.userService.addUser(newUser);
    this.route.navigate(['accueil']);
    this.authService.signUp(formValue['email'], formValue['password']);
  }

  onBlurPass(){
    const formValue = this.userForm.value;
    if (formValue['password_confirmation']!=formValue['password']){
      this.pass=true;
    }else{
      this.pass=false;
    }
  }

}
