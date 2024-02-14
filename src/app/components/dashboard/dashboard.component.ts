import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  principalMenu: any[] = [];
  items: MenuItem[] = [];

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu() {
    this.principalMenu = [
      {
        title: "Crear Proyecto",
        rol: "Analista",
        path: "/createProyect"
      },
      {
        title: "Crear Solicitud",
        rol: "",
        path: "/createRequest"
      },
      {
        title: "Validar Inventario",
        rol: "",
        path: "/inventory"
      },
      {
        title: "Crear Informe",
        rol: "",
        path: "/report"
      },
      {
        title: "Consultar Informe",
        rol: "",
        path: "/consultReport"
      }
    ];

    this.items = [
      {
          label: 'Usuario',
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

  async logOut () {
    let response = await this.authService.logout();
    if (response) {
      this.router.navigate(['/login']);
    }
  }

}
