import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';


@Component({
  selector: 'app-colab-menu',
  templateUrl: './colab-menu.component.html',
  styleUrls: ['./colab-menu.component.scss']
})
export class ColabMenuComponent implements OnInit {

  constructor(private router:Router, public auth:ColaboradorService) { }
  userDisplayName = '';
  ngOnInit(): void {
    this.userDisplayName = localStorage.getItem('loggedUser');
  }

  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

}
