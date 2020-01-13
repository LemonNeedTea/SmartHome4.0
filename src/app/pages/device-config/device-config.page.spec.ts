import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceConfigPage } from './device-config.page';

describe('DeviceConfigPage', () => {
  let component: DeviceConfigPage;
  let fixture: ComponentFixture<DeviceConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceConfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
