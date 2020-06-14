import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { JuegosCompletadosPage } from './juegos-completados.page';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';

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
        AngularFireStorageModule,IonicModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosCompletadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesPlayed).not.toBeUndefined()
  })

  it('empty list image',()=>{
    component.gamesPlayed=[]
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('.imgPirata'))).not.toBeNull()
  })

  it('list show games',()=>{

    var game = {
      date:'',
      score:'',
      response:[0,0],
      game:{
        description: '',
        points: 0,
        imageURL: '',
        solution: [0, 0],
        title: '',
        bound: [0, 0]
      }
    }
    component.gamesPlayed = []
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(0)
    component.gamesPlayed.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(1)
    component.gamesPlayed.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(2)
    component.gamesPlayed.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(3)
  })
  
});
