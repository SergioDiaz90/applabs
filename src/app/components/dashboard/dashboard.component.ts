import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roleUser: string;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.roleUser = '';
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.roleUser = this.authService.isRoleUser();
    }

    console.log('DashboardComponent', this.roleUser);
  }

  async logOut () {
    let response = await this.authService.logout();
    if (response.status) {
      this.router.navigate(['/login']);
    }
  }

}
