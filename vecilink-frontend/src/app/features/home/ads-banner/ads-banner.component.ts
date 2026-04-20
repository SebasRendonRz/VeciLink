import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdvertisementService } from '../../../core/services/advertisement.service';
import { Advertisement } from '../../../core/models';

@Component({
  standalone: false,
  selector: 'app-ads-banner',
  templateUrl: './ads-banner.component.html',
  styleUrls: ['./ads-banner.component.css']
})
export class AdsBannerComponent implements OnInit, OnDestroy {
  ads: Advertisement[] = [];
  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly AUTO_PLAY_MS = 5000;

  constructor(private adService: AdvertisementService) {}

  ngOnInit(): void {
    this.adService.listActiveAds().subscribe(ads => {
      this.ads = ads;
      if (this.ads.length > 1) {
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.ads.length;
    this.restartAutoPlay();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.ads.length) % this.ads.length;
    this.restartAutoPlay();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.ads.length;
    }, this.AUTO_PLAY_MS);
  }

  private stopAutoPlay(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    if (this.ads.length > 1) {
      this.startAutoPlay();
    }
  }
}
