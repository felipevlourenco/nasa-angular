import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('renders the fetched objects in a list', async () => {
        const data = [
            { objectName: 'A11HAVq', rating: 0 },
            { objectName: 'X91327', rating: 2 },
        ];
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ signature: {}, count: '2', data }),
            }),
        );

        await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
        const fixture = TestBed.createComponent(Home);
        await fixture.whenStable();
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items).toHaveLength(2);
        expect(items[0].textContent).toContain('A11HAVq');
        expect(items[1].textContent).toContain('X91327');
    });
});
