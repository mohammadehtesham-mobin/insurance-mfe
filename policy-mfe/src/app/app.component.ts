import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'policy-mfe';

  policies = {
    101: {
      id: 101,
      name: 'Health Insurance',
      holderName: 'Alpha Pandey',
      sumInsured: 500000,
      premium: 5000,
      frequency: 'Monthly',
      tenure: '5 Years',
      nextDueDate: '15 Apr 2026',
      status: 'Active'
    },
    102: {
      id: 102,
      name: 'Car Insurance',
      holderName: 'Alpha Pandey',
      sumInsured: 300000,
      premium: 3000,
      frequency: 'Yearly',
      tenure: '1 Year',
      nextDueDate: '01 May 2026',
      status: 'Active'
    },
    103: {
      id: 103,
      name: 'Home Insurance',
      holderName: 'Alpha Pandey',
      sumInsured: 2000000,
      premium: 7000,
      frequency: 'Yearly',
      tenure: '10 Years',
      nextDueDate: '10 Jun 2026',
      status: 'Active'
    },
    104: {
      id: 104,
      name: 'Life Insurance',
      holderName: 'Alpha Pandey',
      sumInsured: 1000000,
      premium: 4500,
      frequency: 'Monthly',
      tenure: '20 Years',
      nextDueDate: '05 Apr 2026',
      status: 'Active'
    },
    105: {
      id: 105,
      name: 'Travel Insurance',
      holderName: 'Alpha Pandey',
      sumInsured: 200000,
      premium: 1200,
      frequency: 'One-time',
      tenure: '30 Days',
      nextDueDate: 'N/A',
      status: 'Active'
    }
  };

  policyList = Object.values(this.policies);

  pay(policyId: number) {
    // Store only the ID
    localStorage.setItem('selectedPolicyId', policyId.toString());

    // Notify other MFEs
    window.dispatchEvent(
      new CustomEvent('policy-selected', {
        detail: { policyId }
      })
    );

    console.log('Policy selected:', policyId);
  }
}