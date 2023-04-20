import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs';


export function passwordsMatchValidtor():ValidatorFn{
  return (control:AbstractControl):ValidationErrors|null=>{
    const password =control.get('password')?.value;
    const confirmpassword = control.get('confirmpassword')?.value
    if(password && confirmpassword && password !== confirmpassword){
      return{
        passwordsdontmatch:true
      }
    }
return  null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private authservice:AuthService ,private router:Router, private toast:HotToastService , private userservice:UsersService){}

  signupform=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required]),
    confirmpassword:new FormControl('',Validators.required),
  },{validators:passwordsMatchValidtor()})

 get name(){
  return this.signupform.get('name')
 }
 get email(){
  return this.signupform.get('email')
 }
 get password(){
  return this.signupform.get('password')
 }
 get confirmpassword(){
  return this.signupform.get('confirmpassword')
 }


 submitSignup(){
  const { name ,email ,password }=this.signupform.value;
  if(this.signupform.invalid || !email || !password)return;
  
  this.authservice.signup(email,password).pipe(
    switchMap(({user :{uid}})=> this.userservice.addUser({uid , email , displayName:name})),
    this.toast.observe({
      success:'Congrats! You are signed up',
      loading:'Signing in...',
      error:({message})=>`${message}`
    })
  ).subscribe(()=>{
    this.router.navigate(['/home'])
  })

 }
}
