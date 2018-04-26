import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAnalyzeComponent } from './tab-analyze.component';

describe('TabAnalyzeComponent', () => {
    let component: TabAnalyzeComponent;
    let fixture: ComponentFixture<TabAnalyzeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabAnalyzeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabAnalyzeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
