import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModeEditPage } from './mode-edit.page';

describe('ModeEditPage', () => {
  let component: ModeEditPage;
  let fixture: ComponentFixture<ModeEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
