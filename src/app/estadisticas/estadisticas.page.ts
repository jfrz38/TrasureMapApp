import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import * as util from 'util'

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  constructor(private dbservice: DbService) { }

  valores = {
    name:"",
    puntos:"",
    gamesPlayed:[],
    gamesCreated:[]
  }
  ngOnInit() {
    this.dbservice.getUserData().then(res=>{
      this.valores=res;
    }).catch(_=>{
      //
    })
  }

}
