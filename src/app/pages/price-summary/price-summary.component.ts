import {Component, OnInit} from '@angular/core';
import {StepperService} from "../../services/stepper.service";
import {CarModelService} from "../../services/car-model.service";
import {CarConfigurationService} from "../../services/car-configuration.service";
import {SelectedCar} from "../../models/car.model";
import {SelectedCarConfiguration} from "../../models/car.configuration.model";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-price-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './price-summary.component.html',
  styleUrl: './price-summary.component.scss'
})
export class PriceSummaryComponent implements OnInit {

  totalPrice?: number;

  selectedCarModel: SelectedCar;
  selectedConfiguration: SelectedCarConfiguration;
  constructor(private stepperService: StepperService,
              private carModelService: CarModelService,
              private carConfigService: CarConfigurationService) {
    this.selectedCarModel = carModelService.getSelectedCarValue()!;
    this.selectedConfiguration = carConfigService.getSelectedConfigurationValue()!;
  }

  ngOnInit(): void {
    this.stepperService.setCurrentStepId("step3");
    this.stepperService.setCurrentStepCompleted(true);
    this.computeTotalPrice();
  }

  private computeTotalPrice() {
    this.totalPrice = 0;
    this.totalPrice += this.selectedConfiguration.config.price;
    this.totalPrice += this.selectedCarModel.color.price;
    if (this.selectedConfiguration.towHitch) {
      this.totalPrice += 1000;
    }
    if (this.selectedConfiguration.yoke) {
      this.totalPrice += 1000;
    }
  }
}
