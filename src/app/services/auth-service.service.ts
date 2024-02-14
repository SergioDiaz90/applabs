import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import infoUsers from 'src/assets/resources/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated: boolean;
  roleUser: string;

  constructor(
    private sessionStorage: SessionStorageService
  ) {
    this.isAuthenticated = false;
    this.roleUser = '';
  }

  async login(username: string, password: string, token: string) {
    try {
      let usersList: any = infoUsers.users.find((u: any) => u.user === username && u.password === password && u.token === token );

      if (usersList) {
        this.isAuthenticated = true;
        this.roleUser = usersList.role;
        console.log(this.roleUser);
        this.sessionStorage.insert(environment.keySession, usersList);
        return {'status': true, 'message': 'Inicio de sesión exitoso'};
      }

      return {'status': false, 'message': 'Credenciales inválidas'};

    } catch (e: any) {
      console.error('login', e.error);
      return {'status': false, 'message': { ...e.error }};
    }
  }

  async logout() {
    try {
      this.sessionStorage.remove(environment.keySession);
      this.isAuthenticated = false;
      return {'status': true, 'message': 'Logout successful.'};
    } catch (e: any) {
      console.error('logout', e.error);
      return {'status': false, 'message': { ...e.error }};
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isRoleUser(): string {
    console.log('rolee')
    console.log(this.roleUser)
    return this.roleUser;
  }
}
