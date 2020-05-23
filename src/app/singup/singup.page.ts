import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  constructor(private dbservice: DbService,private formBuilder: FormBuilder, private router: Router ) { }

  formValidation: FormGroup; 
  errorMessage: string = ''; 

  formValidationMessages = { 
    'email': [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es un campo obligatorio.' },
      { type: 'minlength', message: 'La lóngitud mínima de la contraseña es de 6 caracteres.' }
    ],
    'name':[
      {type: 'required', message: 'El nombre es obligatorio'}
    ]
  };

  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      name: new FormControl('',Validators.compose([
        Validators.required
      ]))
    });
  }

  singUpUser(value){
    var email = value.email
    var pass = value.password
    //Default user
    var insertUser={
      gamesCreated: [],
      gamesPlayed:[],
      name:value.name,
      puntos:0
    }
    this.dbservice.createUser(insertUser, email, pass).then(_ => {
      this.router.navigate(["/"]);
    }).catch(err=>{
      console.log("err = "+err)
    })
  }

}
