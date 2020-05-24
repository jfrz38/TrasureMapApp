import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';

import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('JuegosDisponiblesPage', () => {
  let component: JuegosDisponiblesPage;
  let fixture: ComponentFixture<JuegosDisponiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegosDisponiblesPage ],
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesToPlay).not.toBeUndefined()
  })
});
