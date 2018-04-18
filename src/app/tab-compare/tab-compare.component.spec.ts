import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCompareComponent } from './tab-compare.component';

describe('TabCompareComponent', () => {
  let component: TabCompareComponent;
  let fixture: ComponentFixture<TabCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
