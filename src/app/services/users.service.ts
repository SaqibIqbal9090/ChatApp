import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { Observable, from, of, switchMap } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import { AuthService } from './auth.service';
import { docData } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  get currentUserProfile$(): Observable<ProfileUser | null>{
    return  this.authservice.currentUser$.pipe(
      switchMap(user =>{
        if(!user?.uid){
          return of (null)
        }
        const ref = doc(this.firestore , 'users' , user?.uid)
        return docData(ref) as Observable<ProfileUser>;
      })
    )
  }



  constructor(private firestore:Firestore, private authservice:AuthService) { }
addUser(user:ProfileUser): Observable<any>{
  const ref= doc(this.firestore, 'users', user?.uid)
  return from (setDoc(ref,user));
}

updateUser(user:ProfileUser): Observable<any>{
  const ref= doc(this.firestore, 'users', user?.uid)
  return from (updateDoc(ref,{...user}));


}
}
