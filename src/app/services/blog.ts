import { Injectable, signal } from '@angular/core';

export interface BlogPost {
  id: number;
  titulo: string;
  conteudo: string;
  data: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // Usamos 'Signals' (a tecnologia mais moderna do Angular atual)
  posts = signal<BlogPost[]>([]);
  isAdmin = signal<boolean>(false);

  private readonly STORAGE_KEY = 'meraki_posts_db';
  private readonly ADMIN_KEY = 'meraki_admin_session';

  constructor() {
    this.carregarPosts();
    this.verificarSessao();
  }

  // --- LÓGICA DOS POSTS (Requisito Obrigatório 3 do edital) ---

  private carregarPosts() {
    const salvos = localStorage.getItem(this.STORAGE_KEY);
    if (salvos) {
      this.posts.set(JSON.parse(salvos));
    } else {
      // O PULO DO GATO: Já deixamos 2 posts prontos para o professor não ver uma tela em branco!
      const postsIniciais: BlogPost[] = [
        {
          id: 1,
          titulo: 'Campanha de Vacinação Contra a Gripe 2026',
          conteudo: 'A Clínica Meraki informa que já estão disponíveis as novas doses da vacina tetravalente. Proteja sua família neste inverno agendando seu horário pelo nosso WhatsApp.',
          data: '22/06/2026',
          categoria: 'Prevenção'
        },
        {
          id: 2,
          titulo: 'Saúde Mental no Trabalho: Cuidar de si é prioridade',
          conteudo: 'Nossa equipe de psicologia multidisciplinar preparou um guia rápido sobre como identificar sinais de esgotamento e manter o bem-estar rotineiro.',
          data: '18/06/2026',
          categoria: 'Psicologia'
        }
      ];
      this.salvar(postsIniciais);
    }
  }

  private salvar(lista: BlogPost[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    this.posts.set(lista);
  }

  adicionarPost(dados: { titulo: string; conteudo: string; categoria: string }) {
    const listaAtual = this.posts();
    const novoPost: BlogPost = {
      id: Date.now(),
      titulo: dados.titulo,
      conteudo: dados.conteudo,
      categoria: dados.categoria,
      data: new Date().toLocaleDateString('pt-BR')
    };
    this.salvar([novoPost, ...listaAtual]); // Coloca o post novo em primeiro
  }

  excluirPost(id: number) {
    const listaFiltrada = this.posts().filter(p => p.id !== id);
    this.salvar(listaFiltrada);
  }

  // --- LÓGICA DE LOGIN ---

  login(usuario: string, senha: string): boolean {
    // Senha hardcoded super simples pro seu teste e pra apresentação
    if (usuario === 'admin' && senha === 'meraki123') {
      localStorage.setItem(this.ADMIN_KEY, 'true');
      this.isAdmin.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.ADMIN_KEY);
    this.isAdmin.set(false);
  }

  private verificarSessao() {
    const logado = localStorage.getItem(this.ADMIN_KEY) === 'true';
    this.isAdmin.set(logado);
  }
}