import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  token = '';
  messages: Message[] = [];


  public loginForm = this.fb.group({
    username: ['' ,Validators.required],
    password: ['',Validators.required],
  });

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
      
  }

  async login() {
    let response = await this.authService.login(this.username, this.password, this.token);
    if (!response.status) {
      this.messages = [{ severity: 'error', summary: 'error', detail: response.message }];
    }
    console.log('loginComponent', response);
    if (response.status) {
      this.router.navigate(['/dashboard']);
    }
  }

}
