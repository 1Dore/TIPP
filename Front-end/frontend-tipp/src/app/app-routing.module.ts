import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { RegisterColaboradorComponent } from './components/register-colaborador/register-colaborador.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'usermenu', component: UsermenuComponent},
  {path: "register_colab", component: RegisterColaboradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
