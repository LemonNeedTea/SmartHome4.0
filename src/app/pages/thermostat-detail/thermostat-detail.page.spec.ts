import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThermostatDetailPage } from './thermostat-detail.page';

describe('ThermostatDetailPage', () => {
  let component: ThermostatDetailPage;
  let fixture: ComponentFixture<ThermostatDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermostatDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThermostatDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
