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

import { By } from '@angular/platform-browser';
import { error } from 'protractor';

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

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

});

describe('Form JuegoPage', () => {
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
    component.resetFields('create')
  }));

  //comprobar funcionamiento del formulario
  it('check title',()=>{
    component.formValidation.controls.title.markAsTouched();
    expect(component.formValidation.controls.title.valid).toBeFalsy();
    component.formValidation.controls.title.setValue('título del juego');
    expect(component.formValidation.controls.title.valid).toBeTruthy();
    component.formValidation.controls.title.setValue('título demasiado largo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    expect(component.formValidation.controls.title.valid).toBeFalsy();
  })
  
  it('check description',()=>{
    component.formValidation.controls.description.markAsTouched();
    expect(component.formValidation.controls.description.valid).toBeFalsy();
    component.formValidation.controls.description.setValue('descripción del juego');
    expect(component.formValidation.controls.description.valid).toBeTruthy();
  })

  it('check points',()=>{
    component.formValidation.controls.points.markAsTouched();
    expect(component.formValidation.controls.points.valid).toBeFalsy();
    component.formValidation.controls.points.setValue(0);
    expect(component.formValidation.controls.points.valid).toBeFalsy();
    component.formValidation.controls.points.setValue(-1);
    expect(component.formValidation.controls.points.valid).toBeFalsy();
    component.formValidation.controls.points.setValue(101);
    expect(component.formValidation.controls.points.valid).toBeFalsy();
    component.formValidation.controls.points.setValue(100);
    expect(component.formValidation.controls.points.valid).toBeTruthy();
    component.formValidation.controls.points.setValue(38);
    expect(component.formValidation.controls.points.valid).toBeTruthy();
  })

  it('check bound X',()=>{
    component.formValidation.controls.boundX.setValue(0);
    expect(component.formValidation.controls.boundX.valid).toBeFalsy();
    component.formValidation.controls.boundX.setValue(1);
    expect(component.formValidation.controls.boundX.valid).toBeTruthy();
    component.formValidation.controls.boundX.setValue(-1);
    expect(component.formValidation.controls.boundX.valid).toBeFalsy();
    component.formValidation.controls.boundX.setValue(101);
    expect(component.formValidation.controls.boundX.valid).toBeFalsy();
    component.formValidation.controls.boundX.setValue(100);
    expect(component.formValidation.controls.boundX.valid).toBeTruthy();
  })

  it('check bound Y',()=>{
    component.formValidation.controls.boundY.setValue(0);
    expect(component.formValidation.controls.boundY.valid).toBeFalsy();
    component.formValidation.controls.boundY.setValue(1);
    expect(component.formValidation.controls.boundY.valid).toBeTruthy();
    component.formValidation.controls.boundY.setValue(-1);
    expect(component.formValidation.controls.boundY.valid).toBeFalsy();
    component.formValidation.controls.boundY.setValue(101);
    expect(component.formValidation.controls.boundY.valid).toBeFalsy();
    component.formValidation.controls.boundY.setValue(100);
    expect(component.formValidation.controls.boundY.valid).toBeTruthy();
  })

  it('check solution X',()=>{
    component.formValidation.controls.solutionX.setValue(0);
    expect(component.formValidation.controls.solutionX.valid).toBeFalsy();
    component.formValidation.controls.solutionX.setValue(-1);
    expect(component.formValidation.controls.solutionX.valid).toBeFalsy();

    //Con el límite
    component.formValidation.controls.solutionX.setValue(2);
    component.formValidation.controls.boundX.setValue(1);
    expect(component.formValidation.controls.boundX.valid).toBeFalsy();
    component.formValidation.controls.solutionX.setValue(2);
    component.formValidation.controls.boundX.setValue(2);
    expect(component.formValidation.controls.boundX.valid).toBeTruthy();
    component.formValidation.controls.solutionX.setValue(4);
    component.formValidation.controls.boundX.setValue(10);
    expect(component.formValidation.controls.boundX.valid).toBeTruthy();
  })

  it('check solution Y',()=>{
    component.formValidation.controls.solutionY.setValue(0);
    expect(component.formValidation.controls.solutionY.valid).toBeFalsy();
    component.formValidation.controls.solutionY.setValue(-1);
    expect(component.formValidation.controls.solutionY.valid).toBeFalsy();

    //Con el límite
    component.formValidation.controls.solutionY.setValue(2);
    component.formValidation.controls.boundY.setValue(1);
    expect(component.formValidation.controls.boundY.valid).toBeFalsy();
    component.formValidation.controls.solutionY.setValue(2);
    component.formValidation.controls.boundY.setValue(2);
    expect(component.formValidation.controls.boundY.valid).toBeTruthy();
    component.formValidation.controls.solutionY.setValue(4);
    component.formValidation.controls.boundY.setValue(10);
    expect(component.formValidation.controls.boundY.valid).toBeTruthy();
  })
});
