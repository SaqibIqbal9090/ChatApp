import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginform.get('email');
  }
  get password() {
    return this.loginform.get('password');
  }
  submitlogin() {
    const { email, password } = this.loginform.value;
    if (this.loginform.valid || !email || !password) {
      this.authservice.login(email, password).pipe(
        this.toast.observe({
          success:'Congrats! You are logged In',
          loading:'Signing in...',
          error:({message})=>`${message}`
        })
      )
      .subscribe((res) => {
        if(res){
        this.router.navigate(['home']);}
        else{
          console.log(console.error());
          
        }
      });
    }
  }
}
