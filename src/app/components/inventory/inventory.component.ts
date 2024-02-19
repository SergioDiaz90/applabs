import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';
import * as inventario from 'src/assets/resources/inventory.json';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  principalMenu: any[] = [];
  items: MenuItem[] = [];
  user: any;
  AllInventory: any;
  columnName = [
    { field: 'codigo', header: 'Código' },
    { field: 'producto', header: 'Producto' },
    { field: 'materia_prima', header: 'Materia prima' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'unidades_disponibles', header: 'Unidades disponibles' },
    { field: 'valor_gramo', header: 'Valor en gramos' },
  ]
  selectedProducts: any = [];
  Delete: string = '';


  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.AllInventory = await this.orderService.handlerInventory();
    this.AllInventory = this.AllInventory.inventario;
    console.log('inventory', this.AllInventory);
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

}
