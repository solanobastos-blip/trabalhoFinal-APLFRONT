import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  formTeste!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formTeste = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    const nameTest = this.formTeste.get('name');

    if (nameTest?.hasError('required')) {
      console.log('Faltou preencher o nome!');
    }

    if (nameTest?.hasError('minlength')) {
      console.log('Nome muito curto!');
    }
  }

  get name() {
    return this.formTeste.get('name') as FormControl;
  }

  get email() {
    return this.formTeste.get('email') as FormControl;
  }

  submitForm() {
    console.log(this.formTeste.value);
  }

}
