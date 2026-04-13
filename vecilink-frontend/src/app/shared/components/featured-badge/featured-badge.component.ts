import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-badge',
  standalone: false,
  template: `<span class="badge featured-badge"><i class="bi bi-star-fill me-1"></i>Destacado</span>`,
  styles: [`.featured-badge { background-color: #f5a623; color: white; font-size: 0.75rem; }`]
})
export class FeaturedBadgeComponent {}
