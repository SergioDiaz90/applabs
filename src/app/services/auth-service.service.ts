import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated: boolean;

  constructor(
    private sessionStorage: SessionStorageService
  ) {
    this.isAuthenticated = false;
  }

  async login(username: string, password: string) {
    try {
      this.isAuthenticated = true;
      this.sessionStorage.insert(environment.keySession, { username, password });

      return true;

    } catch (e: any) {
      console.error('login', e.error);
      return false;
    }
  }

  async logout() {
    try {
      this.sessionStorage.remove(environment.keySession);
      this.isAuthenticated = false;
      return true;
    } catch (e: any) {
      console.error('logout', e.error);
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
