import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardData } from './card-form/data/card-data';
import { CardFormService } from './card-form/service/card-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'interactive-card-details';

  $cardData: Observable<ICardData>;

  constructor(private cardFormService: CardFormService) {
    this.$cardData = this.cardFormService.cardData$;
  }
}
