import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class JuegosDisponiblesResolverService implements Resolve<any> {

  constructor(private dbService: DbService) {}

  async resolve() { 
    return this.dbService.getGamesToPlay();
  }
}