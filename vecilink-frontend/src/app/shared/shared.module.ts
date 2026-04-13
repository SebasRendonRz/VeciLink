import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { FeaturedBadgeComponent } from './components/featured-badge/featured-badge.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { RatingFormComponent } from './components/rating-form/rating-form.component';
import { RatingSummaryComponent } from './components/rating-summary/rating-summary.component';

const SHARED_COMPONENTS = [
  NavbarComponent,
  FooterComponent,
  LoaderComponent,
  AlertComponent,
  ConfirmModalComponent,
  ServiceCardComponent,
  ProviderCardComponent,
  RatingStarsComponent,
  FeaturedBadgeComponent,
  SearchFiltersComponent,
  EmptyStateComponent,
  PaginationComponent,
  WhatsappButtonComponent,
  RatingFormComponent,
  RatingSummaryComponent
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
