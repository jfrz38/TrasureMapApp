import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartidaPage } from './partida.page';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'; // added

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('PartidaPage', () => {
  let component: PartidaPage;
  let fixture: ComponentFixture<PartidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check form values: negative numbers',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta de un ID existente (de prueba)
    //y comprobar que sale un mensaje de error al meter
    //valores negativos
    //expect msgError = "..."
  })

  it('check form values: letters',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta de un ID existente (de prueba)
    //y comprobar que sale un mensaje de error al meter
    //valores con letras
    //expect button = disabled
  })

  it('check form values: ok',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta de un ID existente (de prueba)
    //y comprobar que NO sale un mensaje de error al meter
    //valores correctos
    //expect button = enabled
  })

  it('check played game',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta de un ID existente (de prueba)
    //y comprobar que se tienen los labels de los atributos
    //que se piden
  })
});
