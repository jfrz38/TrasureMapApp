import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; //
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { CheckPlatformService } from '../services/check-platform.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  constructor(public loadingCtrl: LoadingController,
    public checkService: CheckPlatformService,
    private dbservice: DbService ) { }

    gamesCreated: Array<any>;
    isMobile: boolean = false;
    
  ngOnInit() {
    this.dbservice.getGamesCreated().then(res=>{
      this.gamesCreated=res;
    }).catch(error=>{
      console.log("gestion error")
      this.gamesCreated=[]
    })
    this.isMobile = this.checkService.checkDevice();
  }
}
