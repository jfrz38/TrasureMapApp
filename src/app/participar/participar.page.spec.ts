import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParticiparPage } from './participar.page';

describe('ParticiparPage', () => {
  let component: ParticiparPage;
  let fixture: ComponentFixture<ParticiparPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticiparPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticiparPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
