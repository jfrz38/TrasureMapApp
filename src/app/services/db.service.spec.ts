import { TestBed } from '@angular/core/testing';

import { DbService } from './db.service';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('DbService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule]}));

  it('should be created', () => {
    const service: DbService = TestBed.get(DbService);
    expect(service).toBeTruthy();
  });
});
