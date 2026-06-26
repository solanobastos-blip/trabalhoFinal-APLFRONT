import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <- ReactiveFormsModule é OBRIGATÓRIO aqui!
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostFormComponent {
  
  @Output() aoSalvar = new EventEmitter<{ titulo: string; conteudo: string; categoria: string }>();

  private fb = inject(FormBuilder);

  // Criando o Formulário Reativo com Validações (Exigência do edital)
  formPost: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    categoria: ['Prevenção', Validators.required],
    conteudo: ['', [Validators.required, Validators.minLength(15)]]
  });

  enviarPost() {
    if (this.formPost.valid) {
      this.aoSalvar.emit(this.formPost.value);
      this.formPost.reset({ categoria: 'Prevenção' }); // Limpa o form e volta a categoria padrão
      alert('Postagem publicada com sucesso!');
    } else {
      this.formPost.markAllAsTouched(); // Mostra os avisos em vermelho se o usuário tentar enviar vazio
    }
  }
}