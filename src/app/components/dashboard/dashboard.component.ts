import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { colDefs } from 'src/app/interfaces/Iag-grid';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  principalMenu: any[] = [];
  items: MenuItem[] = [];
  roleUser: string;
  user: any;

  constructor(
    private authService: AuthServiceService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {
    this.roleUser = '';
  }

  ngOnInit(): void {
    this.roleUser = this.authService.isRoleUser();
    this.user = this.sessionStorage.select(environment.keySession);
    console.log('usuariooo');
    console.log(this.user)
    if (!this.roleUser) {
      this.router.navigate(['/login']);
    }
    this.initMenu();
  }

  initMenu() {
    this.principalMenu = [
      {
        title: "Crear Proyecto",
        rol: "analist-specialist",
        path: "/createProyect"
      },
      {
        title: "Crear Solicitud",
        rol: "laboratorist",
        path: "/createRequest"
      },
      {
        title: "Crear Ensayo",
        rol: "laboratorist",
        path: "/createTest"
      },
      {
        title: "Validar Inventario",
        rol: "analist-profesional",
        path: "/inventory"
      },
      {
        title: "Crear Informe",
        rol: "analist-specialist",
        path: "/report"
      },
      {
        title: "Consultar Informe",
        rol: "laboratorist",
        path: "/consultReport"
      }
    ];

    this.items = [
      {
          label: this.user.user,
          items: [
            {
              label: 'Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => {
                  this.logOut();
              }
          },
          ]
      }
    ];
  }

  navigateTo(path: string) {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate([path]);
      return;
    }

    this.router.navigate(['/login']);
  }

  async logOut () {
    let response = await this.authService.logout();
    if (response.status) {
      this.router.navigate(['/login']);
    }
  }

}
