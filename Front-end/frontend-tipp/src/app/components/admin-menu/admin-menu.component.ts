import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AdminCreateTagsComponent } from '../admin-create-tags/admin-create-tags.component';
import { RegisterColaboradorComponent } from '../register-colaborador/register-colaborador.component';

class Etiqueta{
  e_id: number;
  e_nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  lista_etiquetas: Array<Etiqueta> = new Array<Etiqueta>();

  constructor(public diolog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {

    this.getAllEtiquetas()
  }

  newColaborador(){
    const diologRef = this.diolog.open(RegisterColaboradorComponent, {
      width: '40%',
    })
  }

  newEtiqueta(){
    const diologRef = this.diolog.open(AdminCreateTagsComponent, {
      width: '40%',
    })
  }

  editEtiqueta(id: number){
    const diologRef = this.diolog.open(AdminCreateTagsComponent, {
      width: '40%',
    })
  }

  getAllEtiquetas(){
    this.adminService.getAllEtiquetas().subscribe((etiquetas) => {
      if(etiquetas.formularios.rows.length > 0){
        etiquetas.formularios.rows.forEach((etiqueta) => {
          let temp: Etiqueta = new Etiqueta;
          temp.e_id = etiqueta.e_id;
          temp.e_nombre = etiqueta.e_nombre;
          temp.descripcion = etiqueta.descripcion;
          this.lista_etiquetas.push(temp);
        });

      }
    });
    console.log(this.lista_etiquetas);
  }


}
