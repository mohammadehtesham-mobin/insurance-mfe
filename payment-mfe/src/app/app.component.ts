import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  // Mock data (same as Policy MFE)
  policies: any = {
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

  selectedPolicy: any = null;
  worker: Worker | undefined;

  // Listener for cross-MFE communication
  private listener = () => {
    const id = localStorage.getItem('selectedPolicyId');

    if (id) {
      this.selectedPolicy = this.policies[Number(id)];
      console.log('Selected policy received:', this.selectedPolicy);
    }
  };

  ngOnInit() {
    // Load if already selected (page refresh case)
    this.listener();

    // Listen for Policy MFE event
    window.addEventListener('policy-selected', this.listener);
  }

  ngOnDestroy() {
    window.removeEventListener('policy-selected', this.listener);
  }

  pay() {
    if (!this.selectedPolicy) return;

    const amount = this.selectedPolicy.premium;

    if (typeof Worker !== 'undefined') {

      // Inline Web Worker (avoids cross-origin issue)
      const workerCode = `
        self.onmessage = function(e) {
          const amount = e.data;
          setTimeout(() => {
            self.postMessage({ status: 'success', amount: amount });
          }, 2000);
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));

      worker.onmessage = ({ data }) => {
        alert(`Payment of ₹${data.amount} successful for Policy ${this.selectedPolicy.id}!`);
        worker.terminate();
      };

      worker.postMessage(amount);

    } else {
      alert('Web Workers not supported');
    }
  }
}