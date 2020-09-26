import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

@Component({
  selector: 'app-admin-create-tags',
  templateUrl: './admin-create-tags.component.html',
  styleUrls: ['./admin-create-tags.component.scss']
})
export class AdminCreateTagsComponent implements OnInit {

  form_etiqueta: FormGroup;

  constructor(private fb: FormBuilder,private service:AdminService, public dialogRef:MatDialogRef<AdminMenuComponent>) { }

  ngOnInit(): void {
    this.form_etiqueta = this.fb.group({
      nombre:["", Validators.required],
      descripcion:["", Validators.required]
    });
  }

  onSubmit(){

  }

}
