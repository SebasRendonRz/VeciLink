import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../core/services/provider.service';
import { ProviderProfile } from '../../../core/models';

@Component({
  selector: 'app-provider-ranking-page',
  templateUrl: './provider-ranking-page.component.html',
  styleUrls: ['./provider-ranking-page.component.css'],
  standalone: false
})
export class ProviderRankingPageComponent implements OnInit {
  providers: ProviderProfile[] = [];
  isLoading = true;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getRanking().subscribe(list => {
      this.providers = list;
      this.isLoading = false;
    });
  }
}
