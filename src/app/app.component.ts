import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authservice:AuthService,private router:Router){}

  logout(){
    this.authservice.logout().subscribe(()=>{
      this.router.navigate(['/login'])
    })
  }
}
