import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { RegisterColaboradorComponent } from './components/register-colaborador/register-colaborador.component';
import { LogRegMenuComponent } from './components/log-reg-menu/log-reg-menu.component';
import { ListaDeColaboradoresComponent } from './components/lista-de-colaboradores/lista-de-colaboradores.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { ColabMenuComponent } from './components/colab-menu/colab-menu.component';
import { ColabSettingsComponent } from './components/colab-things/colab-settings/colab-settings.component';
import { UserPerfilComponent } from './components/user-things/user-perfil/user-perfil.component';
import { UserSettingsComponent } from './components/user-things/user-settings/user-settings.component';
import { UserCitasComponent } from './components/user-citas/user-citas.component';
import { UserCollabChatComponent } from './components/user-collab-chat/user-collab-chat.component';
import { ColabPerfilComponent } from './components/colab-things/colab-perfil/colab-perfil.component';




const routes: Routes = [
  {path: 'usermenu/perfil', component: UserPerfilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'usermenu', component: UsermenuComponent},
  {path: 'register_colab', component: RegisterColaboradorComponent},
  {path: 'TIPP_Register', component: LogRegMenuComponent},
  {path: 'lista_de_colaboradores', component: ListaDeColaboradoresComponent},
  {path: 'admin-mode', component: AdminLoginComponent},
  {path: 'admin-mode/menu', component: AdminMenuComponent},
  {path: 'colabmenu', component: ColabMenuComponent},
  {path: 'colabmenu/colab-settings', component: ColabSettingsComponent},
  
  {path: 'usermenu/settings', component: UserSettingsComponent},
  {path: 'usermenu/citas', component: UserCitasComponent},
  {path: 'user-collab/chat', component: UserCollabChatComponent},
  {path: 'colab-menu/perfil', component: ColabPerfilComponent},
  {path: 'colab-menu/settings', component: ColabSettingsComponent},
  {path: '**', redirectTo: "TIPP_Register", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

