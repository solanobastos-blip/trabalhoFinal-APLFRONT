import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../services/blog';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule], // <- Importante para o *ngIf funcionar sem erros!
  templateUrl: './post-card.html', // Ou './post-card.html' dependendo de como o CLI gerou
  styleUrl: './post-card.css'      // Ou './post-card.css'
})
export class PostCardComponent {
  
  // Property Binding [post]="..." e [isAdmin]="..."
  @Input({ required: true }) post!: BlogPost;
  @Input() isAdmin: boolean = false;

  // Event Binding (aoExcluir)="..."
  @Output() aoExcluir = new EventEmitter<number>();

  clicouExcluir() {
    if (confirm('Tem certeza que deseja excluir esta postagem?')) {
      this.aoExcluir.emit(this.post.id);
    }
  }
}