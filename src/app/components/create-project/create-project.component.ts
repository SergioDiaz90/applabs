import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  formulario: any;

  constructor(
    private forms: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.forms.group({
      project: ['', Validators.required],
      project_type: ['', Validators.required],
      name_file: ['', Validators.required],
      cuantity_prototypes: ['', Validators.required],
      cuantity_prototypes_by_kg: ['', Validators.required],
      type_of_packaging: ['', Validators.required],
      finally: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }
}
