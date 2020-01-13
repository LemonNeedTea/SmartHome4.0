import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WifiPushPage } from './wifi-push.page';

describe('WifiPushPage', () => {
  let component: WifiPushPage;
  let fixture: ComponentFixture<WifiPushPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiPushPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WifiPushPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
