import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import type { RowClickedEvent } from 'ag-grid-community';
import scoutMock from '../../core/api/scout.mock.json';
import { ScoutStore } from '../../core/store/scout-store';
import type { ScoutObject, ScoutResponse } from '../../core/types';
import { Home } from './home';

const mockObjects = (scoutMock as ScoutResponse).data.slice(0, 2);

function setup(storeOverrides: Partial<InstanceType<typeof ScoutStore>>) {
    const storeStub = {
        objects: signal([]),
        loading: signal(false),
        error: signal(null),
        load: vi.fn(),
        ...storeOverrides,
    };

    TestBed.configureTestingModule({
        imports: [Home],
        providers: [{ provide: ScoutStore, useValue: storeStub }],
    });

    const fixture = TestBed.createComponent(Home);
    return { fixture, storeStub };
}

describe('Home', () => {
    it('calls store.load() on init', () => {
        const { fixture, storeStub } = setup({});
        fixture.detectChanges();

        expect(storeStub.load).toHaveBeenCalled();
    });

    it('shows the progressbar indicator while the store is loading', () => {
        const { fixture } = setup({ loading: signal(true) });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('p-progressbar')).toBeTruthy();
    });

    it('shows the error message when the store has an error', () => {
        const { fixture } = setup({ error: signal('Scout API error: 500') });
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Scout API error: 500');
    });

    it('renders the grid once data is loaded', () => {
        const { fixture } = setup({ objects: signal(mockObjects) });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ag-grid-angular')).toBeTruthy();
    });

    it('passes the search input value to the grid as quickFilterText', () => {
        const { fixture } = setup({ objects: signal(mockObjects) });
        fixture.detectChanges();

        fixture.componentInstance.onSearch('ISeO');
        fixture.detectChanges();

        const grid = fixture.debugElement.query(By.directive(AgGridAngular)).componentInstance;
        expect(grid.quickFilterText).toBe('ISeO');
    });

    it('opens the drawer with the clicked candidate details', () => {
        const { fixture } = setup({ objects: signal(mockObjects) });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2')).toBeFalsy();

        const candidate = mockObjects[0];
        fixture.componentInstance.onRowClicked({ data: candidate } as RowClickedEvent<ScoutObject>);
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent;
        expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain(
            candidate.objectName,
        );
        expect(text).toContain(candidate.moid);
    });

    it('calls store.load() again when Refresh is clicked', () => {
        const { fixture, storeStub } = setup({ objects: signal(mockObjects) });
        fixture.detectChanges();

        const refresh = fixture.nativeElement.querySelector('button');
        refresh.click();

        expect(storeStub.load).toHaveBeenCalledTimes(2);
    });

    it('disables the button while loading', () => {
        const { fixture } = setup({ loading: signal(true) });
        fixture.detectChanges();

        const refresh = fixture.nativeElement.querySelector('button');
        expect(refresh.disabled).toBe(true);
    });
});
