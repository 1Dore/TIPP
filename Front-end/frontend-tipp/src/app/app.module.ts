import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {UsermenuComponent } from './components/usermenu/usermenu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RegisterColaboradorComponent } from './components/register-colaborador/register-colaborador.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LogRegMenuComponent } from './components/log-reg-menu/log-reg-menu.component';
import { UserSettingsComponent } from './components/user-things/user-settings/user-settings.component';
import { ColabSettingsComponent } from './components/colab-settings/colab-settings.component';
import {HttpClientModule } from '@angular/common/http';
import { ListaDeColaboradoresComponent } from './components/lista-de-colaboradores/lista-de-colaboradores.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { UserCreaContratoComponent } from './components/user-crea-contrato/user-crea-contrato.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminCreateTagsComponent } from './components/admin-create-tags/admin-create-tags.component';
import { UserCollabChatComponent } from './components/user-collab-chat/user-collab-chat.component';
import { ColabMenuComponent } from './components/colab-menu/colab-menu.component';
import { UserPerfilComponent } from './components/user-things/user-perfil/user-perfil.component';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GoogleMapsModule } from '@angular/google-maps';
import {UserCitasComponent } from './components/user-citas/user-citas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsermenuComponent,
    RegisterColaboradorComponent,
    LogRegMenuComponent,
    UserSettingsComponent,
    ColabSettingsComponent,
    ListaDeColaboradoresComponent,
    AdminLoginComponent,
    AdminMenuComponent,
    UserCreaContratoComponent,
    AdminCreateTagsComponent,
    UserCollabChatComponent,
    ColabMenuComponent,
    UserPerfilComponent,
    UserCitasComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule, 
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

