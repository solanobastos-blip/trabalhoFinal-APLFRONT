import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './blog/blog';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'blog', component: Blog },
    {path: '*', redirectTo: 'home'}
];
