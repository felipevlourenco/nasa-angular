import { TestBed } from '@angular/core/testing';
import { ScoutApi } from '../../core/scout-api';
import scoutMock from '../../core/scout.mock.json';
import type { ScoutResponse } from '../../core/types';
import { Home } from './home';

const mockObjects = (scoutMock as ScoutResponse).data.slice(0, 2);

const scoutApiStub = {
    getObjects: () => Promise.resolve(mockObjects),
};

describe('Home', () => {
    it('loads the fetched objects into the grid data', async () => {
        await TestBed.configureTestingModule({
            imports: [Home],
            providers: [{ provide: ScoutApi, useValue: scoutApiStub }],
        }).compileComponents();

        const fixture = TestBed.createComponent(Home);
        expect(fixture.componentInstance.loading()).toBe(true);

        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.objects()).toEqual(mockObjects);
        expect(fixture.componentInstance.loading()).toBe(false);
    });
});
