import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; //

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(public navCtrl: NavController,private authService: AuthService) {
   }

  isUser: boolean;

  goToGestion() {
    if(!this.isUser) return;
    this.navCtrl.navigateForward(["/gestion"]);
  }

  goToParticipar() {
    if(!this.isUser) return;
    this.navCtrl.navigateForward(["/participar"]);
  }

  comprobarUser(){
    return this.authService.isUser() === null ? false : true
  }

  ionViewWillEnter(){
    this.isUser=this.comprobarUser();
  }

}
