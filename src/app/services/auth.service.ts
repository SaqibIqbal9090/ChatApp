import { Injectable } from '@angular/core';
import { Auth, UserInfo, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { Observable, concatMap, from, of, switchMap } from 'rxjs';

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
  signup(email:any,password:any){
    return from(createUserWithEmailAndPassword(this.auth ,email,password))
  }
  logout(){
    return from(this.auth.signOut());
  }
  updateProfile(profileData:Partial<UserInfo>):Observable<any>{
    const user =this.auth.currentUser;
    return of (user).pipe(
      concatMap(user => {
        if (!user) throw new Error('not Authenticated')
        return updateProfile(user ,profileData)
      })
    )
  }
}
