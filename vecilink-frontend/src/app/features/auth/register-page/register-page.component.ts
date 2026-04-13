import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  selectedType: 'citizen' | 'provider' | null = null;

  selectType(type: 'citizen' | 'provider'): void {
    this.selectedType = type;
  }
}
