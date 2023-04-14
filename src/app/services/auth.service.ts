import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth:Auth) { }
  currentUser$= authState(this.auth);

  login(email:any ,password:any){
     console.log("logging in........")
    
   return from(signInWithEmailAndPassword(this.auth ,email,password));
   
  }
  signup(name:any,email:any,password:any){
    return from(createUserWithEmailAndPassword(this.auth ,email,password)).pipe(
    switchMap(({user})=>updateProfile(user , {displayName:name})));
  }
  logout(){
    return from(this.auth.signOut());
  }
}
