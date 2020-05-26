import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionPage } from './gestion.page';

import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire'; //
import { environment } from '../../environments/environment'; //
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'; // added
import { By } from '@angular/platform-browser';

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
        AngularFireStorageModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exists clients variable',()=>{
    expect(component.gamesCreated).not.toBeUndefined()
  })

  it('empty list image',()=>{
    component.gamesCreated=[]
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
    component.gamesCreated = []
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('ion-item')).length).toBe(0)
    component.gamesCreated.push(game)
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
