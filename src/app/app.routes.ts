import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Blog } from './blog-page/blog-page'

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'blog', component: Blog},
    {path: '**', redirectTo: 'home'}
];
