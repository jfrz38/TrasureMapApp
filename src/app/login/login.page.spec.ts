import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('Form LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture.detectChanges();
    component.ngOnInit()
  }));

  it('check email', () => {
    component.formValidation.controls.email.markAsTouched();
    expect(component.formValidation.controls.email.valid).toBeFalsy();
    component.formValidation.controls.email.setValue('');
    expect(component.formValidation.controls.email.valid).toBeFalsy();
    component.formValidation.controls.email.setValue('asd');
    expect(component.formValidation.controls.email.valid).toBeFalsy();
    component.formValidation.controls.email.setValue('correo.com');
    expect(component.formValidation.controls.email.valid).toBeFalsy();
    component.formValidation.controls.email.setValue('correo@correo.com');
    expect(component.formValidation.controls.email.valid).toBeTruthy();

  });

  it('check password', () => {
    component.formValidation.controls.password.markAsTouched();
    expect(component.formValidation.controls.password.valid).toBeFalsy();
    component.formValidation.controls.password.setValue('');
    expect(component.formValidation.controls.password.valid).toBeFalsy();
    component.formValidation.controls.password.setValue('asd');
    expect(component.formValidation.controls.password.valid).toBeFalsy();
    component.formValidation.controls.password.setValue('password');
    expect(component.formValidation.controls.password.valid).toBeTruthy();
  });

});
