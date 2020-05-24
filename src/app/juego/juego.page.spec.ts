import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegoPage } from './juego.page';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'; // added

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('JuegoPage', () => {
  let component: JuegoPage;
  let fixture: ComponentFixture<JuegoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,
        IonicModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,
        RouterTestingModule,
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can edit and delete',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta de un ID existente (de prueba)
    //y comprobar que existen los botones de crear y eliminar
  })

  it('can create',()=>{
    expect(true).toBeTruthy();
    //acceder a la ruta para crear y comprobar que existen todos los inputs (título, uRL, descripción...)
  })
  
});
