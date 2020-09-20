import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent implements OnInit {
  name_tags: FormGroup

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.name_tags = this.fb.group({
      string: [""],
    });
  }


  buscarColaboradores(){
    let string: string;
    const params = new URLSearchParams(location.search);
    if(this.name_tags.value.string === ""){
      string = "";
    }else{
      string = this.name_tags.value.string;
    }
    params.set('string', string);
    this.abrir('lista_de_colaboradores?'+params.toString());
  }

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
    
}
