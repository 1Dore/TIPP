import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }


  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
    
}
