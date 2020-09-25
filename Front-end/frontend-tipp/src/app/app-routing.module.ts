import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { RegisterColaboradorComponent } from './components/register-colaborador/register-colaborador.component';
import { LogRegMenuComponent } from './components/log-reg-menu/log-reg-menu.component';
import { ListaDeColaboradoresComponent } from './components/lista-de-colaboradores/lista-de-colaboradores.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'usermenu', component: UsermenuComponent},
  {path: 'register_colab', component: RegisterColaboradorComponent},
  {path: 'TIPP_Register', component: LogRegMenuComponent},
  {path: 'lista_de_colaboradores', component: ListaDeColaboradoresComponent},
  {path: 'admin-mode', component: AdminLoginComponent},
  {path: '**', redirectTo: "TIPP_Register", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



