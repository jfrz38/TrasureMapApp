import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticiparPage } from './participar.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

describe('ParticiparPage', () => {
  let component: ParticiparPage;
  let fixture: ComponentFixture<ParticiparPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticiparPage ],
      imports: [RouterTestingModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticiparPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
