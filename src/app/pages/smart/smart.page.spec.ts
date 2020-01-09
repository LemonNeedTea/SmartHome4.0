import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPage } from './smart.page';

describe('SmartPage', () => {
  let component: SmartPage;
  let fixture: ComponentFixture<SmartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
