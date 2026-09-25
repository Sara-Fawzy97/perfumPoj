import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DeliveryDetails {
  recipientName: string;
  phoneNumber: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  deliveryNote: string;
}

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-form.component.html'
})
export class CheckoutFormComponent {
  formSubmit = output<DeliveryDetails>();

  recipientName = signal('');
  phoneNumber = signal('');
  deliveryAddress = signal('');
  city = signal('');
  postalCode = signal('');
  deliveryNote = signal('');

  phoneVerified = signal(false);

  onPhoneChange(value: string): void {
    this.phoneNumber.set(value);
    // Simulate phone verification
    this.phoneVerified.set(value.length > 7);
  }

  getFormValue(): DeliveryDetails {
    return {
      recipientName: this.recipientName(),
      phoneNumber: this.phoneNumber(),
      deliveryAddress: this.deliveryAddress(),
      city: this.city(),
      postalCode: this.postalCode(),
      deliveryNote: this.deliveryNote()
    };
  }

  isValid(): boolean {
    return !!(
      this.recipientName().trim() &&
      this.phoneNumber().trim() &&
      this.deliveryAddress().trim() &&
      this.city().trim() &&
      this.postalCode().trim()
    );
  }
}
