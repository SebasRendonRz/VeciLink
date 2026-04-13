import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../../core/services/advertisement.service';
import { Advertisement } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-ads-banner',
  templateUrl: './ads-banner.component.html',
  styleUrls: ['./ads-banner.component.css']
})
export class AdsBannerComponent implements OnInit {
  currentAd: Advertisement | null = null;

  constructor(private adService: AdvertisementService) {}

  ngOnInit(): void {
    this.adService.listActiveAds().subscribe(ads => {
      if (ads.length > 0) {
        const index = Math.floor(Math.random() * ads.length);
        this.currentAd = ads[index];
      }
    });
  }
}
