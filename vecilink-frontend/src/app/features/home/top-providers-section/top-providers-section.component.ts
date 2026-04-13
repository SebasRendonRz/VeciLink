import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../core/services/provider.service';
import { ProviderProfile } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-top-providers-section',
  templateUrl: './top-providers-section.component.html',
  styleUrls: ['./top-providers-section.component.css']
})
export class TopProvidersSectionComponent implements OnInit {
  topProviders: ProviderProfile[] = [];

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getRanking().subscribe(providers => {
      this.topProviders = providers.slice(0, 3);
    });
  }
}
