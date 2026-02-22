import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'policy-mfe';
  premiumAmount = 5000;

  payPremium() {
    // Save to localStorage
    localStorage.setItem('premiumAmount', this.premiumAmount.toString());

    // Dispatch Custom Event
    window.dispatchEvent(
      new CustomEvent('premium-updated', {
        detail: { amount: this.premiumAmount }
      })
    );

    console.log('Premium sent to Payment MFE:', this.premiumAmount);
  }
  
}
