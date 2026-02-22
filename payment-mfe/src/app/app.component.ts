import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],   // ← add this
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  amount: number | null = null;

  private listener = () => {
    const value = localStorage.getItem('premiumAmount');
    this.amount = value ? Number(value) : null;
    console.log('Received premium amount:', this.amount);
  };

  ngOnInit() {
    // Load if already present
    this.listener();

    // Listen for cross-MFE event
    window.addEventListener('premium-updated', this.listener);
  }

  ngOnDestroy() {
    window.removeEventListener('premium-updated', this.listener);
  }
  worker: Worker | undefined;

  pay() {
    if (!this.amount) return;

    if (typeof Worker !== 'undefined') {
      
       //this.worker = new Worker(new URL('./payment.worker', import.meta.url));
      // Inline worker code
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
        alert(`Payment of ₹${data.amount} successful!`);
        worker.terminate();
      };

      worker.postMessage(this.amount);

    } else {
      alert('Web Workers not supported');
    }
  }
}