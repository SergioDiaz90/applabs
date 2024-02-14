import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';
import { SessionStorageService } from './services/session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
      if (this.authService.isAuthenticatedUser() || this.sessionStorage.select(environment.keySession)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
