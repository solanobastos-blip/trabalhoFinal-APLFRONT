import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash.html',
  styleUrls: ['./dash.css'],
})
export class Dash implements OnInit{
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializa o formulário principal
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // Inicializa o FormArray vazio
      skills: this.fb.array([])
    });

    // Opcional: Já começar com um campo de skill na tela
    this.addSkill();
  }

  // Getter de conveniência para acessar o FormArray facilmente no HTML e no TS
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  // Método para criar um novo FormGroup que representará uma Skill
  createSkillGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Método para adicionar uma nova skill ao FormArray
  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  // Método para remover uma skill específica pelo índice
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Método chamado ao submeter o formulário
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Dados do Formulário:', this.userForm.value);
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.userForm.markAllAsTouched(); // Ativa os erros visualmente
    }
  }
}
