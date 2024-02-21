import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/interfaces/user-and-order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  formulario: any;
  dataProjects: any;
  projects: any = [];
  projectSelected: any;
  numberTest: number = 0;
  AllInventory: any = [];
  columnName = [
    { field: 'codigo', header: 'Código' },
    { field: 'producto', header: 'Producto' },
    { field: 'materia_prima', header: 'Materia prima' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'unidades_disponibles', header: 'Unidades disponibles' },
    { field: 'valor_gramo', header: 'Valor en gramos' },
  ]
  selectedProducts: any = [];
  product = {};
  submitted: boolean = false;
  productDialog: any = false;
  addProducts: any;
  tabs: any;
  tables: any;
  indexTab: any = 0;
  messages: any = [];

  constructor(
    private router: Router,
    private forms: UntypedFormBuilder,
    private orderService: OrderService,
  ) { }

  async ngOnInit() {
    this.formulario = this.forms.group({
      project: ['', Validators.required],
      test: ['', Validators.required],
      procedimiento: ['', Validators.required],
    });

    this.addProducts = this.forms.group({
      codigo: ['', Validators.required],
      producto: ['', Validators.required],
      materia_prima: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidades_disponibles: ['', Validators.required],
      valor_gramo: ['', Validators.required],
    })

    // this.AllInventory = await this.getInventory();

    const card = {
      id: 0,
      title: 'Formula 1',
      active: true,
      table: [
        {
          first: 'Mark',
          last: 'Otto'
        },
        {
          first: 'Jacob',
          last: 'Thornton'
        },
        {
          first: 'Larry',
          last: 'the Bird'
        }
      ]
    }
    this.tabs = [card]
    this.tables = this.tabs[0].table;

    console.log('inventory', this.AllInventory);
    this.getProjects();
  }

  private getProjects () {
    this.dataProjects = this.orderService.getProjectsByRoleUser();

    if (this.dataProjects.status) {
      let dataRole = this.dataProjects.dataRole
      for(let obj in dataRole) {
        let item = {
          name: dataRole[obj].project,
          code: dataRole[obj].id
        }

        this.projects.push(item);
        // console.log('getProjects', this.projects);
      }
    }
  }

  selectProject() {
    if (this.projectSelected) {
      this.setFormValue(this.projectSelected);
    }
  }

  setFormValue (project: City) {
    let currentProject = this.dataProjects.dataRole[project.code];

    this.formulario.controls['project'].setValue(currentProject.project);
    this.formulario.controls['test'].setValue(this.numberTest);
    this.numberTest += 1;

    console.log('setFormValue', currentProject, this.formulario.controls);
  }

  submitForm(): void {
    if (this.formulario.valid) {
      // this.orderService.handlerCreateRequest(this.formulario.value);
      // console.log(this.formulario.value, this.projectSelected);
      this.messages = [{ severity: 'success', summary: 'success', detail: 'Ensayo creado con éxito' }];
      setTimeout(() => this.messages = [], 1500);
      return;
    }

    this.messages = [{ severity: 'error', summary: 'error', detail: 'Error al crear la solicitud' }];
    setTimeout(() => this.messages = [], 1500);
    return;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.addProducts.reset();
  }

  saveProduct() {
    this.productDialog = false;
    this.submitted = false;
    this.AllInventory.push({ ...this.addProducts.value });
    this.addProducts.reset();
    this.messages = [{ severity: 'success', summary: 'success', detail: 'Producto agregado con éxito' }];
    setTimeout(() => this.messages = [], 1500);
  }

  cleanProducts () {
    this.AllInventory = [];
    this.messages = [{ severity: 'success', summary: 'success', detail: 'Productos borrados con éxito' }];
    setTimeout(() => this.messages = [], 1500);
  }

  addTabs (e: any) {
    const valueTab = e.originalEvent.target.firstChild.nodeValue;
    let card;

    if (valueTab !== " + ") {
      return;
    }

    card = {
      id: this.tabs.length,
      title: 'Formula' + (this.tabs.length + 1),
      active: false,
      table: []
    }

    console.log('addTabs', {card, tabs: this.tabs, value: e.originalEvent.target.firstChild.nodeValue });
    this.tabs.push(card);
    
    this.openTab();
  }

  openTab() {
    this.indexTab = this.tabs.length - 1;
    console.log('openTab', this.indexTab);
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
