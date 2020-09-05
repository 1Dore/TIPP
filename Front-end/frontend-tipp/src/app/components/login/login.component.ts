import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm:FormGroup;
  

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      CorreoLog:['', Validators.required],
      PasswordLog:['', Validators.required]
    })
  }


  onSubmit(){
    console.log(this.LoginForm.value);
  }
}
