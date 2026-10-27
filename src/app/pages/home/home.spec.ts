import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import scoutMock from '../../core/api/scout.mock.json';
import { ScoutStore } from '../../core/store/scout-store';
import type { ScoutResponse } from '../../core/types';
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

    it('shows the loading indicator while the store is loading', () => {
        const { fixture } = setup({ loading: signal(true) });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('loading')).toBeTruthy();
    });

    it('shows the error message when the store has an error', () => {
        const { fixture } = setup({ error: signal('Scout API error: 500') });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('p')?.textContent).toContain(
            'Scout API error: 500',
        );
    });

    it('renders the grid once data is loaded', () => {
        const { fixture } = setup({ objects: signal(mockObjects) });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('ag-grid-angular')).toBeTruthy();
    });
});
