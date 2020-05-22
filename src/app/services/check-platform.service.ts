import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CheckPlatformService {

  constructor(public platform: Platform) { }

  checkDevice(){
    if(this.platform.is('mobile') || this.platform.is('mobileweb')) {
      return true;
    } else {
      return false;
    }
  }
}
