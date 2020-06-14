import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class GestionResolverService implements Resolve<any> {

  constructor(private dbService: DbService) {}

  resolve() { 
    return this.dbService.getGamesCreated();
  }
}