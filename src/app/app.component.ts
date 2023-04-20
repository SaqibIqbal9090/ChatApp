import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authservice:AuthService,private router:Router ,private userservice:UsersService){}
user$ =this.userservice.currentUserProfile$;
  logout(){
    this.authservice.logout().subscribe(()=>{
      this.router.navigate(['/login'])
    })
  }
}
