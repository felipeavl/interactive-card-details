import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, map, Observable, Subscription, takeUntil, tap } from 'rxjs';

import { ICardData } from '../../data/card-data';
import { CardFormService } from '../../service/card-form.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnDestroy {
  cardHolderName = new FormControl('', [
    Validators.required,
    this.noWhitespaceValidator,
  ]);
  cardNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(16),
    Validators.pattern(/^\d{16}$/),
  ]);
  actualYearWith2Digits = new Date().getFullYear() - 2000;
  expiryDateMonth = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(12),
    Validators.pattern(/^\d{1,2}$/),
  ]);
  expiryDateYear = new FormControl('', [
    Validators.required,
    Validators.min(this.actualYearWith2Digits),
    Validators.max(this.actualYearWith2Digits + 10),
    Validators.pattern(/^\d{2}$/),
  ]);
  cvc = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(3),
    Validators.pattern(/^\d*$/),
  ]);

  cardForm = new FormGroup({
    cardHolderName: this.cardHolderName,
    cardNumber: this.cardNumber,
    expiryDateMonth: this.expiryDateMonth,
    expiryDateYear: this.expiryDateYear,
    cvc: this.cvc,
  });

  status: 'INPUT' | 'VALIDATING' | 'COMPLETE' = 'INPUT';

  valueChangesSubscription: Subscription;

  constructor(private cardFormService: CardFormService) {
    this.valueChangesSubscription = this.cardForm.valueChanges.subscribe(
      (value) => {
        this.cardFormService.setCardData(value as ICardData);
      }
    );
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onKeyUp($event: KeyboardEvent): void {
    const isWhitespace = (this.cardHolderName.value || '').trim().length === 0;
    if ($event.key === ' ' && isWhitespace) {
      this.cardHolderName.setValue('');
    }
  }

  confirmCard($event: Event): void {
    $event.preventDefault();
    if (this.cardForm.valid) {
      console.log(this.cardForm.value);
      this.status = 'COMPLETE';
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  reset() {
    this.cardForm.reset();
    this.status = 'INPUT';
    this.cardFormService.setCardDataToDefault();
  }
}
