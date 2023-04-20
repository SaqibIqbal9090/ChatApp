import { Component ,OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from "../../services/image-upload.service";
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private authservice:AuthService ,private imageservice :ImageUploadService,private toast:HotToastService, private userservice:UsersService){}
  ngOnInit() {
    this.userservice.currentUserProfile$.subscribe((user)=>{
      this.profileForm.patchValue({...user})
    })
  }

  user$ =this.authservice.currentUser$;
  profileForm =new FormGroup({
    uid :new FormControl(''),
    email :new FormControl(''),                          
    displayName :new FormControl(''),
    photoURL:new FormControl(''),
    firstName :new FormControl(''),
    lastName:new FormControl(''),
    phone:new FormControl(''),
    address :new FormControl(''),
  })







  uploadImage(event:any ,user:User)
  {
    this.imageservice.uploadImage(event.target.files[0],`images/profile${user.uid}`).pipe(
      this.toast.observe(
        {
          loading:"Uploading...",
          success:"Image Uploaded Successfully!",
          error: "There was an error in uploading"
        }
      ),
      concatMap((photoURL)=> this.authservice.updateProfile({photoURL}))

     
    ).subscribe();

  }
  saveProfile(){
    const profileData:any = this.profileForm.value;
    this.userservice.updateUser(profileData).pipe(
      this.toast.observe({
        loading:"updating data...",
        success:"Data has been added Successfully!",
        error: "There was an error in updating data"
      })
    ).subscribe();
  }

}
