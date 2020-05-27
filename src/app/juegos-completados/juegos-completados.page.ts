import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { CheckPlatformService } from '../services/check-platform.service';

@Component({
  selector: 'app-juegos-completados',
  templateUrl: './juegos-completados.page.html',
  styleUrls: ['./juegos-completados.page.scss'],
})
export class JuegosCompletadosPage implements OnInit {

  constructor(private dbservice: DbService, public checkService: CheckPlatformService) { }

  gamesPlayed: Array<any>;
  isMobile: boolean = false;

  showLoadIcon = true;

  ngOnInit() {
    //Cargar partidas jugadas
    this.dbservice.getGamesPlayed().then(res=>{
      this.showLoadIcon = false;
      this.gamesPlayed=res;
    }).catch(_=>{
      this.gamesPlayed=[]
    })
    this.isMobile = this.checkService.checkDevice();
  }
}
