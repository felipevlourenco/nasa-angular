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
    it('renders the fetched objects in a list', async () => {
        await TestBed.configureTestingModule({
            imports: [Home],
            providers: [{ provide: ScoutApi, useValue: scoutApiStub }],
        }).compileComponents();

        const fixture = TestBed.createComponent(Home);

        await fixture.whenStable();
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('li');

        expect(items).toHaveLength(2);
        expect(items[0].textContent).toContain('A11HAVq');
        expect(items[1].textContent).toContain('X91327');
    });
});
