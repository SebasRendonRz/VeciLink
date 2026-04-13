import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.css'],
  standalone: false
})
export class AdminTopbarComponent {
  @Input() title = 'Panel de administración';
}
