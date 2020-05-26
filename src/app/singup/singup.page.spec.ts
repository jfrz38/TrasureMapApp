import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingupPage } from './singup.page';

import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('SingupPage', () => {
  let component: SingupPage;
  let fixture: ComponentFixture<SingupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupPage ],
      imports: [FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Form Singup', () => {
  let component: SingupPage;
  let fixture: ComponentFixture<SingupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupPage ],
      imports: [FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
    //component.resetFields('create')
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

  it('check name', () => {
    component.formValidation.controls.name.markAsTouched();
    expect(component.formValidation.controls.name.valid).toBeFalsy();
    component.formValidation.controls.name.setValue('');
    expect(component.formValidation.controls.name.valid).toBeFalsy();
    component.formValidation.controls.name.setValue('Paco');
    expect(component.formValidation.controls.name.valid).toBeTruthy();
  });

});