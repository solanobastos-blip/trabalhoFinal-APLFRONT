import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../services/blog';
import { PostCardComponent } from '../components/post-card/post-card';
import { PostFormComponent } from '../components/post-form/post-form';

@Component({
  selector: 'app-blog',
  standalone: true,
  // Importamos o CommonModule (*ngIf/*ngFor) e os nossos 2 componentes filhos!
  imports: [CommonModule, PostCardComponent, PostFormComponent],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.css'
})
export class Blog {
  // Injetamos nosso serviço reativo
  blogService = inject(BlogService);

  // Variável para controlar se a caixinha de digitar senha está visível na tela ou escondida
  mostrarCaixaLogin = false;

  tentarLogin(user: string, pass: string) {
    const deuCerto = this.blogService.login(user, pass);
    if (deuCerto) {
      this.mostrarCaixaLogin = false;
      alert('Bem-vindo, Administrador! Modo de edição ativado.');
    } else {
      alert('Credenciais incorretas. Tente novamente.');
    }
  }

  fazerLogout() {
    this.blogService.logout();
  }
}