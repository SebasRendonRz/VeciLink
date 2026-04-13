import { Component, Input } from '@angular/core';
import { ProviderProfile } from '../../../core/models';

@Component({
  selector: 'app-provider-card',
  standalone: false,
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.css'
})
export class ProviderCardComponent {
  @Input() provider!: ProviderProfile;
  @Input() rank?: number;
}
