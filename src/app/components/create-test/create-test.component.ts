import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private forms: UntypedFormBuilder,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    this.formulario = this.forms.group({
      project: ['', Validators.required],
      test: ['', Validators.required],
    });

    this.AllInventory = await this.orderService.handlerInventory();
    this.AllInventory = this.AllInventory.inventario;
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
    }
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }
}
