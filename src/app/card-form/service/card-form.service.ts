import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICardData } from '../data/card-data';

@Injectable({
  providedIn: 'root',
})
export class CardFormService {
  DEFAULT_NAME = 'JANE APPLESEED';
  DEFAULT_CARD_NUMBER = '0000000000000000';
  DEFAULT_EXPIRY_MONTH = 0;
  DEFAULT_EXPIRY_YEAR = 0;
  DEFAULT_CVC = 0;

  cardData: BehaviorSubject<ICardData> = new BehaviorSubject({
    cardHolderName: 'JANE APPLESEED',
    cardNumber: '0000000000000000',
    expiryDateMonth: 0,
    expiryDateYear: 0,
    cvc: 0,
  });

  cardData$ = this.cardData.asObservable();

  setCardData(cardData: ICardData) {
    if (cardData.cardHolderName === '') {
      cardData.cardHolderName = this.DEFAULT_NAME;
    }
    if (cardData.cardNumber === '') {
      cardData.cardNumber = this.DEFAULT_CARD_NUMBER;
    }
    if (cardData.expiryDateMonth === 0) {
      cardData.expiryDateMonth = this.DEFAULT_EXPIRY_MONTH;
    }
    if (cardData.expiryDateYear === 0) {
      cardData.expiryDateYear = this.DEFAULT_EXPIRY_YEAR;
    }
    if (cardData.cvc === 0) {
      cardData.cvc = this.DEFAULT_CVC;
    }
    this.cardData.next(cardData);
  }

  setCardDataToDefault() {
    this.setCardData({
      cardHolderName: this.DEFAULT_NAME,
      cardNumber: this.DEFAULT_CARD_NUMBER,
      expiryDateMonth: this.DEFAULT_EXPIRY_MONTH,
      expiryDateYear: this.DEFAULT_EXPIRY_YEAR,
      cvc: this.DEFAULT_CVC,
    });
  }
}
