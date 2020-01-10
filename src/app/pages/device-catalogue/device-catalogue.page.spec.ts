import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceCataloguePage } from './device-catalogue.page';

describe('DeviceCataloguePage', () => {
  let component: DeviceCataloguePage;
  let fixture: ComponentFixture<DeviceCataloguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCataloguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceCataloguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
