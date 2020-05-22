import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  constructor(private dbservice: DbService,private router: Router ) { }

  ngOnInit() {
  }

  singUpUser(email,pass){
    var insertUser={
      gamesCreated: [],
      gamesPlayed:[],
      name:"nombre",
      puntos:0
    }
    this.dbservice.createUser(insertUser, "prueba2@email.com","passPrueba123").then(_ => {
      this.router.navigate(["/"]);
    }).catch(err=>{
      console.log("err = "+err)
    })
  }

}
