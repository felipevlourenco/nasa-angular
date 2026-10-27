import { TestBed } from '@angular/core/testing';
import { ScoutApi } from '../../core/scout-api';
import { Home } from './home';

const scoutApiStub = {
    getObjects: () =>
        Promise.resolve([
            { objectName: 'A11HAVq', rating: 0 },
            { objectName: 'X91327', rating: 2 },
        ]),
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

        expect(fixture.componentInstance.objects()).toEqual([
            { objectName: 'A11HAVq', rating: 0 },
            { objectName: 'X91327', rating: 2 },
        ]);
        expect(fixture.componentInstance.loading()).toBe(false);
    });
});
