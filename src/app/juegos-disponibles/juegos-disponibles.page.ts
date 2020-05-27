import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { CheckPlatformService } from '../services/check-platform.service';

@Component({
  selector: 'app-juegos-disponibles',
  templateUrl: './juegos-disponibles.page.html',
  styleUrls: ['./juegos-disponibles.page.scss'],
})
export class JuegosDisponiblesPage implements OnInit {

  constructor(private dbservice: DbService,public checkService: CheckPlatformService) { }

  gamesToPlay: Array<any>;
  isMobile: boolean = false;

  showLoadIcon = true;

  ngOnInit() {
    //Cargar partidas disponibles
    this.dbservice.getGamesToPlay().then(res=>{
      this.showLoadIcon = false;
      this.gamesToPlay=res;
    }).catch(_=>{
      this.gamesToPlay = []
    })
    this.isMobile = this.checkService.checkDevice();
  }

}
