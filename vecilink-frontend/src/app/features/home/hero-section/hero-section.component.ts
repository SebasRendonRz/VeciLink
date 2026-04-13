import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  keyword = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.keyword.trim()) {
      this.router.navigate(['/services'], { queryParams: { q: this.keyword.trim() } });
    } else {
      this.router.navigate(['/services']);
    }
  }
}
