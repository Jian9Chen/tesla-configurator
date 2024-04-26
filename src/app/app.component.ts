import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';
import {StepperComponent} from "./stepper/stepper.component";
import {RouterOutlet} from "@angular/router";
import {CarModelService} from "./services/car-model.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, StepperComponent, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'tesla-configurator';

  carImagePath?: string | null;

  private readonly imageBasePath: string = "https://interstate21.com/tesla-app/images/";
  private subscriptions: Subscription[] = [];

  constructor(private carModelService: CarModelService) {
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.carModelService.getSelectedCarObservable().subscribe(
        selectedCar => {
          if (selectedCar) {
            this.carImagePath = `${this.imageBasePath}${selectedCar.code}/${selectedCar.color.code}.jpg`;
          } else {
            this.carImagePath = null;
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
