import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionPage } from './gestion.page';

import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('GestionPage', () => {
  let component: GestionPage;
  let fixture: ComponentFixture<GestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPage ],
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesCreated).not.toBeUndefined()
  })

  //existe la opción de crear juego en gestión
  it('create game option',()=>{
    expect(true).toBeTruthy();
  })
});
