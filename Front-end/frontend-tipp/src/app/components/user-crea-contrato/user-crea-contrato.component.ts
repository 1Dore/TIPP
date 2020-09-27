import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioService } from 'src/app/services/formulario.service';
import { ListaDeColaboradoresComponent } from '../lista-de-colaboradores/lista-de-colaboradores.component';

class Colaborador{
  c_id: number;
  nombre: string;
} 

@Component({
  selector: 'app-user-crea-contrato',
  templateUrl: './user-crea-contrato.component.html',
  styleUrls: ['./user-crea-contrato.component.scss']
})
export class UserCreaContratoComponent implements OnInit {

  constructor(public dialogREf: MatDialogRef<ListaDeColaboradoresComponent>, private userService:FormularioService,
              @Inject(MAT_DIALOG_DATA) public datos: Colaborador) { }

  ngOnInit(): void {
  }



}
