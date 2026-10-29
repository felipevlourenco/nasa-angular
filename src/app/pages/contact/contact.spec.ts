import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
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

    it('shows a success panel after submit, and resets on "send another message"', async () => {
        const fixture = TestBed.createComponent(Contact);
        const component = fixture.componentInstance;
        component.form.setValue({
            fullName: 'Jane Doe',
            email: 'jane@example.com',
            company: '',
            employees: '',
            message: 'Hello',
        });

        await component.onSubmit();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Message sent');

        component.sendAnother();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).not.toContain('Message sent');
        expect(component.form.value.fullName).toBe('');
    });
});
