import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WifiSettingPage } from './wifi-setting.page';

describe('WifiSettingPage', () => {
  let component: WifiSettingPage;
  let fixture: ComponentFixture<WifiSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WifiSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
