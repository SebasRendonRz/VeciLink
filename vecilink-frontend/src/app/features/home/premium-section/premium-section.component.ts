import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-premium-section',
  templateUrl: './premium-section.component.html',
  styleUrls: ['./premium-section.component.css']
})
export class PremiumSectionComponent {
  readonly whatsappNumber = '573000000000';
  readonly whatsappMessage = encodeURIComponent(
    'Hola, estoy interesado en los servicios premium de VeciLink y quisiera obtener más información.'
  );

  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${this.whatsappMessage}`;
  }

  readonly plans = [
    {
      icon: 'bi-star-fill',
      title: 'Prestador destacado',
      description:
        'Aparece en posiciones preferenciales dentro de la plataforma y mejora la visibilidad de tu perfil frente a los ciudadanos.',
      iconColor: 'icon-gold'
    },
    {
      icon: 'bi-layers-fill',
      title: 'Servicios adicionales',
      description:
        'Publica más servicios en tu perfil de prestador, previa habilitación administrativa y respetando las políticas de la plataforma.',
      iconColor: 'icon-blue'
    },
    {
      icon: 'bi-megaphone-fill',
      title: 'Anuncio publicitario',
      description:
        'Promociona tu servicio o negocio mediante banners visibles dentro de la aplicación.',
      iconColor: 'icon-green'
    }
  ];
}
