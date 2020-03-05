import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThermostatTimerPage } from './thermostat-timer.page';

describe('ThermostatTimerPage', () => {
  let component: ThermostatTimerPage;
  let fixture: ComponentFixture<ThermostatTimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermostatTimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThermostatTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
