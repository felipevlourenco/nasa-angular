import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Home],
            providers: [],
        }).compileComponents();
    });

    it('should mount Home page', () => {
        const fixture = TestBed.createComponent(Home);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
