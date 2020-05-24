import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { JuegosCompletadosPage } from './juegos-completados.page';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('JuegosCompletadosPage', () => {
  let component: JuegosCompletadosPage;
  let fixture: ComponentFixture<JuegosCompletadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegosCompletadosPage ],
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosCompletadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesPlayed).not.toBeUndefined()
  })
});
