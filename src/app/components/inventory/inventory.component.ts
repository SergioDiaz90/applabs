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
  inventoryUnfiltered: any;


  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.AllInventory = await this.getInventory();
    console.log('inventory', this.AllInventory);
  }

  async onSearch(event: any) {
    let filter;

    if (event.target.value !== '') {
      filter = this.AllInventory.filter( (item: any) => {
        let condition = item.codigo.search(event.target.value) ||
          item.producto.search(event.target.value) || item.materia_prima.search(event.target.value);

        return condition !== -1 ? item : undefined;
      })

      this.AllInventory = filter ? filter : await this.getInventory();
    } else {
      this.AllInventory = await this.getInventory();
      console.log('onSearch', this.AllInventory);
    }

    console.log('onSearch', event.target.value);
  }

  async getInventory () {
    let inventory: any = await this.orderService.handlerInventory();
    return inventory ? inventory?.inventario : undefined;
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

}
