import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionPage } from './gestion.page';

import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

describe('GestionPage', () => {
  let component: GestionPage;
  let fixture: ComponentFixture<GestionPage>;
  let de: DebugElement; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPage ],
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        AngularFireAuthModule, 
        AngularFireStorageModule, IonicModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesCreated).not.toBeUndefined()
  })

  it('empty list image',()=>{
    component.route.data = of({})
    fixture.detectChanges()
    component.checkEmptyList();
    console.log("el tamaño de la lista es: "+component.gamesCreated.length);
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
    
    component.gamesCreated = []
    component.checkEmptyList()
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(0)
    component.gamesCreated.push(game)
    component.checkEmptyList()
    //component.emptyList = false;
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(1)
    component.gamesCreated.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(2)
    component.gamesCreated.push(game)
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(3)
  })
  
});
