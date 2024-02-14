import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';


  public loginForm = this.fb.group({
    username: ['' ,Validators.required],
    password: ['',Validators.required],
  });

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      
  }

  async login() {
    let response = await this.authService.login(this.username, this.password);
    if (response) {
      console.log('loginComponent', response);
      this.router.navigate(['/dashboard']);
    }
  }

}
