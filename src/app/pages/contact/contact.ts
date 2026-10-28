import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Envelope } from '@primeicons/angular/envelope';
import { Github } from '@primeicons/angular/github';
import { Linkedin } from '@primeicons/angular/linkedin';
import { Map } from '@primeicons/angular/map';
import { Phone } from '@primeicons/angular/phone';
import { Twitter } from '@primeicons/angular/twitter';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        SelectModule,
        TextareaModule,
        ToastModule,
        Envelope,
        Phone,
        Map,
        Linkedin,
        Github,
        Twitter,
    ],
    selector: 'contact',
    styleUrl: './contact.css',
    templateUrl: './contact.html',
    providers: [MessageService],
})
export class Contact {
    protected readonly fb = inject(FormBuilder);
    protected readonly messageService = inject(MessageService);

    readonly employeeRanges = ['1–10', '11–50', '51–200', '201–500', '500+'];

    readonly form = this.fb.nonNullable.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        company: [''],
        employees: [''],
        message: ['', Validators.required],
    });

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong',
                detail: 'Please try again.',
            });

            return;
        }

        // Send
        this.messageService.add({
            severity: 'success',
            summary: 'Message Sent',
            detail: 'Your was succesfully sent.',
        });
    }
}
