import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule]}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});

describe('User functions:',()=>{
  let service
  beforeEach(() => {
    service = TestBed.configureTestingModule({imports: [
      AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, 
      AngularFireAuthModule, 
      AngularFireStorageModule]}).get(AuthService)
      service.doLogout()
  }
  );

  afterAll(()=>{
    service.doLogout()
  })
    it('should fail login',async ()=>{
      await expectAsync(service.doLogin({email:'prueba@prueba.prueba',password:'prueba2'}))
      .toBeRejected('Error: The password is invalid or the user does not have a password')
    })

    it('should login success',async ()=>{
      await expectAsync(service.doLogin({email:'prueba@prueba.prueba',password:'prueba'})).toBeResolved()
      service.doLogout()
    })

    it('user should exists after login',async ()=>{
      await service.doLogin({email:'prueba@prueba.prueba',password:'prueba'})
      expect(service.isUser()).not.toBeNull()
    })

})
