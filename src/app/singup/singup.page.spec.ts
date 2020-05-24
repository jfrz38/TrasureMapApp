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
