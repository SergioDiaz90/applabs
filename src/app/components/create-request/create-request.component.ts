import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/interfaces/user-and-order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  formulario: any;
  dataProjects: any;
  disable: boolean = true;
  projects: City[] = [];
  projectSelected: City | undefined;

  constructor(
    private forms: UntypedFormBuilder,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.formulario = this.forms.group({
      id: ['', Validators.required],
      project: ['', Validators.required],
      project_type: ['', Validators.required],
      name_file: ['', Validators.required],
      cuantity_prototypes: ['', Validators.required],
      cuantity_prototypes_by_kg: ['', Validators.required],
      type_of_packaging: ['', Validators.required],
      finally: ['', Validators.required],
      comments: ['', Validators.required],
    });
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

    this.formulario.controls['id'].setValue(currentProject.id);
    this.formulario.controls['project'].setValue(currentProject.project);
    this.formulario.controls['project_type'].setValue(currentProject.project_type);
    this.formulario.controls['name_file'].setValue(currentProject.name_file);
    
    console.log('setFormValue', currentProject, this.formulario.controls);
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.orderService.handlerCreateRequest(this.formulario.value);
      console.log(this.formulario.value, this.projectSelected);
    }
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

  // disabledFieldsProject () {
  //   this.formulario.get('id').disable();
  //   this.formulario.get('project').disable();
  //   this.formulario.get('project_type').disable();
  //   this.formulario.get('name_file').disable();
  // }
}
