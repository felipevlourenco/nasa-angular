import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Contact],
            providers: [],
        }).compileComponents();
    });

    it('should mount contact page', () => {
        const fixture = TestBed.createComponent(Contact);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
