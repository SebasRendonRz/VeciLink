import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: false,
  template: `
    <a
      [href]="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="btn whatsapp-btn d-inline-flex align-items-center gap-2"
    >
      <i class="bi bi-whatsapp fs-5"></i>
      <span>{{ label }}</span>
    </a>
  `,
  styles: [`
    .whatsapp-btn {
      background-color: #25D366;
      color: white;
      font-weight: 600;
      border-radius: 8px;
      padding: 0.5rem 1.25rem;
      transition: background-color 0.2s;
    }
    .whatsapp-btn:hover { background-color: #1da851; color: white; }
  `]
})
export class WhatsappButtonComponent {
  @Input() phone = '';
  @Input() message = 'Hola, vi tu servicio en VeciLink y me interesa contactarte.';
  @Input() label = 'Contactar por WhatsApp';

  get whatsappUrl(): string {
    const cleaned = this.phone.replace(/\D/g, '');
    const encoded = encodeURIComponent(this.message);
    return `https://wa.me/57${cleaned}?text=${encoded}`;
  }
}
