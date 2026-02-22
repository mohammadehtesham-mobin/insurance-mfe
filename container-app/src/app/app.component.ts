import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgComponentOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  policyComponent: any;
  paymentComponent: any;

  async ngOnInit() {
    const policyModule = await import('policy-mfe/Component');
    this.policyComponent = policyModule.AppComponent;

    const paymentModule = await import('payment-mfe/Component');
    this.paymentComponent = paymentModule.AppComponent;
  }
}