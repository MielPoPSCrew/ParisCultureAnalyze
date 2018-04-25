import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabArrayComponent } from './tab-array.component';

describe('TabArrayComponent', () => {
    let component: TabArrayComponent;
    let fixture: ComponentFixture<TabArrayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabArrayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
