import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AirSettingModalPage } from './air-setting-modal.page';

describe('AirSettingModalPage', () => {
  let component: AirSettingModalPage;
  let fixture: ComponentFixture<AirSettingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirSettingModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AirSettingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
