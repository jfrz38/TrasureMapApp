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
});

describe('Form JuegoPage', () => {
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
    component.resetValues()
  }));

  //comprobar funcionamiento del formulario
  it('check solution X',()=>{
    component.formValidation.controls.positionX.markAsTouched();
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(-1);
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(0);
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(4);
    expect(component.formValidation.controls.positionX.valid).toBeTruthy();
  })

  it('check solution Y',()=>{
    component.formValidation.controls.positionX.markAsTouched();
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(-1);
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(0);
    expect(component.formValidation.controls.positionX.valid).toBeFalsy();
    component.formValidation.controls.positionX.setValue(4);
    expect(component.formValidation.controls.positionX.valid).toBeTruthy();
  })
});
