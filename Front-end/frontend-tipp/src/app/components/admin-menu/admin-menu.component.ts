import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AdminCreateTagsComponent } from '../admin-create-tags/admin-create-tags.component';
import { RegisterColaboradorComponent } from '../register-colaborador/register-colaborador.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor(public diolog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  newColaborador(){
    const diologRef = this.diolog.open(RegisterColaboradorComponent, {
      width: '50%',
    })
  }

  newEtiqueta(){
    const diologRef = this.diolog.open(AdminCreateTagsComponent, {
      width: '50%',
    })
  }
}
