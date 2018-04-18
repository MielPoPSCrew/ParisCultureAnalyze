import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMapComponent } from './tab-map.component';

describe('TabMapComponent', () => {
  let component: TabMapComponent;
  let fixture: ComponentFixture<TabMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
