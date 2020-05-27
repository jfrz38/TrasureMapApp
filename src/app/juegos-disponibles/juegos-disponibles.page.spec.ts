import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegosDisponiblesPage } from './juegos-disponibles.page';

import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';

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
        AngularFireStorageModule, IonicModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('empty list image',()=>{
    component.gamesToPlay=[]
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('.imgPirata'))).not.toBeNull()
  })

  it('list show games',()=>{
    var game = {
      id: '',
      data:{
        description: '',
        points: 0,
        imageURL: '',
        solution: [0, 0],
        title: '',
        bound: [0, 0]
      }
    }
    component.gamesToPlay = []
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(0)
    component.gamesToPlay.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(1)
    component.gamesToPlay.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(2)
    component.gamesToPlay.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(3)
  })

});
