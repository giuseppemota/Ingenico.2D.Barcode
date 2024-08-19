import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { ProdutoListComponent } from './Pages/produto/produto-list/produto-list.component';
import { ProdutoDetailsComponent } from './Pages/produto/produto-details/produto-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/:id', component: ProdutoDetailsComponent },
  { path: '**', redirectTo: 'login' }
];
