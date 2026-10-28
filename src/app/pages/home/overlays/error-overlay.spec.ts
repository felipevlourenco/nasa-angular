// error-overlay.spec.ts
import { TestBed } from '@angular/core/testing';
import { ErrorOverlay } from './error-overlay';

describe('ErrorOverlay', () => {
    it('can be constructed with a bare `new`, the way AG Grid instantiates overlays', () => {
        expect(() => new ErrorOverlay()).not.toThrow();
    });

    it('shows the error message', () => {
        const fixture = TestBed.createComponent(ErrorOverlay);
        const onRetry = vi.fn();
        fixture.componentInstance.agInit({ error: 'Scout API error: 500', onRetry } as never);
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent;
        expect(text).toContain("Couldn't load Scout data");
        expect(text).toContain('Scout API error: 500');
    });
});
