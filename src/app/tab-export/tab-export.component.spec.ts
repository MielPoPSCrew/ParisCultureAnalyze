import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabExportComponent } from './tab-export.component';

describe('TabExportComponent', () => {
    let component: TabExportComponent;
    let fixture: ComponentFixture<TabExportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabExportComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabExportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
