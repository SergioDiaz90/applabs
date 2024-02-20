import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  formulario: any;
  messages: any = [];

  constructor(
    private forms: UntypedFormBuilder,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.formulario = this.forms.group({
      project: ['', Validators.required],
      project_type: ['', Validators.required],
      name_file: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.formulario.valid) {
      this.messages = [{ severity: 'success', summary: 'success', detail: 'Proyecto creado con éxito' }];
      return this.orderService.handlerCreateProjects(this.formulario.value);
    }

    this.messages = [{ severity: 'error', summary: 'error', detail: {message: 'Hubo un error creando el proyecto.'} }];
    return { 'status': false, method: 'submitForm' };
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }
}
