import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Eye } from '@primeicons/angular/eye';

@Component({
    imports: [RouterLink, RouterLinkActive, Eye],
    selector: 'app-header',
    styleUrl: './app-header.css',
    templateUrl: './app-header.html',
})
export class AppHeader {}
