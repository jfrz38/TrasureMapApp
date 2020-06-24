import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; //
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { CheckPlatformService } from '../services/check-platform.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  constructor(public loadingCtrl: LoadingController,
    public checkService: CheckPlatformService,
    public route: ActivatedRoute,
    private dbservice: DbService) { }

  gamesCreated: Array<any>;
  isMobile: boolean = false;
  emptyList = false;

  ngOnInit() {

    if (this.route && this.route.data) {
      this.getData();
    } else {
      this.gamesCreated = []
      this.emptyList = true;
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      if (routeData['data']) {
        routeData['data'].pipe(take(1)).toPromise().then(data=>{
          this.gamesCreated = data;
          loading.dismiss();
        })
      } else {
        this.gamesCreated = []
        this.emptyList = true;
        loading.dismiss();
      }
    })
    
    this.isMobile = this.checkService.checkDevice();


  }

  async presentLoading(loading) {
    return await loading.present();
  }

  checkEmptyList(){
    this.emptyList = this.gamesCreated.length == 0;
  }



}
